import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { FieldErrors, isValidEmail, str, throwIfErrors, ValidationFailedException } from '../common/validation';
import { INQUIRY_STATUSES, INQUIRY_TOPICS, REGISTRATION_STATUSES, TINTS } from '../common/constants';

export interface Program { id: string; code: string; name: string; bg: string; short: string; long: string; audience: string }
export interface Course {
  id: string; programId: string; programName: string; programBg: string; name: string; description: string;
  long: string; schedule: string; level: string; requirements: string; published: boolean; teacherIds: string[];
}
export interface Teacher { id: string; name: string; role: string; bio: string; courseIds: string[] }
export interface Faq { id: string; category: string; question: string; answer: string; pending: boolean }

const SETTINGS: Record<string, number> = { address: 200, city: 80, phone: 40, email: 200, hours: 200, story: 4000, mapsUrl: 500, showMarkers: 5, courseView: 4 };

/** Text-or-default helper: blank optional text is stored as '' (the site shows the design's placeholder). */
const opt = (input: Record<string, any>, k: string, max: number, e: FieldErrors) => {
  const v = str(input[k], max * 4);
  if (v.length > max) e[k] = `Keep this under ${max.toLocaleString()} characters.`;
  return v;
};

@Injectable()
export class ContentService {
  constructor(private readonly db: DatabaseService) {}

  // ---------- reads ----------

  settings() {
    const rows = this.db.all<{ key: string; value: string }>('SELECT key, value FROM settings');
    const out: Record<string, any> = {};
    for (const k of Object.keys(SETTINGS)) out[k] = rows.find((r) => r.key === k)?.value ?? '';
    out.showMarkers = out.showMarkers !== 'false';
    out.courseView = out.courseView === 'list' ? 'list' : 'grid';
    return out;
  }

  programs(): Program[] {
    return this.db.all<Program>('SELECT id, code, name, bg, short, long, audience FROM programs ORDER BY sort, id');
  }

  courses(includeHidden = false): Course[] {
    const rows = this.db.all<any>(
      `SELECT c.*, p.name AS program_name, p.bg AS program_bg FROM courses c JOIN programs p ON p.id = c.program_id
        ${includeHidden ? '' : 'WHERE c.published = 1'} ORDER BY p.sort, c.sort, c.id`,
    );
    const links = this.db.all<{ teacher_id: string; course_id: string }>('SELECT teacher_id, course_id FROM teacher_courses');
    return rows.map((r) => ({
      id: r.id, programId: r.program_id, programName: r.program_name, programBg: r.program_bg, name: r.name,
      description: r.description, long: r.long, schedule: r.schedule, level: r.level, requirements: r.requirements,
      published: !!r.published, teacherIds: links.filter((l) => l.course_id === r.id).map((l) => l.teacher_id),
    }));
  }

  teachers(): Teacher[] {
    const links = this.db.all<{ teacher_id: string; course_id: string }>('SELECT teacher_id, course_id FROM teacher_courses');
    return this.db
      .all<any>('SELECT id, name, role, bio FROM teachers ORDER BY sort, id')
      .map((t) => ({ ...t, courseIds: links.filter((l) => l.teacher_id === t.id).map((l) => l.course_id) }));
  }

  faqCategories() {
    return this.db.all<{ key: string; label: string }>('SELECT key, label FROM faq_categories ORDER BY sort');
  }

  faqs(): Faq[] {
    return this.db
      .all<any>('SELECT f.* FROM faqs f JOIN faq_categories c ON c.key = f.category ORDER BY c.sort, f.sort')
      .map((f) => ({ id: f.id, category: f.category, question: f.question, answer: f.answer, pending: !!f.pending }));
  }

  site() {
    return {
      settings: this.settings(),
      programs: this.programs(),
      courses: this.courses(),
      teachers: this.teachers(),
      themes: this.db.all('SELECT n, title, body FROM themes ORDER BY sort'),
      faqCategories: this.faqCategories(),
      faqs: this.faqs(),
      hero: this.db.all('SELECT src, alt, pos FROM hero_slides ORDER BY sort'),
      inquiryTopics: Object.entries(INQUIRY_TOPICS).map(([value, label]) => ({ value, label })),
      registrationStatuses: REGISTRATION_STATUSES,
      inquiryStatuses: INQUIRY_STATUSES,
    };
  }

  /** Course catalog search: ?program=all|<id>&q= ; counts per program ignore the text query (as in the design). */
  searchCourses(program?: string, q?: string) {
    const prog = str(program, 40) || 'all';
    const ql = str(q, 120).toLowerCase();
    const all = this.courses();
    const items = all.filter(
      (c) => (prog === 'all' || c.programId === prog) && (!ql || `${c.name} ${c.programName} ${c.description}`.toLowerCase().includes(ql)),
    );
    const counts: Record<string, number> = { all: all.length };
    for (const p of this.programs()) counts[p.id] = all.filter((c) => c.programId === p.id).length;
    return { items, total: items.length, counts };
  }

  course(id: string) {
    const all = this.courses();
    const c = all.find((x) => x.id === id);
    if (!c) throw new NotFoundException({ statusCode: 404, message: 'This course isn’t available.' });
    const others = all.filter((x) => x.id !== c.id);
    return {
      course: c,
      related: [...others.filter((x) => x.programId === c.programId), ...others.filter((x) => x.programId !== c.programId)].slice(0, 3),
      teachers: this.teachers().filter((t) => t.courseIds.includes(c.id)),
    };
  }

  teacher(id: string) {
    const t = this.teachers().find((x) => x.id === id);
    if (!t) throw new NotFoundException({ statusCode: 404, message: 'This teacher profile isn’t available.' });
    return { teacher: t, courses: this.courses().filter((c) => t.courseIds.includes(c.id)) };
  }

  // ---------- admin: settings ----------

  updateSettings(input: Record<string, unknown>) {
    const e: FieldErrors = {};
    const changes: [string, string][] = [];
    for (const [k, max] of Object.entries(SETTINGS)) {
      if (!(k in (input || {}))) continue;
      if (k === 'showMarkers') { changes.push([k, input[k] === false || input[k] === 'false' ? 'false' : 'true']); continue; }
      if (k === 'courseView') { changes.push([k, input[k] === 'list' ? 'list' : 'grid']); continue; }
      const v = str(input[k], 20000);
      if (v.length > max) e[k] = `Keep this under ${max.toLocaleString()} characters.`;
      else if (k === 'email' && v && !isValidEmail(v)) e[k] = 'That email looks incomplete — use a format like name@example.com.';
      else if (k === 'phone' && v && v.replace(/\D/g, '').length < 10) e[k] = 'Enter a 10-digit phone number, or leave this blank.';
      else if (k === 'mapsUrl' && v && !/^https:\/\//.test(v)) e[k] = 'Use a full https:// link.';
      else changes.push([k, v]);
    }
    throwIfErrors(e);
    this.db.transaction(() => {
      for (const [k, v] of changes) this.db.run('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value', [k, v]);
    });
    return this.settings();
  }

  // ---------- admin: programs ----------

  updateProgram(id: string, input: Record<string, any>): Program {
    if (!this.db.get('SELECT 1 FROM programs WHERE id = ?', [id])) throw new NotFoundException({ statusCode: 404, message: 'That program no longer exists.' });
    const e: FieldErrors = {};
    const name = str(input.name, 400);
    if (!name) e.name = 'Enter a program name.';
    else if (name.length > 80) e.name = 'Keep the name under 80 characters.';
    const short = opt(input, 'short', 300, e);
    const long = opt(input, 'long', 3000, e);
    const audience = opt(input, 'audience', 200, e);
    throwIfErrors(e);
    this.db.run('UPDATE programs SET name = ?, short = ?, long = ?, audience = ? WHERE id = ?', [name, short, long, audience, id]);
    return this.programs().find((p) => p.id === id)!;
  }

  createProgram(input: Record<string, any>): Program {
    const e: FieldErrors = {};
    const name = str(input.name, 400);
    if (!name) e.name = 'Enter a program name.';
    else if (name.length > 80) e.name = 'Keep the name under 80 characters.';
    const short = opt(input, 'short', 300, e);
    throwIfErrors(e);
    const n = this.db.get<{ n: number }>('SELECT COUNT(*) AS n FROM programs')!.n;
    const id = 'p' + Date.now().toString(36);
    this.db.run('INSERT INTO programs (id, code, name, bg, short, sort) VALUES (?, ?, ?, ?, ?, ?)', [id, String(n + 1).padStart(2, '0'), name, TINTS[n % TINTS.length], short, n + 1]);
    return this.programs().find((p) => p.id === id)!;
  }

  removeProgram(id: string) {
    const n = this.db.get<{ n: number }>('SELECT COUNT(*) AS n FROM courses WHERE program_id = ?', [id])!.n;
    if (n) throw new ValidationFailedException({ program: `Move or delete its ${n} course${n === 1 ? '' : 's'} first.` }, `This program still has ${n} course${n === 1 ? '' : 's'}.`);
    const res = this.db.run('DELETE FROM programs WHERE id = ?', [id]);
    if (!res.changes) throw new NotFoundException({ statusCode: 404, message: 'That program no longer exists.' });
    return { deleted: id };
  }

  // ---------- admin: courses ----------

  private validateCourse(input: Record<string, any>) {
    const e: FieldErrors = {};
    const name = str(input.name, 400);
    if (!name) e.name = 'Enter a course title.';
    else if (name.length > 100) e.name = 'Keep the title under 100 characters.';
    const programId = str(input.programId, 40);
    if (!this.db.get('SELECT 1 FROM programs WHERE id = ?', [programId])) e.programId = 'Choose a program.';
    const d = {
      name, programId,
      description: opt(input, 'description', 400, e), long: opt(input, 'long', 4000, e),
      schedule: opt(input, 'schedule', 200, e), level: opt(input, 'level', 120, e), requirements: opt(input, 'requirements', 300, e),
      published: input.published === undefined ? true : !!input.published,
    };
    throwIfErrors(e);
    return d;
  }

  createCourse(input: Record<string, any>): Course {
    const d = this.validateCourse(input);
    const id = 'c' + Date.now().toString(36);
    const sort = this.db.get<{ s: number }>('SELECT COALESCE(MAX(sort), 0) + 1 AS s FROM courses')!.s;
    this.db.run(
      'INSERT INTO courses (id, program_id, name, description, long, schedule, level, requirements, published, sort) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, d.programId, d.name, d.description, d.long, d.schedule, d.level, d.requirements, d.published ? 1 : 0, sort],
    );
    return this.courses(true).find((c) => c.id === id)!;
  }

  updateCourse(id: string, input: Record<string, any>): Course {
    if (!this.db.get('SELECT 1 FROM courses WHERE id = ?', [id])) throw new NotFoundException({ statusCode: 404, message: 'That course no longer exists.' });
    const d = this.validateCourse(input);
    this.db.run(
      'UPDATE courses SET program_id = ?, name = ?, description = ?, long = ?, schedule = ?, level = ?, requirements = ?, published = ? WHERE id = ?',
      [d.programId, d.name, d.description, d.long, d.schedule, d.level, d.requirements, d.published ? 1 : 0, id],
    );
    return this.courses(true).find((c) => c.id === id)!;
  }

  removeCourse(id: string) {
    const res = this.db.run('DELETE FROM courses WHERE id = ?', [id]); // past registrations keep their course name snapshot
    if (!res.changes) throw new NotFoundException({ statusCode: 404, message: 'That course no longer exists.' });
    return { deleted: id };
  }

  // ---------- admin: teachers ----------

  private validateTeacher(input: Record<string, any>) {
    const e: FieldErrors = {};
    const name = str(input.name, 400);
    if (!name) e.name = 'Enter the teacher’s name.';
    else if (name.length > 80) e.name = 'Keep the name under 80 characters.';
    const role = opt(input, 'role', 100, e);
    const bio = opt(input, 'bio', 3000, e);
    const courseIds: string[] = Array.isArray(input.courseIds) ? [...new Set(input.courseIds.map((x: unknown) => str(x, 40)))] as string[] : [];
    const known = new Set(this.courses(true).map((c) => c.id));
    if (courseIds.some((c) => !known.has(c))) e.courseIds = 'One of those courses no longer exists.';
    throwIfErrors(e);
    return { name, role, bio, courseIds };
  }

  private setCourses(id: string, courseIds: string[]) {
    this.db.run('DELETE FROM teacher_courses WHERE teacher_id = ?', [id]);
    for (const c of courseIds) this.db.run('INSERT INTO teacher_courses (teacher_id, course_id) VALUES (?, ?)', [id, c]);
  }

  createTeacher(input: Record<string, any>): Teacher {
    const d = this.validateTeacher(input);
    const id = 't' + Date.now().toString(36);
    const sort = this.db.get<{ s: number }>('SELECT COALESCE(MAX(sort), 0) + 1 AS s FROM teachers')!.s;
    this.db.transaction(() => {
      this.db.run('INSERT INTO teachers (id, name, role, bio, sort) VALUES (?, ?, ?, ?, ?)', [id, d.name, d.role || 'Role to be confirmed', d.bio, sort]);
      this.setCourses(id, d.courseIds);
    });
    return this.teachers().find((t) => t.id === id)!;
  }

  updateTeacher(id: string, input: Record<string, any>): Teacher {
    if (!this.db.get('SELECT 1 FROM teachers WHERE id = ?', [id])) throw new NotFoundException({ statusCode: 404, message: 'That teacher no longer exists.' });
    const d = this.validateTeacher(input);
    this.db.transaction(() => {
      this.db.run('UPDATE teachers SET name = ?, role = ?, bio = ? WHERE id = ?', [d.name, d.role || 'Role to be confirmed', d.bio, id]);
      this.setCourses(id, d.courseIds);
    });
    return this.teachers().find((t) => t.id === id)!;
  }

  removeTeacher(id: string) {
    const res = this.db.run('DELETE FROM teachers WHERE id = ?', [id]);
    if (!res.changes) throw new NotFoundException({ statusCode: 404, message: 'That teacher no longer exists.' });
    return { deleted: id };
  }

  // ---------- admin: themes & FAQ ----------

  updateTheme(n: string, input: Record<string, any>) {
    const e: FieldErrors = {};
    const title = str(input.title, 400);
    if (!title) e.title = 'Enter a title.';
    else if (title.length > 80) e.title = 'Keep the title under 80 characters.';
    const body = opt(input, 'body', 600, e);
    if (!body && !e.body) e.body = 'Write a short explanation.';
    throwIfErrors(e);
    const res = this.db.run('UPDATE themes SET title = ?, body = ? WHERE n = ?', [title, body, n]);
    if (!res.changes) throw new NotFoundException({ statusCode: 404, message: 'That section no longer exists.' });
    return this.db.get('SELECT n, title, body FROM themes WHERE n = ?', [n]);
  }

  private validateFaq(input: Record<string, any>) {
    const e: FieldErrors = {};
    const category = str(input.category, 40);
    if (!this.faqCategories().some((c) => c.key === category)) e.category = 'Choose a topic.';
    const question = str(input.question, 1000);
    if (!question) e.question = 'Write the question.';
    else if (question.length > 200) e.question = 'Keep the question under 200 characters.';
    const answer = str(input.answer, 8000);
    if (!answer) e.answer = 'Write the answer.';
    else if (answer.length > 2000) e.answer = 'Keep the answer under 2,000 characters.';
    throwIfErrors(e);
    return { category, question, answer, pending: !!input.pending };
  }

  createFaq(input: Record<string, any>): Faq {
    const d = this.validateFaq(input);
    const id = 'f' + Date.now().toString(36);
    const sort = this.db.get<{ s: number }>('SELECT COALESCE(MAX(sort), 0) + 1 AS s FROM faqs')!.s;
    this.db.run('INSERT INTO faqs (id, category, question, answer, pending, sort) VALUES (?, ?, ?, ?, ?, ?)', [id, d.category, d.question, d.answer, d.pending ? 1 : 0, sort]);
    return this.faqs().find((f) => f.id === id)!;
  }

  updateFaq(id: string, input: Record<string, any>): Faq {
    if (!this.db.get('SELECT 1 FROM faqs WHERE id = ?', [id])) throw new NotFoundException({ statusCode: 404, message: 'That question no longer exists.' });
    const d = this.validateFaq(input);
    this.db.run('UPDATE faqs SET category = ?, question = ?, answer = ?, pending = ? WHERE id = ?', [d.category, d.question, d.answer, d.pending ? 1 : 0, id]);
    return this.faqs().find((f) => f.id === id)!;
  }

  removeFaq(id: string) {
    const res = this.db.run('DELETE FROM faqs WHERE id = ?', [id]);
    if (!res.changes) throw new NotFoundException({ statusCode: 404, message: 'That question no longer exists.' });
    return { deleted: id };
  }
}

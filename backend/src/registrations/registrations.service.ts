import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ContentService } from '../content/content.service';
import { REGISTRATION_STATUSES, UNSURE } from '../common/constants';
import { uniqueRef } from '../common/refs';
import { FieldErrors, str, ValidationFailedException } from '../common/validation';

/** Same pattern the design uses (requires a 2+ letter top-level domain). */
export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const emailMsg = (v: string) => (v ? 'That email looks incomplete — use a format like name@example.com.' : 'Enter an email address so the center can reply.');

export interface Registration {
  id: number; ref: string; studentName: string; isStudent: boolean; guardianName: string; email: string; phone: string;
  course: string; courseName: string; message: string; status: string; createdAt: string;
}
const toReg = (r: any): Registration => ({
  id: r.id, ref: r.ref, studentName: r.student_name, isStudent: !!r.is_student, guardianName: r.guardian_name, email: r.email, phone: r.phone,
  course: r.course_id, courseName: r.course_name, message: r.message, status: r.status, createdAt: r.created_at.replace(' ', 'T') + 'Z',
});

@Injectable()
export class RegistrationsService {
  constructor(private readonly db: DatabaseService, private readonly content: ContentService) {}

  /** The design's registration rules, word for word. */
  check(input: Record<string, unknown>) {
    const v = {
      studentName: str(input?.studentName, 300), isStudent: input?.isStudent === true || input?.isStudent === 'true',
      guardianName: str(input?.guardianName, 300), email: str(input?.email, 300), phone: str(input?.phone, 60),
      course: str(input?.course, 40), message: str(input?.message, 6000),
    };
    const e: FieldErrors = {};
    if (!v.studentName) e.studentName = 'Enter the student’s full name.';
    else if (v.studentName.length > 120) e.studentName = 'Keep the name under 120 characters.';
    if (!v.isStudent && !v.guardianName) e.guardianName = 'Enter a parent or guardian name — or tick “I’m the student” above.';
    const courses = this.content.courses();
    if (!v.course) e.course = 'Choose a course, or pick “Not sure yet”.';
    else if (v.course !== UNSURE && !courses.some((c) => c.id === v.course)) e.course = 'That course is no longer offered — choose another, or pick “Not sure yet”.';
    if (!EMAIL.test(v.email)) e.email = emailMsg(v.email);
    if (v.phone && v.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a 10-digit phone number, or leave this blank.';
    if (v.message.length > 4000) e.message = 'Keep the message under 4,000 characters.';
    const c = courses.find((x) => x.id === v.course);
    const courseName = v.course === UNSURE ? 'Not sure yet — help choosing' : c ? `${c.name} · ${c.programName}` : '';
    return { v, e, courseName };
  }

  create(input: Record<string, unknown>): Registration {
    const { v, e, courseName } = this.check(input);
    if (Object.keys(e).length) throw new ValidationFailedException(e);
    const ref = uniqueRef(this.db, 'registrations', 'BB');
    const res = this.db.run(
      `INSERT INTO registrations (ref, student_name, is_student, guardian_name, email, phone, course_id, course_name, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [ref, v.studentName, v.isStudent ? 1 : 0, v.isStudent ? '' : v.guardianName, v.email, v.phone, v.course, courseName, v.message],
    );
    return this.find(Number(res.lastInsertRowid));
  }

  find(id: number): Registration {
    const r = this.db.get('SELECT * FROM registrations WHERE id = ?', [id]);
    if (!r) throw new NotFoundException({ statusCode: 404, message: 'That registration no longer exists.' });
    return toReg(r);
  }

  list(status?: string, q?: string, course?: string) {
    const where: string[] = [];
    const params: unknown[] = [];
    const st = str(status, 30);
    if (st && st !== 'All') { where.push('status = ?'); params.push(st); }
    const cs = str(course, 40);
    if (cs) { where.push('course_id = ?'); params.push(cs); }
    const needle = str(q, 120);
    if (needle) { where.push('(ref LIKE ? OR student_name LIKE ? OR guardian_name LIKE ? OR email LIKE ? OR course_name LIKE ? OR message LIKE ?)'); params.push(...Array(6).fill(`%${needle}%`)); }
    const items = this.db.all(`SELECT * FROM registrations ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY created_at DESC, id DESC`, params).map(toReg);
    return { items, total: this.db.get<{ n: number }>('SELECT COUNT(*) AS n FROM registrations')!.n };
  }

  setStatus(id: number, status: unknown) {
    const s = str(status, 30);
    if (!(REGISTRATION_STATUSES as readonly string[]).includes(s)) throw new ValidationFailedException({ status: 'Choose a valid status.' });
    this.find(id);
    this.db.run('UPDATE registrations SET status = ? WHERE id = ?', [s, id]);
    return this.find(id);
  }

  remove(id: number) {
    this.find(id);
    this.db.run('DELETE FROM registrations WHERE id = ?', [id]);
    return { deleted: id };
  }
}

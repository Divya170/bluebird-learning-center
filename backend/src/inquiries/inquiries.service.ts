import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { INQUIRY_STATUSES, INQUIRY_TOPICS } from '../common/constants';
import { uniqueRef } from '../common/refs';
import { FieldErrors, str, ValidationFailedException } from '../common/validation';
import { EMAIL, emailMsg } from '../registrations/registrations.service';

export interface Inquiry { id: number; ref: string; name: string; email: string; topic: string; topicLabel: string; message: string; status: string; createdAt: string }
const toInq = (r: any): Inquiry => ({
  id: r.id, ref: r.ref, name: r.name, email: r.email, topic: r.topic, topicLabel: (INQUIRY_TOPICS as Record<string, string>)[r.topic] || r.topic,
  message: r.message, status: r.status, createdAt: r.created_at.replace(' ', 'T') + 'Z',
});

@Injectable()
export class InquiriesService {
  constructor(private readonly db: DatabaseService) {}

  /** The design's contact-form rules, word for word. */
  check(input: Record<string, unknown>) {
    const v = { name: str(input?.name, 300), email: str(input?.email, 300), topic: str(input?.topic, 40) || 'general', message: str(input?.message, 8000) };
    const e: FieldErrors = {};
    if (!v.name) e.name = 'Enter your name.';
    else if (v.name.length > 120) e.name = 'Keep your name under 120 characters.';
    if (!EMAIL.test(v.email)) e.email = emailMsg(v.email);
    if (!(v.topic in INQUIRY_TOPICS)) e.topic = 'Choose one of the listed topics.';
    if (v.message.length < 5) e.message = 'Write a short message so the center knows how to help.';
    else if (v.message.length > 5000) e.message = 'Keep the message under 5,000 characters.';
    return { v, e };
  }

  create(input: Record<string, unknown>): Inquiry {
    const { v, e } = this.check(input);
    if (Object.keys(e).length) throw new ValidationFailedException(e);
    const ref = uniqueRef(this.db, 'inquiries', 'MSG');
    const res = this.db.run('INSERT INTO inquiries (ref, name, email, topic, message) VALUES (?, ?, ?, ?, ?)', [ref, v.name, v.email, v.topic, v.message]);
    return this.find(Number(res.lastInsertRowid));
  }

  find(id: number): Inquiry {
    const r = this.db.get('SELECT * FROM inquiries WHERE id = ?', [id]);
    if (!r) throw new NotFoundException({ statusCode: 404, message: 'That inquiry no longer exists.' });
    return toInq(r);
  }

  list(status?: string, q?: string) {
    const where: string[] = [];
    const params: unknown[] = [];
    const st = str(status, 30);
    if (st && st !== 'All') { where.push('status = ?'); params.push(st); }
    const needle = str(q, 120);
    if (needle) { where.push('(ref LIKE ? OR name LIKE ? OR email LIKE ? OR message LIKE ?)'); params.push(...Array(4).fill(`%${needle}%`)); }
    const items = this.db.all(`SELECT * FROM inquiries ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY created_at DESC, id DESC`, params).map(toInq);
    return { items, total: this.db.get<{ n: number }>('SELECT COUNT(*) AS n FROM inquiries')!.n };
  }

  setStatus(id: number, status: unknown) {
    const s = str(status, 30);
    if (!(INQUIRY_STATUSES as readonly string[]).includes(s)) throw new ValidationFailedException({ status: 'Choose a valid status.' });
    this.find(id);
    this.db.run('UPDATE inquiries SET status = ? WHERE id = ?', [s, id]);
    return this.find(id);
  }

  remove(id: number) {
    this.find(id);
    this.db.run('DELETE FROM inquiries WHERE id = ?', [id]);
    return { deleted: id };
  }
}

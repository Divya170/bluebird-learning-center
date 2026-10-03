import { Body, Controller, Get, HttpCode, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../common/admin.guard';
import { DatabaseService } from '../database/database.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly db: DatabaseService) {}

  /** Checks a passcode so the admin UI can unlock. Always succeeds when no ADMIN_TOKEN is set. */
  @Post('session')
  @HttpCode(200)
  session(@Body('token') token: unknown) {
    const expected = process.env.ADMIN_TOKEN || '';
    if (!expected) return { ok: true, protected: false };
    if (AdminGuard.matches(String(token ?? ''), expected)) return { ok: true, protected: true };
    throw new UnauthorizedException({ statusCode: 401, message: 'That passcode isn’t right. Check it and try again.' });
  }

  /** Counts for the admin tab labels. */
  @Get('summary')
  @UseGuards(AdminGuard)
  summary() {
    const n = (sql: string) => this.db.get<{ n: number }>(sql)!.n;
    return {
      registrations: n('SELECT COUNT(*) AS n FROM registrations'),
      newRegistrations: n("SELECT COUNT(*) AS n FROM registrations WHERE status = 'New'"),
      inquiries: n('SELECT COUNT(*) AS n FROM inquiries'),
      newInquiries: n("SELECT COUNT(*) AS n FROM inquiries WHERE status = 'New'"),
    };
  }
}

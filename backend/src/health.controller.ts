import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Controller('health')
export class HealthController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  check() {
    const row = this.db.get<{ n: number }>('SELECT COUNT(*) AS n FROM programs');
    return { status: 'ok', programs: row?.n ?? 0 };
  }
}

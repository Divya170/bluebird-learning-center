import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { AdminGuard } from '../common/admin.guard';

@Controller()
export class RegistrationsController {
  constructor(private readonly regs: RegistrationsService) {}

  /** Live field check for the form (on blur): always 200 with the current errors. */
  @Post('registrations/validate')
  @HttpCode(200)
  validate(@Body() body: Record<string, unknown>) {
    return { errors: this.regs.check(body).e };
  }

  @Post('registrations')
  @HttpCode(201)
  create(@Body() body: Record<string, unknown>) {
    return this.regs.create(body);
  }

  @Get('admin/registrations')
  @UseGuards(AdminGuard)
  list(@Query('status') status?: string, @Query('q') q?: string, @Query('course') course?: string) {
    return this.regs.list(status, q, course);
  }

  @Patch('admin/registrations/:id')
  @UseGuards(AdminGuard)
  setStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: unknown) {
    return this.regs.setStatus(id, status);
  }

  @Delete('admin/registrations/:id')
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.regs.remove(id);
  }
}

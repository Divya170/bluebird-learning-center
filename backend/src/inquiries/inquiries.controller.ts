import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { AdminGuard } from '../common/admin.guard';

@Controller()
export class InquiriesController {
  constructor(private readonly inqs: InquiriesService) {}

  /** Live field check for the form (on blur): always 200 with the current errors. */
  @Post('inquiries/validate')
  @HttpCode(200)
  validate(@Body() body: Record<string, unknown>) {
    return { errors: this.inqs.check(body).e };
  }

  @Post('inquiries')
  @HttpCode(201)
  create(@Body() body: Record<string, unknown>) {
    return this.inqs.create(body);
  }

  @Get('admin/inquiries')
  @UseGuards(AdminGuard)
  list(@Query('status') status?: string, @Query('q') q?: string) {
    return this.inqs.list(status, q);
  }

  @Patch('admin/inquiries/:id')
  @UseGuards(AdminGuard)
  setStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: unknown) {
    return this.inqs.setStatus(id, status);
  }

  @Delete('admin/inquiries/:id')
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inqs.remove(id);
  }
}

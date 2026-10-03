import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { AdminGuard } from '../common/admin.guard';

@Controller()
export class ContentController {
  constructor(private readonly content: ContentService) {}

  @Get('site') site() { return this.content.site(); }
  /** ?program=all|<id>&q= */
  @Get('courses') courses(@Query('program') program?: string, @Query('q') q?: string) { return this.content.searchCourses(program, q); }
  @Get('courses/:id') course(@Param('id') id: string) { return this.content.course(id); }
  @Get('teachers/:id') teacher(@Param('id') id: string) { return this.content.teacher(id); }

  @Put('admin/settings') @UseGuards(AdminGuard) settings(@Body() b: Record<string, unknown>) { return this.content.updateSettings(b); }
  @Post('admin/programs') @UseGuards(AdminGuard) createProgram(@Body() b: Record<string, unknown>) { return this.content.createProgram(b); }
  @Patch('admin/programs/:id') @UseGuards(AdminGuard) updateProgram(@Param('id') id: string, @Body() b: Record<string, unknown>) { return this.content.updateProgram(id, b); }
  @Delete('admin/programs/:id') @UseGuards(AdminGuard) removeProgram(@Param('id') id: string) { return this.content.removeProgram(id); }
  @Get('admin/courses') @UseGuards(AdminGuard) adminCourses() { return this.content.courses(true); }
  @Post('admin/courses') @UseGuards(AdminGuard) createCourse(@Body() b: Record<string, unknown>) { return this.content.createCourse(b); }
  @Put('admin/courses/:id') @UseGuards(AdminGuard) updateCourse(@Param('id') id: string, @Body() b: Record<string, unknown>) { return this.content.updateCourse(id, b); }
  @Delete('admin/courses/:id') @UseGuards(AdminGuard) removeCourse(@Param('id') id: string) { return this.content.removeCourse(id); }
  @Post('admin/teachers') @UseGuards(AdminGuard) createTeacher(@Body() b: Record<string, unknown>) { return this.content.createTeacher(b); }
  @Put('admin/teachers/:id') @UseGuards(AdminGuard) updateTeacher(@Param('id') id: string, @Body() b: Record<string, unknown>) { return this.content.updateTeacher(id, b); }
  @Delete('admin/teachers/:id') @UseGuards(AdminGuard) removeTeacher(@Param('id') id: string) { return this.content.removeTeacher(id); }
  @Patch('admin/themes/:n') @UseGuards(AdminGuard) updateTheme(@Param('n') n: string, @Body() b: Record<string, unknown>) { return this.content.updateTheme(n, b); }
  @Post('admin/faqs') @UseGuards(AdminGuard) createFaq(@Body() b: Record<string, unknown>) { return this.content.createFaq(b); }
  @Put('admin/faqs/:id') @UseGuards(AdminGuard) updateFaq(@Param('id') id: string, @Body() b: Record<string, unknown>) { return this.content.updateFaq(id, b); }
  @Delete('admin/faqs/:id') @UseGuards(AdminGuard) removeFaq(@Param('id') id: string) { return this.content.removeFaq(id); }
}

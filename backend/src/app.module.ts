import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ContentModule } from './content/content.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { AdminModule } from './admin/admin.module';
import { HealthController } from './health.controller';

@Module({
  imports: [DatabaseModule, ContentModule, RegistrationsModule, InquiriesModule, AdminModule],
  controllers: [HealthController],
})
export class AppModule {}

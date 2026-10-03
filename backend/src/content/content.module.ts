import { Global, Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';

@Global()
@Module({ providers: [ContentService], controllers: [ContentController], exports: [ContentService] })
export class ContentModule {}

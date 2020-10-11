import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrokenLink } from './broken-link.entity';
import { BrokenLinkController } from './broken-link.controller';
import { BrokenLinkService } from './broken-link.service';

@Module({
    imports: [TypeOrmModule.forFeature([BrokenLink])],
    controllers: [BrokenLinkController],
    providers: [BrokenLinkService]
})
export class BrokenLinkModule {}

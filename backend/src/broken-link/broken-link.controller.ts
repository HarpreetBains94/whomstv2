import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';

import { BrokenLinkService } from './broken-link.service';
import { BrokenLinkDto } from './dto/broken-link.dto';

@Controller('api/borked')
export class BrokenLinkController {
    constructor(private brokenLinkService: BrokenLinkService) {}

    @Get()
    showAllBrokenLinks(@Query('api_token') apiToken = '') {
        return this.brokenLinkService.showAll(apiToken);
    }

    @Post()
    createBrokenLink(@Body() data: BrokenLinkDto) {
        return this.brokenLinkService.create(data);
    }

    @Delete()
    deleteAllBrokenLinks(@Query('api_token') apiToken = '') {
        return this.brokenLinkService.deleteAll(apiToken);
    }
}

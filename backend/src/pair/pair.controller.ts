import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';

import { PairService } from './pair.service';
import { CreatePairDto } from './dto/create-pair.dto';

@Controller('api/pair')
export class PairController {
    constructor(private pairService: PairService) {}

    @Get()
    showAllPairs(@Query('api_token') apiToken = '') {
        return this.pairService.showAll(apiToken);
    }

    @Post()
    createPair(@Query('api_token') apiToken = '', @Body() data: CreatePairDto) {
        return this.pairService.create(apiToken, data);
    }
    
    @Get('/:sampleId/:songId')
    getOneForId(@Query('api_token') apiToken = '', @Param('sampleId') sampleId: string, @Param('songId') songId: string) {
        return this.pairService.findOne(apiToken, sampleId, songId);
    }

    @Get('/search/sample/:sampleId')
    getOneForsampleId(@Query('api_token') apiToken = '', @Param('sampleId') sampleId: string) {
        return this.pairService.findOneForsampleId(apiToken, sampleId);
    }

    @Get('/search/song/:songId')
    getOneForsongId(@Query('api_token') apiToken = '', @Param('songId') songId: string) {
        return this.pairService.findOneForsongId(apiToken, songId);
    }

    @Put('/:sampleId/:songId')
    updatePair(@Query('api_token') apiToken = '', @Param('sampleId') sampleId: string, @Param('songId') songId: string, @Body() data: Partial<CreatePairDto>) {
        return this.pairService.update(apiToken, sampleId, songId, data);
    }

    @Delete('/:sampleId/:songId')
    deletePair(@Query('api_token') apiToken = '', @Param('sampleId') sampleId: string, @Param('songId') songId: string) {
        return this.pairService.delete(apiToken, sampleId, songId);
    }
}

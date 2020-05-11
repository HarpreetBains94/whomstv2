import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

import { PairService } from './pair.service';
import { CreatePairDto } from './dto/create-pair.dto';

@Controller('api/pair')
export class PairController {
    constructor(private pairService: PairService) {}

    @Get()
    showAllPairs() {
        return this.pairService.showAll();
    }

    @Post()
    createPair(@Body() data: CreatePairDto) {
        return this.pairService.create(data);
    }
    
    @Get('/:sampleId/:songId')
    getOneForId(@Param('sampleId') sampleId: string, @Param('songId') songId: string) {
        return this.pairService.findOne(sampleId, songId);
    }

    @Get('/search/sample/:sampleId')
    getOneForsampleId(@Param('sampleId') sampleId: string) {
        return this.pairService.findOneForsampleId(sampleId);
    }

    @Get('/search/song/:songId')
    getOneForsongId(@Param('songId') songId: string) {
        return this.pairService.findOneForsongId(songId);
    }

    @Put('/:sampleId/:songId')
    updatePair(@Param('sampleId') sampleId: string, @Param('songId') songId: string, @Body() data: Partial<CreatePairDto>) {
        return this.pairService.update(sampleId, songId, data);
    }

    @Delete('/:sampleId/:songId')
    deletePair(@Param('sampleId') sampleId: string, @Param('songId') songId: string) {
        return this.pairService.delete(sampleId, songId);
    }
}

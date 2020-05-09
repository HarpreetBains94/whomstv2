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
    getOneForId(@Param('sampleId') sampleId: number, @Param('songId') songId: number) {
        return this.pairService.findOne(sampleId, songId);
    }

    @Put('/:sampleId/:songId')
    updatePair(@Param('sampleId') sampleId: number, @Param('songId') songId: number, @Body() data: Partial<CreatePairDto>) {
        return this.pairService.update(sampleId, songId, data);
    }

    @Delete('/:sampleId/:songId')
    deletePair(@Param('sampleId') sampleId: number, @Param('songId') songId: number) {
        return this.pairService.delete(sampleId, songId);
    }
}

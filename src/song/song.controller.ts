import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';

import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';

@Controller('api/song')
export class SongController {
    constructor(
        private songService: SongService,
    ) {}

    @Get()
    showAllSongs(@Query('api_token') apiToken = '') {
        return this.songService.showAll(apiToken);
    }

    @Post()
    createSong(@Query('api_token') apiToken = '', @Body() data: CreateSongDto) {
        return this.songService.create(apiToken, data);
    }
    
    @Get(':id')
    getOneForId(@Query('api_token') apiToken = '', @Param('id') id: string) {
        return this.songService.findOne(apiToken, id);
    }

    @Get('search/:title')
    getWithTitle(@Query('api_token') apiToken = '', @Param('title') title: string) {
        return this.songService.findWithTitle(apiToken, title);
    }

    @Put(':id')
    updateSong(@Query('api_token') apiToken = '', @Param('id') id: string, @Body() data: Partial<CreateSongDto>) {
        return this.songService.update(apiToken, id, data);
    }

    @Delete(':id')
    deleteSong(@Query('api_token') apiToken = '', @Param('id') id: string) {
        return this.songService.delete(apiToken, id);
    }
}

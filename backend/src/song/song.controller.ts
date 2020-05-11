import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';

@Controller('api/song')
export class SongController {
    constructor(
        private songService: SongService,
    ) {}

    @Get()
    showAllSongs() {
        return this.songService.showAll();
    }

    @Post()
    createSong(@Body() data: CreateSongDto) {
        return this.songService.create(data);
    }
    
    @Get(':id')
    getOneForId(@Param('id') id: string) {
        return this.songService.findOne(id);
    }

    @Get('search/:title')
    getWithTitle(@Param('title') title: string) {
        return this.songService.findWithTitle(title);
    }

    @Put(':id')
    updateSong(@Param('id') id: string, @Body() data: Partial<CreateSongDto>) {
        return this.songService.update(id, data);
    }

    @Delete(':id')
    deleteSong(@Param('id') id: string) {
        return this.songService.delete(id);
    }
}

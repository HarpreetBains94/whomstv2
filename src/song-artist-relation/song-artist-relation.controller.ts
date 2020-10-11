import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';

import { SongArtistRelationService } from './song-artist-relation.service';
import { CreateSongArtistRelationDto } from './dto/create-song-artist-relation.dto';

@Controller('api/song-artist-relation')
export class SongArtistRelationController {
    constructor(private songArtistRelationService: SongArtistRelationService) {}

    @Get()
    showAllSongArtistRelations(@Query('api_token') apiToken = '') {
        return this.songArtistRelationService.showAll(apiToken);
    }

    @Post()
    createSongArtistRelation(@Query('api_token') apiToken = '', @Body() data: CreateSongArtistRelationDto) {
        return this.songArtistRelationService.create(apiToken, data);
    }
    
    @Get('/:artistId/:songId')
    getOneForId(@Query('api_token') apiToken = '', @Param('artistId') artistId: string, @Param('songId') songId: string) {
        return this.songArtistRelationService.findOne(apiToken, artistId, songId);
    }

    @Get('/search/artist/:artistId')
    getOneForartistId(@Query('api_token') apiToken = '', @Param('artistId') artistId: string) {
        return this.songArtistRelationService.findOneForartistId(apiToken, artistId);
    }

    @Get('/search/song/:songId')
    getOneForsongId(@Query('api_token') apiToken = '', @Param('songId') songId: string) {
        return this.songArtistRelationService.findOneForsongId(apiToken, songId);
    }

    @Put('/:artistId/:songId')
    updateSongArtistRelation(@Query('api_token') apiToken = '', @Param('artistId') artistId: string, @Param('songId') songId: string, @Body() data: Partial<CreateSongArtistRelationDto>) {
        return this.songArtistRelationService.update(apiToken, artistId, songId, data);
    }

    @Delete('/:artistId/:songId')
    deleteSongArtistRelation(@Query('api_token') apiToken = '', @Param('artistId') artistId: string, @Param('songId') songId: string) {
        return this.songArtistRelationService.delete(apiToken, artistId, songId);
    }
}

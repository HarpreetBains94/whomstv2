import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { SongArtistRelationService } from './song-artist-relation.service';
import { CreateSongArtistRelationDto } from './dto/create-song-artist-relation.dto';

@Controller('api/song-artist-relation')
export class SongArtistRelationController {
    constructor(private songArtistRelationService: SongArtistRelationService) {}

    @Get()
    showAllSongArtistRelations() {
        return this.songArtistRelationService.showAll();
    }

    @Post()
    createSongArtistRelation(@Body() data: CreateSongArtistRelationDto) {
        return this.songArtistRelationService.create(data);
    }
    
    @Get('/:artistId/:songId')
    getOneForId(@Param('artistId') artistId: string, @Param('songId') songId: string) {
        return this.songArtistRelationService.findOne(artistId, songId);
    }

    @Get('/search/artist/:artistId')
    getOneForartistId(@Param('artistId') artistId: string) {
        return this.songArtistRelationService.findOneForartistId(artistId);
    }

    @Get('/search/song/:songId')
    getOneForsongId(@Param('songId') songId: string) {
        return this.songArtistRelationService.findOneForsongId(songId);
    }

    @Put('/:artistId/:songId')
    updateSongArtistRelation(@Param('artistId') artistId: string, @Param('songId') songId: string, @Body() data: Partial<CreateSongArtistRelationDto>) {
        return this.songArtistRelationService.update(artistId, songId, data);
    }

    @Delete('/:artistId/:songId')
    deleteSongArtistRelation(@Param('artistId') artistId: string, @Param('songId') songId: string) {
        return this.songArtistRelationService.delete(artistId, songId);
    }
}

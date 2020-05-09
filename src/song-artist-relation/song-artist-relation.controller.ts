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
    getOneForId(@Param('artistId') artistId: number, @Param('songId') songId: number) {
        return this.songArtistRelationService.findOne(artistId, songId);
    }

    @Put('/:artistId/:songId')
    updateSongArtistRelation(@Param('artistId') artistId: number, @Param('songId') songId: number, @Body() data: Partial<CreateSongArtistRelationDto>) {
        return this.songArtistRelationService.update(artistId, songId, data);
    }

    @Delete('/:artistId/:songId')
    deleteSongArtistRelation(@Param('artistId') artistId: number, @Param('songId') songId: number) {
        return this.songArtistRelationService.delete(artistId, songId);
    }
}

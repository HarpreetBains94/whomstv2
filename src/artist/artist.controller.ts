import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('api/artist')
export class ArtistController {
    constructor(private artistService: ArtistService) {}

    @Get()
    showAllArtists() {
        return this.artistService.showAll();
    }

    @Post()
    createArtist(@Body() data: CreateArtistDto) {
        return this.artistService.create(data);
    }
    
    @Get(':id')
    getOneForId(@Param('id') id: string) {
        return this.artistService.findOne(id);
    }

    @Put(':id')
    updateArtist(@Param('id') id: string, @Body() data: Partial<CreateArtistDto>) {
        return this.artistService.update(id, data);
    }

    @Delete(':id')
    deleteArtist(@Param('id') id: string) {
        return this.artistService.delete(id);
    }
}

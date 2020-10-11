import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('api/artist')
export class ArtistController {
    constructor(private artistService: ArtistService) {}

    @Get()
    showAllArtists(@Query('api_token') apiToken = '') {
        return this.artistService.showAll(apiToken);
    }

    @Post()
    createArtist(@Query('api_token') apiToken = '', @Body() data: CreateArtistDto) {
        return this.artistService.create(apiToken, data);
    }
    
    @Get(':id')
    getOneForId(@Query('api_token') apiToken = '', @Param('id') id: string) {
        return this.artistService.findOne(apiToken, id);
    }

    @Get('search/:name')
    getWithName(@Query('api_token') apiToken = '', @Param('name') name: string) {
        return this.artistService.findWithName(apiToken, name);
    }

    @Put(':id')
    updateArtist(@Query('api_token') apiToken = '', @Param('id') id: string, @Body() data: Partial<CreateArtistDto>) {
        return this.artistService.update(apiToken, id, data);
    }

    @Delete(':id')
    deleteArtist(@Query('api_token') apiToken = '', @Param('id') id: string) {
        return this.artistService.delete(apiToken, id);
    }
}

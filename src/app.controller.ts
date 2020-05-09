import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';
import { Song } from './song/song.entity';
import { Pair } from './pair/pair.entity';
import { SongArtistRelation } from './song-artist-relation/song-artist-relation.entity';
import { Artist } from './artist/artist.entity';


@Controller()
export class AppController {
  constructor(
    private appService: AppService,
) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
) {}

  @Get()
  getRandom() {
    return this.appService.getRandom();
  }

  @Get(':id')
  getForId(@Param('id') sample_id: string) {
    return this.appService.getForId(sample_id);
  }

  @Get('/search/:query')
  searchSongs(@Param('query') query: string) {
    return this.appService.searchSongs(query);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ArtistModule } from './artist/artist.module';
import { SongModule } from './song/song.module';
import { SongArtistRelationModule } from './song-artist-relation/song-artist-relation.module';
import { PairModule } from './pair/pair.module';
import { BrokenLinkModule } from './broken-link/broken-link.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'test',
      database: 'whomst',
      entities: [
        'dist/**/*.entity.js'
      ],
      synchronize: true,
      logging: true
    }),
    ArtistModule,
    SongModule,
    SongArtistRelationModule,
    PairModule,
    BrokenLinkModule,
    RequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ArtistModule } from './artist/artist.module';
import { SongModule } from './song/song.module';
import { SongArtistRelationModule } from './song-artist-relation/song-artist-relation.module';
import { PairModule } from './pair/pair.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'test',
      database: 'whomst',
      entities: [
        // 'src/**/*.entity.ts',
        'dist/**/*.entity.js'
      ],
      synchronize: true,
      logging: true
    }),
    ArtistModule,
    SongModule,
    SongArtistRelationModule,
    PairModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

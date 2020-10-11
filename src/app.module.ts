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
import * as PostgressConnectionStringParser from 'pg-connection-string';

const connectionOptions = PostgressConnectionStringParser.parse(process.env.DATABASE_URL);

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: connectionOptions.host,
      port: Number.parseInt(connectionOptions.port) || 5432,
      username: connectionOptions.user,
      password: connectionOptions.password,
      database: connectionOptions.database,
      entities: [
        'dist/**/*.entity.js'
      ],
      synchronize: true,
      logging: true
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'test',
    //   database: 'whomst',
    //   entities: [
    //     'dist/**/*.entity.js'
    //   ],
    //   synchronize: true,
    //   logging: true
    // }),
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

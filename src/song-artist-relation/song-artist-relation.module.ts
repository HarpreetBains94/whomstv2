import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SongArtistRelation } from './song-artist-relation.entity';
import { SongArtistRelationController } from './song-artist-relation.controller';
import { SongArtistRelationService } from './song-artist-relation.service';

@Module({
    imports: [TypeOrmModule.forFeature([SongArtistRelation])],
    controllers: [SongArtistRelationController],
    providers: [SongArtistRelationService]
})
export class SongArtistRelationModule {}

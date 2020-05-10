import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SongArtistRelation } from './song-artist-relation.entity';
import { CreateSongArtistRelationDto } from './dto/create-song-artist-relation.dto';

@Injectable()
export class SongArtistRelationService {
    constructor(
        @InjectRepository(SongArtistRelation) private songArtistRelationRepository: Repository<SongArtistRelation>
    ) {}

    async showAll(): Promise<SongArtistRelation[]> {
        return await this.songArtistRelationRepository.find();
    }

    async create(data: CreateSongArtistRelationDto): Promise<SongArtistRelation> {
        const songArtistRelation = await this.songArtistRelationRepository.create(data);
        await this.songArtistRelationRepository.save(songArtistRelation);
        return songArtistRelation;
    }

    async findOne(artistId: string, songId: string): Promise<SongArtistRelation> {
        return await this.songArtistRelationRepository.findOne({artist_id: artistId, song_id: songId});
    }

    async findOneForartistId(artistId: string): Promise<SongArtistRelation[]> {
        return await this.songArtistRelationRepository.find({where: {artist_id: artistId}});
    }

    async findOneForsongId(songId: string): Promise<SongArtistRelation[]> {
        return await this.songArtistRelationRepository.find({where: {song_id: songId}});
    }

    async update(artistId: string, songId: string, data: Partial<CreateSongArtistRelationDto>): Promise<SongArtistRelation> {
        await this.songArtistRelationRepository.update({artist_id: artistId, song_id: songId}, data);
        return await this.songArtistRelationRepository.findOne({artist_id: artistId, song_id: songId})
    }

    async delete(artistId: string, songId: string): Promise<void> {
        await this.songArtistRelationRepository.delete({artist_id: artistId, song_id: songId});
    }
}

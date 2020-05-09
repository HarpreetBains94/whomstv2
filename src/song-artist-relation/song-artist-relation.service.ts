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
        const artist = await this.songArtistRelationRepository.create(data);
        await this.songArtistRelationRepository.save(artist);
        return artist;
    }

    async findOne(artistId: number, songId: number): Promise<SongArtistRelation> {
        return await this.songArtistRelationRepository.findOne({artistId, songId});
    }

    async update(artistId: number, songId: number, data: Partial<CreateSongArtistRelationDto>): Promise<SongArtistRelation> {
        await this.songArtistRelationRepository.update({artistId, songId}, data);
        return await this.songArtistRelationRepository.findOne({artistId, songId})
    }

    async delete(artistId: number, songId: number): Promise<void> {
        await this.songArtistRelationRepository.delete({artistId, songId});
    }
}

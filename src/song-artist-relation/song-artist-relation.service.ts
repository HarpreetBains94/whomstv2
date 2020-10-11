import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { SongArtistRelation } from './song-artist-relation.entity';
import { CreateSongArtistRelationDto } from './dto/create-song-artist-relation.dto';

@Injectable()
export class SongArtistRelationService {
    constructor(
        @InjectRepository(SongArtistRelation) private songArtistRelationRepository: Repository<SongArtistRelation>
    ) {}

    async showAll(apiToken: string, ): Promise<SongArtistRelation[]> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return await this.songArtistRelationRepository.find();
    }

    async create(apiToken: string, data: CreateSongArtistRelationDto): Promise<SongArtistRelation> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        const songArtistRelation = await this.songArtistRelationRepository.create(data);
        await this.songArtistRelationRepository.save(songArtistRelation);
        return songArtistRelation;
    }

    async findOne(apiToken: string, artistId: string, songId: string): Promise<SongArtistRelation> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return await this.songArtistRelationRepository.findOne({artist_id: artistId, song_id: songId});
    }

    async findOneForartistId(apiToken: string, artistId: string): Promise<SongArtistRelation[]> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return await this.songArtistRelationRepository.find({where: {artist_id: artistId}});
    }

    async findOneForsongId(apiToken: string, songId: string): Promise<SongArtistRelation[]> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return await this.songArtistRelationRepository.find({where: {song_id: songId}});
    }

    async update(apiToken: string, artistId: string, songId: string, data: Partial<CreateSongArtistRelationDto>): Promise<SongArtistRelation> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        await this.songArtistRelationRepository.update({artist_id: artistId, song_id: songId}, data);
        return await this.songArtistRelationRepository.findOne({artist_id: artistId, song_id: songId})
    }

    async delete(apiToken: string, artistId: string, songId: string): Promise<void> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        await this.songArtistRelationRepository.delete({artist_id: artistId, song_id: songId});
    }

    async validateApiToken(apiToken: string): Promise<boolean> {
        const entityManager = await new EntityManager(getConnection());
        const user = await entityManager.query(
            `SELECT hashedtoken  FROM xyz `
        );
        return await bcrypt.compare(apiToken, user[0].hashedtoken);
    }
}

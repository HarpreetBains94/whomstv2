import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, EntityManager, getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { Artist } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(Artist) private artistRepository: Repository<Artist>
    ) {}

    async showAll(apiToken: string, ): Promise<Artist[]> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return await this.artistRepository.find();
    }

    async create(apiToken: string, data: CreateArtistDto): Promise<Artist> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        const artist = await this .artistRepository.create(data);
        await this.artistRepository.save(artist);
        return artist;
    }

    async findOne(apiToken: string, id: string): Promise<Artist> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return await this.artistRepository.findOne(id);
    }

    async findWithName(apiToken: string, name: string): Promise<Artist[]> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return await this.artistRepository
            .createQueryBuilder('artist')
            .where("LOWER(name) LIKE :name", { name: `%${ name.toLowerCase() }%` })
            .getMany();
    }

    async update(apiToken: string, id: string, data: Partial<CreateArtistDto>): Promise<Artist> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        await this.artistRepository.update(id, data);
        return await this.artistRepository.findOne(id)
    }

    async delete(apiToken: string, id: string): Promise<void> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        await this.artistRepository.delete(id);
    }

    async validateApiToken(apiToken: string): Promise<boolean> {
        const entityManager = await new EntityManager(getConnection());
        const user = await entityManager.query(
            `SELECT hashedtoken  FROM xyz `
        );
        return await bcrypt.compare(apiToken, user[0].hashedtoken);
    }
}

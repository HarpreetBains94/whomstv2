import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, EntityManager, getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { Song } from './song.entity';
import { CreateSongDto } from './dto/create-song.dto';

@Injectable()
export class SongService {
    constructor(
        @InjectRepository(Song) private songRepository: Repository<Song>
    ) {}

    async showAll(apiToken: string, ): Promise<Song[]> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return await this.songRepository.find();
    }

    async create(apiToken: string, data: CreateSongDto): Promise<Song> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        const song = await this .songRepository.create(data);
        await this.songRepository.save(song);
        return song;
    }

    async findOne(apiToken: string, id: string): Promise<Song> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return await this.songRepository.findOne(id);
    }

    async findWithTitle(apiToken: string, title: string): Promise<Song[]> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return await this.songRepository
            .createQueryBuilder('song')
            .where("LOWER(title) LIKE :title", { title: `%${ title.toLowerCase() }%` })
            .getMany();
    }

    async update(apiToken: string, id: string, data: Partial<CreateSongDto>): Promise<Song> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        await this.songRepository.update(id, data);
        return await this.songRepository.findOne(id)
    }

    async delete(apiToken: string, id: string): Promise<void> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        await this.songRepository.delete(id);
    }

    async validateApiToken(apiToken: string): Promise<boolean> {
        const entityManager = await new EntityManager(getConnection());
        const user = await entityManager.query(
            `SELECT hashedtoken  FROM xyz `
        );
        return await bcrypt.compare(apiToken, user[0].hashedtoken);
    }
}

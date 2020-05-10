import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { Song } from './song.entity';
import { CreateSongDto } from './dto/create-song.dto';

@Injectable()
export class SongService {
    constructor(
        @InjectRepository(Song) private songRepository: Repository<Song>
    ) {}

    async showAll(): Promise<Song[]> {
        return await this.songRepository.find();
    }

    async create(data: CreateSongDto): Promise<Song> {
        const song = await this .songRepository.create(data);
        await this.songRepository.save(song);
        return song;
    }

    async findOne(id: string): Promise<Song> {
        return await this.songRepository.findOne(id);
    }

    async findWithTitle(title: string): Promise<Song[]> {
        return await this.songRepository
            .createQueryBuilder('song')
            .where("LOWER(title) LIKE :title", { title: `%${ title.toLowerCase() }%` })
            .getMany();
    }

    async update(id: string, data: Partial<CreateSongDto>): Promise<Song> {
        await this.songRepository.update(id, data);
        return await this.songRepository.findOne(id)
    }

    async delete(id: string): Promise<void> {
        await this.songRepository.delete(id);
    }
}

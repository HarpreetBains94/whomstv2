import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Artist } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(Artist) private artistRepository: Repository<Artist>
    ) {}

    async showAll(): Promise<Artist[]> {
        return await this.artistRepository.find();
    }

    async create(data: CreateArtistDto): Promise<Artist> {
        const artist = await this .artistRepository.create(data);
        await this.artistRepository.save(artist);
        return artist;
    }

    async findOne(id: string): Promise<Artist> {
        return await this.artistRepository.findOne(id);
    }

    async update(id: string, data: Partial<CreateArtistDto>): Promise<Artist> {
        await this.artistRepository.update(id, data);
        return await this.artistRepository.findOne(id)
    }

    async delete(id: string): Promise<void> {
        await this.artistRepository.delete(id);
    }
}

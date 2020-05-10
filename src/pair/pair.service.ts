import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pair } from './pair.entity';
import { CreatePairDto } from './dto/create-pair.dto';

@Injectable()
export class PairService {
    constructor(
        @InjectRepository(Pair) private pairRepository: Repository<Pair>
    ) {}

    async showAll(): Promise<Pair[]> {
        return await this.pairRepository.find();
    }

    async create(data: CreatePairDto): Promise<Pair> {
        const pair = await this.pairRepository.create(data);
        await this.pairRepository.save(pair);
        return pair;
    }

    async findOne(sampleId: string, songId: string): Promise<Pair> {
        return await this.pairRepository.findOne({sample_id: sampleId, song_id: songId});
    }

    async findOneForsongId(songId: string): Promise<Pair[]> {
        return await this.pairRepository.find({where: {song_id: songId}});
    }

    async findOneForsampleId(sampleId: string): Promise<Pair[]> {
        return await this.pairRepository.find({where: {sample_id: sampleId}});
    }

    async update(sampleId: string, songId: string, data: Partial<CreatePairDto>): Promise<Pair> {
        await this.pairRepository.update({sample_id: sampleId, song_id: songId}, data);
        return await this.pairRepository.findOne({sample_id: sampleId, song_id: songId})
    }

    async delete(sampleId: string, songId: string): Promise<void> {
        await this.pairRepository.delete({sample_id: sampleId, song_id: songId});
    }
}
  
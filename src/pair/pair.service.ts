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

    async findOne(sampleId: number, songId: number): Promise<Pair> {
        return await this.pairRepository.findOne({sampleId, songId});
    }

    async update(sampleId: number, songId: number, data: Partial<CreatePairDto>): Promise<Pair> {
        await this.pairRepository.update({sampleId, songId}, data);
        return await this.pairRepository.findOne({sampleId, songId})
    }

    async delete(sampleId: number, songId: number): Promise<void> {
        await this.pairRepository.delete({sampleId, songId});
    }
}
  
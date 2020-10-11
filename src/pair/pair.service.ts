import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { Pair } from './pair.entity';
import { CreatePairDto } from './dto/create-pair.dto';

@Injectable()
export class PairService {
    constructor(
        @InjectRepository(Pair) private pairRepository: Repository<Pair>
    ) {}

    async showAll(apiToken: string, ): Promise<Pair[]> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return await this.pairRepository.find();
    }

    async create(apiToken: string, data: CreatePairDto): Promise<Pair> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        const pair = await this.pairRepository.create(data);
        await this.pairRepository.save(pair);
        return pair;
    }

    async findOne(apiToken: string, sampleId: string, songId: string): Promise<Pair> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return await this.pairRepository.findOne({sample_id: sampleId, song_id: songId});
    }

    async findOneForsongId(apiToken: string, songId: string): Promise<Pair[]> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return await this.pairRepository.find({where: {song_id: songId}});
    }

    async findOneForsampleId(apiToken: string, sampleId: string): Promise<Pair[]> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return await this.pairRepository.find({where: {sample_id: sampleId}});
    }

    async update(apiToken: string, sampleId: string, songId: string, data: Partial<CreatePairDto>): Promise<Pair> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        await this.pairRepository.update({sample_id: sampleId, song_id: songId}, data);
        return await this.pairRepository.findOne({sample_id: sampleId, song_id: songId})
    }

    async delete(apiToken: string, sampleId: string, songId: string): Promise<void> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        await this.pairRepository.delete({sample_id: sampleId, song_id: songId});
    }

    async validateApiToken(apiToken: string): Promise<boolean> {
        const entityManager = await new EntityManager(getConnection());
        const user = await entityManager.query(
            `SELECT hashedtoken  FROM xyz `
        );
        return await bcrypt.compare(apiToken, user[0].hashedtoken);
    }
}
  
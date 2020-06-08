import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { BrokenLink } from './broken-link.entity';
import { BrokenLinkDto } from './dto/broken-link.dto';

@Injectable()
export class BrokenLinkService {
    constructor(
        @InjectRepository(BrokenLink) private brokenLinkRepository: Repository<BrokenLink>
    ) {}

    async showAll(apiToken: string): Promise<BrokenLink[]> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return await this.brokenLinkRepository.find();
    }

    async create(data: BrokenLinkDto): Promise<BrokenLink> {
        const brokenLink = await this .brokenLinkRepository.create(data);
        await this.brokenLinkRepository.save(brokenLink);
        return brokenLink;
    }

    async deleteAll(apiToken: string): Promise<void> {
        const isValid = await this.validateApiToken(apiToken);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        await this.brokenLinkRepository.clear();
    }

    async validateApiToken(apiToken: string): Promise<boolean> {
        const entityManager = await new EntityManager(getConnection());
        const user = await entityManager.query(
            `SELECT hashedtoken  FROM xyz `
        );
        return await bcrypt.compare(apiToken, user[0].hashedtoken);
    }
}

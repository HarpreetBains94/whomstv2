import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany
} from "typeorm";
import { Optional } from "@nestjs/common";

import { SongArtistRelation } from 'src/song-artist-relation/song-artist-relation.entity';

@Entity()
export class Artist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Optional()
    @OneToMany(() => SongArtistRelation, sar => sar.artist)
    artistRelation: Promise<SongArtistRelation[]>;
}
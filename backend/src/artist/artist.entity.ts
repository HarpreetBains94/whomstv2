import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    Unique
} from "typeorm";
import { Optional } from "@nestjs/common";

import { SongArtistRelation } from 'src/song-artist-relation/song-artist-relation.entity';

@Entity()
@Unique(["name"])
export class Artist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({name: "name"})
    name: string;

    @Optional()
    @OneToMany(() => SongArtistRelation, sar => sar.artist)
    artistRelation: Promise<SongArtistRelation[]>;
}
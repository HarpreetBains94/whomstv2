import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany
} from "typeorm";
import { Optional } from "@nestjs/common";

import { SongArtistRelation } from "src/song-artist-relation/song-artist-relation.entity";
import { Pair } from "src/pair/pair.entity";

@Entity()
export class Song extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    url: string;

    @Column()
    is_sample: boolean;

    @Optional()
    @OneToMany(() => SongArtistRelation, sar => sar.song)
    songRelation: SongArtistRelation[];

    @Optional()
    @OneToMany(() => Pair, pair => pair.song)
    pairsAsSong: Pair[];

    @Optional()
    @OneToMany(() => Pair, pair => pair.sample)
    pairsAsSample: Pair[];
}
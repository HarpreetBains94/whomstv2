import {
    Entity,
    Column,
    BaseEntity,
    ManyToOne,
    PrimaryColumn,
    JoinColumn
} from "typeorm";

import { Song } from "src/song/song.entity";

@Entity()
export class Pair extends BaseEntity {
    @PrimaryColumn()
    songId: number;

    @PrimaryColumn()
    sampleId: number;

    @Column()
    songTimestamp: number;

    @Column()
    sampleTimestamp: number;

    @ManyToOne(() => Song, s => s.pairsAsSong, {primary: true})
    @JoinColumn({name: 'songId'})
    song: Promise<Song>;

    @ManyToOne(() => Song, s => s.pairsAsSample, {primary: true})
    @JoinColumn({name: 'sampleId'})
    sample: Promise<Song>;
}
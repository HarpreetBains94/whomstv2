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
    song_id: string;

    @PrimaryColumn()
    sample_id: string;

    @Column()
    song_timestamp: number;

    @Column()
    sample_timestamp: number;

    @ManyToOne(() => Song, s => s.pairsAsSong, {primary: true})
    @JoinColumn({name: 'song_id'})
    song: Promise<Song>;

    @ManyToOne(() => Song, s => s.pairsAsSample, {primary: true})
    @JoinColumn({name: 'sample_id'})
    sample: Promise<Song>;
}
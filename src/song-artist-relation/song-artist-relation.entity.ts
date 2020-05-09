import {
    Entity,
    Column,
    BaseEntity,
    ManyToOne,
    PrimaryColumn,
    JoinColumn
} from "typeorm";
import { Artist } from 'src/artist/artist.entity';
import { Song } from "src/song/song.entity";

@Entity()
export class SongArtistRelation extends BaseEntity {
    @PrimaryColumn()
    songId: number
    
    @PrimaryColumn()
    artistId: number

    @Column()
    isFeat: boolean;

    @ManyToOne(() => Artist, a => a.artistRelation, {primary: true})
    @JoinColumn({name: 'artistId'})
    artist: Promise<Artist>;

    @ManyToOne(() => Song, s => s.songRelation, {primary: true})
    @JoinColumn({name: 'songId'})
    song: Promise<Song>;
}
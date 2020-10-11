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
    song_id: string
    
    @PrimaryColumn()
    artist_id: string

    @PrimaryColumn({
        default: false
    })
    is_feat: boolean;

    @PrimaryColumn({
        default: false
    })
    is_prod: boolean;

    @ManyToOne(() => Artist, a => a.artistRelation, {primary: true})
    @JoinColumn({name: 'artist_id'})
    artist: Promise<Artist>;

    @ManyToOne(() => Song, s => s.songRelation, {primary: true})
    @JoinColumn({name: 'song_id'})
    song: Promise<Song>;
}
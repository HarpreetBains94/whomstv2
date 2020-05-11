export class CreateSongArtistRelationDto {
    readonly song_id: string
    readonly artist_id: string
    readonly is_feat: boolean
}
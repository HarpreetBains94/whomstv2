export class CreateSongArtistRelationDto {
    readonly songId: number
    readonly artistId: number
    readonly isFeat: boolean
}
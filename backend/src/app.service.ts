import { Injectable } from '@nestjs/common';
import { getConnection, EntityManager } from 'typeorm';

import { Song } from './song/song.entity';
import { Pair } from './pair/pair.entity';
import { SongArtistRelation } from './song-artist-relation/song-artist-relation.entity';
import { Artist } from './artist/artist.entity';

@Injectable()
export class AppService {
  async getRandom() {
    const randomsampleId = await this.getRandomsampleId();
    return await this.getForId(randomsampleId);
  }

  private async getRandomsampleId(): Promise<string> {
    const randomSample = await getConnection()
      .getRepository(Song)
      .createQueryBuilder('song')
      .where('song.is_sample = true')
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();
    return randomSample.id;
  }

  async getForId(sampleId: string) {
    const sample = await Song.findOne(sampleId);
    const artists = await this.getArtistsForSong(sampleId);
    const pairs = await Pair.find({where: {sampleId}});
    const mappedPairs = await Promise.all(pairs.map(async (pair) => {
      const song = await Song.findOne(pair.song_id);
      const artists = await this.getArtistsForSong(pair.song_id);
      return {
        song,
        artists,
        song_timestamp: pair.song_timestamp,
        sample_timestamp: pair.sample_timestamp
      };
    }));
    const randomsampleId = await this.getRandomsampleId();
    return {
      sample,
      artists,
      pairs: mappedPairs,
      randomsampleId
    };
  }

  // TODO fix type hinting
  private async getArtistsForSong(id: string): Promise<{name: string; is_feat: boolean}[]> {
    const artistRelations = await SongArtistRelation.find({where: {songId: id}});
    const artists = await artistRelations.map(async (artistRelation) => {
      const artist = await Artist.findOne(artistRelation.artist_id);
      return {
        name: artist.name,
        is_feat: artistRelation.is_feat
      };
    });
    return Promise.all(artists);
  }

  async searchSongs(query: string) {
    const cleanedQuery = this.cleanQuery(query);
    const entityManager = await new EntityManager(getConnection());
    const songIds = await this.fetchSongIdsForQuery(entityManager, cleanedQuery);
    if (songIds.length < 1) {
      return;
    }
    const fullSongArtistPairs = await this.fetchFullSongArtistPairsForIds(entityManager, songIds);
    const groupedSongs = this.groupSongArtistPairs(fullSongArtistPairs);
    return Object.values(groupedSongs);
    // Ignore for now. Dont judge me.
    // const songs = await enitityManager.query(
    //   'SELECT artist.name AS artist_name ' +
    //   ', song.id AS song_id ' +
    //   ', song.title AS song_title ' +
    //   'FROM artist ' +
    //   'LEFT OUTER ' +
    //   'JOIN song_artist_relation ' + 
    //   'ON song_artist_relation.artist_id = artist.id ' +
    //   'LEFT OUTER ' +
    //   'JOIN song ' +
    //   'ON song.id = song_artist_relation.song_id ' +
    //   `WHERE LOWER(artist.name) SIMILAR TO '${cleanedQuery}' ` +
    //   'UNION ALL ' +
    //   'SELECT artist2.name ' + 
    //   ', song.id ' +      
    //   ', song.title ' +   
    //   'FROM artist ' +
    //   'LEFT OUTER ' +
    //   'JOIN song_artist_relation ' +
    //   'ON song_artist_relation.artist_id = artist.id ' +
    //   'LEFT OUTER ' +
    //   'JOIN song ' +
    //   'ON song.id = song_artist_relation.song_id ' +
    //   'LEFT OUTER ' +
    //   'JOIN song_artist_relation AS song_artist_relation2 ' +
    //   'ON song_artist_relation2.song_id = song.id ' +  
    //   'AND song_artist_relation2.artist_id <> song_artist_relation.artist_id ' +
    //   'LEFT OUTER ' +
    //   'JOIN artist AS artist2 ' +
    //   'ON artist2.id = song_artist_relation2.artist_id ' +  
    //   `WHERE LOWER(artist.name) SIMILAR TO '${cleanedQuery}' AND artist2.name IS NOT NULL ` +
    //   'UNION ' +
    //   'SELECT DISTINCT ON (artist.name, song.id) artist.name   AS artist_name ' +
    //   ', song.id AS song_id ' +
    //   ', song.title AS song_title ' +
    //   'FROM song ' +
    //   'LEFT OUTER ' +
    //   'JOIN song_artist_relation ' +
    //   'ON song_artist_relation.song_id = song.id ' +
    //   'LEFT OUTER ' +
    //   'JOIN artist ' +
    //   'ON artist.id = song_artist_relation.artist_id ' +
    //   `WHERE LOWER(song.title) SIMILAR TO '${cleanedQuery}'`
    // );
  }

  private cleanQuery(query: string): string {
    const words = query.split(' ').map((word) => { return word.toLowerCase() });
    return '%(' + words.join('|') + ')%';
  }

  private async fetchSongIdsForQuery(entityManager: EntityManager, cleanedQuery: string): Promise<string[]> {
    const songs = await entityManager.query(
      'SELECT song.id as song_id FROM song ' +
      'RIGHT JOIN song_artist_relation on song.id = song_artist_relation.song_id ' +
      'LEFT JOIN artist on song_artist_relation.artist_id = artist.id ' +
      `WHERE LOWER(artist.name) SIMILAR TO '%(${cleanedQuery})%' OR LOWER(song.title) SIMILAR TO '%(${cleanedQuery})%'`
    );
    return songs.map((song) => {return song.song_id});
  }

  private async fetchFullSongArtistPairsForIds(entityManager: EntityManager, songIds: string[]): Promise<any[]> {
    return await entityManager.query(
      'SELECT artist.name, song_artist_relation.is_feat, song.id as song_id, song.title FROM song ' +
      'RIGHT JOIN song_artist_relation on song.id = song_artist_relation.song_id ' +
      'LEFT JOIN artist on song_artist_relation.artist_id = artist.id ' +
      `WHERE song.id IN (${songIds})`
    );
  }

  private groupSongArtistPairs(pairs: any[]): any[]{
    return pairs.reduce((arr, row) => {
      if (!arr[row.song_id]) {
        arr[row.song_id] = {
          songId: row.song_id,
          title: row.title,
          artists: [],
          featArtists: []
        };
      }
      if (row.is_feat) {
        arr[row.song_id].featArtists.push(row.name);
        return arr;
      }
      arr[row.song_id].artists.push(row.name);
      return arr;
    }, Object.create(null));
  }
}

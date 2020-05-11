import { Test, TestingModule } from '@nestjs/testing';
import { SongArtistRelationService } from './song-artist-relation.service';

describe('SongArtistRelationService', () => {
  let service: SongArtistRelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongArtistRelationService],
    }).compile();

    service = module.get<SongArtistRelationService>(SongArtistRelationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

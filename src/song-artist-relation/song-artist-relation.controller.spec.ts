import { Test, TestingModule } from '@nestjs/testing';
import { SongArtistRelationController } from './song-artist-relation.controller';

describe('SongArtistRelation Controller', () => {
  let controller: SongArtistRelationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongArtistRelationController],
    }).compile();

    controller = module.get<SongArtistRelationController>(SongArtistRelationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

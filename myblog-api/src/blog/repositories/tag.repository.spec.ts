import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TagRepository } from './tag.repository';

describe('TagRepository', () => {
  let service: TagRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagRepository,
        {
          provide: getModelToken('Tag'),
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<TagRepository>(TagRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

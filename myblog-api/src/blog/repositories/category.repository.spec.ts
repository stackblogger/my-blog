import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CategoryRepository } from './category.repository';
import { Model, Query } from 'mongoose';
import { Category } from '../models/category.model';

describe('CategoryRepository', () => {
  const cat = {
    _id: '644af9095fabb9e3d0d76f54',
    name: 'Garfield'
  };
  let service: CategoryRepository;
  let model: Model<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryRepository,
        {
          provide: getModelToken('Category'),
          useValue: {
            findOneAndUpdate: jest.fn(),
            exec: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<CategoryRepository>(CategoryRepository);
    model = module.get<Model<Category>>(getModelToken('Category'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a cat successfully', async () => {
    jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(cat)
    } as unknown as Query<Category, Category>);
    const updatedCat = await service.create(cat as Category);
    expect(updatedCat).toMatchObject(cat);
  });
});

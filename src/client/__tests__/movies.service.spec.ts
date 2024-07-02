import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from '../../movies/movies.controller';
import { MoviesService } from '../../movies/movies.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMovieDto } from '../../movies/dto/create-movie.dto';
import { UpdateMovieDto } from '../../movies/dto/update-movie.dto';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: PrismaService,
          useValue: {
            movie: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie successfully', async () => {
      const result = {
        message: 'Movie created successfully',
        movie: {
          id: 1,
          title: 'Inception',
          description: 'A mind-bending thriller',
          releaseDate: new Date('2010-07-16T00:00:00.000Z'),
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
      };
      const createMovieDto: CreateMovieDto = {
        title: 'Inception',
        description: 'A mind-bending thriller',
        releaseDate: '2010-07-16T00:00:00.000Z',
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createMovieDto, { user: { userId: 1 } } as any)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const result = [
        {
          id: 1,
          title: 'Inception',
          description: 'A mind-bending thriller',
          releaseDate: new Date('2010-07-16T00:00:00.000Z'),
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single movie', async () => {
      const result = {
        id: 1,
        title: 'Inception',
        description: 'A mind-bending thriller',
        releaseDate: new Date('2010-07-16T00:00:00.000Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a movie successfully', async () => {
      const result = {
        message: 'Movie updated successfully',
        movie: {
          id: 1,
          title: 'Inception Updated',
          description: 'A mind-bending thriller',
          releaseDate: new Date('2010-07-16T00:00:00.000Z'),
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
      };
      const updateMovieDto: UpdateMovieDto = {
        title: 'Inception Updated',
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', updateMovieDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete a movie successfully', async () => {
      const result = {
        message: 'Movie deleted successfully',
        movie: {
          id: 1,
          title: 'Inception',
          description: 'A mind-bending thriller',
          releaseDate: new Date('2010-07-16T00:00:00.000Z'),
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
      };
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toBe(result);
    });
  });
});

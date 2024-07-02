import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto, userId: number) {
    const { title, description, releaseDate } = createMovieDto;
    const movie = await this.prisma.movie.create({
      data: {
        title,
        description,
        releaseDate: new Date(releaseDate),
        userId,
      },
    });
    return { message: 'Movie created successfully', movie };
  }

  async findAll() {
    return this.prisma.movie.findMany();
  }

  async findOne(id: number) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.prisma.movie.update({
      where: { id },
      data: {
        ...updateMovieDto,
        releaseDate: updateMovieDto.releaseDate ? new Date(updateMovieDto.releaseDate) : undefined,
      },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return { message: 'Movie updated successfully', movie };
  }

  async remove(id: number) {
    const movie = await this.prisma.movie.delete({
      where: { id },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return { message: 'Movie deleted successfully', movie };
  }
}

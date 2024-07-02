import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/create-movie.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('movies')
@ApiBearerAuth()
@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Create a new movie' })
  @ApiResponse({ status: 201, description: 'Movie created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto, @Req() req: Request) {
    if (!req.user) {
      throw new BadRequestException('User information not found in request');
    }
    const userId = req.user.userId;
    try {
      const result = await this.moviesService.create(createMovieDto, userId);
      console.log('Create Movie Result:', result);
      return result;
    } catch (error) {
      console.error('Create Movie Error:', error);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get all movies' })
  @ApiResponse({ status: 200, description: 'Return all movies.' })
  @Get()
  async findAll() {
    const result = await this.moviesService.findAll();
    console.log('Find All Movies Result:', result);
    return result;
  }

  @ApiOperation({ summary: 'Get a movie by ID' })
  @ApiResponse({ status: 200, description: 'Return the movie.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.moviesService.findOne(+id);
      console.log('Find One Movie Result:', result);
      return result;
    } catch (error) {
      console.error('Find One Movie Error:', error);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update a movie by ID' })
  @ApiResponse({ status: 200, description: 'Movie updated successfully.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    try {
      const result = await this.moviesService.update(+id, updateMovieDto);
      console.log('Update Movie Result:', result);
      return result;
    } catch (error) {
      console.error('Update Movie Error:', error);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete a movie by ID' })
  @ApiResponse({ status: 200, description: 'Movie deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.moviesService.remove(+id);
      console.log('Delete Movie Result:', result);
      return result;
    } catch (error) {
      console.error('Delete Movie Error:', error);
      throw error;
    }
  }
}

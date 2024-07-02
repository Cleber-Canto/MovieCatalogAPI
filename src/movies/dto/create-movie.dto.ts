import { IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ example: 'Inception', description: 'Title of the movie' })
    @IsString()
    title!: string;

  @ApiProperty({ example: 'A mind-bending thriller', description: 'Description of the movie' })
    @IsString()
    description!: string;

  @ApiProperty({ example: '2010-07-16T00:00:00.000Z', description: 'Release date of the movie' })
    @IsDateString()
    releaseDate!: string;
}

export class UpdateMovieDto {
  @ApiProperty({ example: 'Inception', description: 'Title of the movie', required: false })
  @IsString()
  title?: string;

  @ApiProperty({ example: 'A mind-bending thriller', description: 'Description of the movie', required: false })
  @IsString()
  description?: string;

  @ApiProperty({ example: '2010-07-16T00:00:00.000Z', description: 'Release date of the movie', required: false })
  @IsDateString()
  releaseDate?: string;
}

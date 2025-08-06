import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ContentType } from '../entities/content.entity';

export class GenerateContentDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @IsEnum(['POST', 'STORY'], { message: 'Type must be POST or STORY.' })
  type: ContentType;
}

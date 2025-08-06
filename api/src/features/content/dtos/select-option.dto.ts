import { IsString, IsNotEmpty } from 'class-validator';
// import { SelectedOption } from '../entities/content.entity';

export class SelectedOptionDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  selected: 'A' | 'B';
}

import { IsString, IsNotEmpty } from 'class-validator';

export class SelectedOptionDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  selected: 'A' | 'B';
}

import { IsString, IsNotEmpty } from 'class-validator';

export class SelectedOptionDto {
  @IsString()
  @IsNotEmpty()
  selected: 'A' | 'B';
}

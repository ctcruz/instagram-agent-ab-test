import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ContentService } from './content.service';
import { GenerateContentDto } from './dtos/generate-content.dto';
import { SelectedOptionDto } from './dtos/select-option.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly service: ContentService) {}

  @Post('generate')
  async generate(@Body() body: GenerateContentDto) {
    return this.service.generate(body.prompt, body.type);
  }

  @Put('select')
  async select(@Body() body: SelectedOptionDto) {
    return this.service.select(body.id, body.selected);
  }

  @Get('history')
  async history() {
    return this.service.history();
  }
}

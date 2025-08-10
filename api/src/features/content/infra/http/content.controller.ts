import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ContentService } from '../../application/content.service';
import { GenerateContentDto } from '../../dtos/generate-content.dto';
import { SelectedOptionDto } from '../../dtos/select-option.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('generate')
  generate(@Body() dto: GenerateContentDto) {
    return this.contentService.generate(dto.prompt, dto.type);
  }

  @Put(':id/select')
  async select(@Param('id') id: string, @Body() body: SelectedOptionDto) {
    return this.contentService.select(id, body.selected);
  }

  @Get('history')
  history() {
    return this.contentService.history();
  }

  @Get('insights')
  async insights() {
    return this.contentService.insights();
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
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

  @Post(':uuid/select')
  async select(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() body: SelectedOptionDto,
  ): Promise<void> {
    // select(@Param('id') id: string, @Body() body: SelectedOptionDto) {
    await this.contentService.select(uuid, body.selected);
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

import { Controller, Get } from '@nestjs/common';
import { PromptTemplateInsightDto } from '../prompt-template/dtos/insights-response.dto';
import { PromptOptimizerService } from '../prompt-template/prompt-optimizer.service';

@Controller('prompt-template')
export class PromptTemplateController {
  constructor(private readonly service: PromptOptimizerService) {}

  @Get('insights')
  async insights(): Promise<PromptTemplateInsightDto[]> {
    return this.service.getPromptTemplateInsights();
  }
}

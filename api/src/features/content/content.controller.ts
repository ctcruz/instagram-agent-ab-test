import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ContentService } from './content.service';
import { GenerateContentDto } from './dtos/generate-content.dto';
import { SelectedOptionDto } from './dtos/select-option.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly service: ContentService) {}

  @Post('generate')
  generate(@Body() body: GenerateContentDto) {
    // return this.service.generate(body.prompt, body.type);
    return {
      optionA: {
        caption:
          "🌞✨ Embrace the summer glow with these essential skincare tips! ✨🌞 Don't let the sun damage your skin - check out our top recommendations for a radiant summer complexion. 💦🌿 #SummerSkincare #GlowingSkin #SunProtection #HealthyComplexion #SkincareRoutine",
        hashtags: [],
      },
      optionB: {
        caption:
          '🌞☀️ Embrace the summer glow with these essential skincare tips! ☀️🌞 Keep your skin hydrated and protected all season long. #SummerSkincare #HealthyGlow #SunscreenSavior #MoistureMagic',
        hashtags: [],
      },
    };
  }

  @Put('select')
  async select(@Body() body: SelectedOptionDto) {
    return this.service.select(body.id, body.selected);
  }

  @Get('history')
  history() {
    return this.service.history();
  }
}

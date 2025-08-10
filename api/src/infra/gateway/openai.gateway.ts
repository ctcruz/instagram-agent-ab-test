import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { ContentType } from '../../domain/entities/content.entity';
import { IAIGateway } from '../../domain/interfaces/ai.gateway.interface';

@Injectable()
export class OpenAIGateway implements IAIGateway {
  private client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  private model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

  async generate(
    prompt: string,
    type: ContentType,
    systemPrompt: string,
  ): Promise<{ caption: string; hashtags: string[] }> {
    {
      const user = `
        Generate an Instagram ${type === 'POST' ? 'Post' : 'Story'} for the theme: "${prompt}". 
        Return JSON with keys: caption (string), hashtags (string[]). 5-8 hashtags.
      `;

      const res = await this.client.chat.completions.create({
        model: this.model,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: user },
        ],
        temperature: 0.7,
      });

      const content = res.choices[0]?.message?.content || '{}';
      let parsed = {} as unknown as {
        caption: string;
        hashtags: string[];
      };
      try {
        parsed = JSON.parse(content) as unknown as {
          caption: string;
          hashtags: string[];
        };
      } catch {
        console.log('Error');
      }
      return {
        caption: String(parsed?.caption ?? '').trim(),
        hashtags: Array.isArray(parsed?.hashtags) ? parsed.hashtags : [],
      };
    }
  }
}

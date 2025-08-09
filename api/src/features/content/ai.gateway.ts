// import { Injectable, Logger } from '@nestjs/common';
// import { IAIGateway } from './interfaces/ai.gateway.interface';
// import { ContentType } from './entities/content.entity';
// import OpenAI from 'openai';

// @Injectable()
// export class OpenAIGateway implements IAIGateway {
//   private readonly logger = new Logger(OpenAIGateway.name);
//   private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';
//   private readonly model = 'gpt-3.5-turbo';
//   private openai: OpenAI;

//   constructor() {
//     this.openai = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY,
//     });
//   }

//   async generate(
//     prompt: string,
//     type: ContentType,
//   ): Promise<{ caption: string; hashtags: string[] }> {
//     try {
//       const systemPrompt = `
//         You're an Instagram digital marketing specialist.
//         Create content in the format ${type === 'POST' ? 'Post' : 'Story'} based on the following theme: "${prompt}".
//         The response should return a valid JSON object with legend and hashtags keys. The legend key value is a string with an engaging legend. The hashtags key value is a array of strings with maximum of 5 relevant items.
//         Example:
//         {
//           "ledend": "Protect your skin and keep it glowing all summer long with these essential skincare tips.",
//           "hashtags": [
//             "#SkincareRoutine",
//             "#Sunscreen",
//             "#Hydration",
//             "#HealthySkin",
//             "#SummerVibe"
//           ]
//         }
//       `;

//       const completion = await this.openai.chat.completions.create({
//         model: 'gpt-3.5-turbo', // ou gpt-4o, gpt-3.5-turbo etc.
//         temperature: 0.7,
//         messages: [
//           {
//             role: 'system',
//             content: 'You are a creative social media wizard.',
//           },
//           { role: 'user', content: systemPrompt },
//         ],
//         // max_tokens: 70,
//       });

//       const content = completion.choices[0].message.content;

//       console.log('content:', content);
//       console.log('content:', JSON.parse(content!));

//       const { legend: caption, hashtags } = JSON.parse(content!) as {
//         legend: string;
//         hashtags: string[];
//       };
//       // const { caption, hashtags } = this.extractCaptionAndHashtags(content!);
//       console.log({ caption, hashtags });
//       return { caption, hashtags };
//     } catch (error) {
//       this.logger.error('Error generating content with OpenAI', error);
//       throw new Error('Failed to generated content with AI');
//     }
//   }

//   private extractCaptionAndHashtags(text: string): {
//     caption: string;
//     hashtags: string[];
//   } {
//     const captionMatch = text.match(/Legend:\s*(.+)/i);
//     const hashtagsMatch = text.match(/Hashtags?:\s*(.+)/i);

//     const caption = captionMatch?.[1]?.trim() ?? text.trim();
//     const hashtagsRaw = hashtagsMatch?.[1] ?? '';
//     const hashtags = hashtagsRaw
//       .split(/[,#\n]/)
//       .map((tag) => tag.trim())
//       .filter((tag) => tag.length > 0 && !tag.includes(' '))
//       .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`));

//     return { caption, hashtags };
//   }
// }

// src/modules/content/ai.gateway.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { IAIGateway } from './interfaces/ai.gateway.interface';
import { ContentType } from './entities/content.entity';

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
      const user = `Generate an Instagram ${type === 'POST' ? 'Post' : 'Story'} for the theme: "${prompt}". 
Return JSON with keys: caption (string), hashtags (string[]). 5-8 hashtags.`;

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

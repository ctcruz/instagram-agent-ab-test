import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { IAIGateway } from './interfaces/ai.gateway.interface';
import { ContentType } from './entities/content.entity';

@Injectable()
export class OpenAIGateway implements IAIGateway {
  private readonly logger = new Logger(OpenAIGateway.name);
  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';
  private readonly model = 'gpt-3.5-turbo';

  async generate(
    prompt: string,
    type: ContentType,
  ): Promise<{ caption: string; hashtags: string[] }> {
    try {
      const systemPrompt = `  
        You're an Instagram digital marketing specialist.
        Create content in the format ${type === 'POST' ? 'Post' : 'Story'} based on the following theme: "${prompt}".
        Include an engaging caption and a list of 3 to 5 relevant hashtags, separated by commas.
      `;

      const response = await axios.post(
        this.apiUrl,
        {
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are a creative social media wizard.',
            },
            { role: 'user', content: systemPrompt },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const content = response.data.choices[0].message.content as string;

      const { caption, hashtags } = this.extractCaptionAndHashtags(content);

      return { caption, hashtags };
    } catch (error) {
      this.logger.error('Error generating content with OpenAI', error);
      throw new Error('Failed to generated content with AI');
    }
  }

  private extractCaptionAndHashtags(text: string): {
    caption: string;
    hashtags: string[];
  } {
    const captionMatch = text.match(/Legend:\s*(.+)/i);
    const hashtagsMatch = text.match(/Hashtags?:\s*(.+)/i);

    const caption = captionMatch?.[1]?.trim() ?? text.trim();
    const hashtagsRaw = hashtagsMatch?.[1] ?? '';
    const hashtags = hashtagsRaw
      .split(/[,#\n]/)
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0 && !tag.includes(' '))
      .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`));

    return { caption, hashtags };
  }
}

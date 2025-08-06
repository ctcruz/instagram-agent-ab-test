import { ContentType } from '../entities/content.entity';

export interface IAIGateway {
  generate(
    prompt: string,
    type: ContentType,
  ): Promise<{ caption: string; hashtags: string[] }>;
}

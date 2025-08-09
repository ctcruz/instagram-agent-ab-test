import { PromptTemplate } from '../entities/prompt-template.entity';

export interface IPromptTemplateRepository {
  getTemplateById(
    id: string,
  ): Promise<
    Pick<PromptTemplate, 'id' | 'name' | 'systemPrompt' | 'alpha' | 'beta'>
  >;
}

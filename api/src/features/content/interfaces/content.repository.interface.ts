import { PromptTemplate } from 'generated/prisma';
import { Content } from '../entities/content.entity';

export interface IContentRepository {
  save(content: Omit<Content, 'id' | 'createdAt'>): Promise<Content>;
  updateSelection(id: string, selected: 'A' | 'B'): Promise<void>;
  findAll(): Promise<Content[]>;
  findById(id: string): Promise<Content | null>;
  getTemplateById(
    id: string,
  ): Promise<
    Pick<PromptTemplate, 'id' | 'systemPrompt' | 'name' | 'alpha' | 'beta'>
  >;
}

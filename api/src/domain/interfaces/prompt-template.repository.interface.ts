import { PromptTemplate } from '../entities/prompt-template.entity';

export interface IPromptTemplateRepository {
  findAll(): Promise<PromptTemplate[]>;
  incrementAppearances(templateIds: string[]): Promise<void>;
  recordOutcome(winnerId: string, loserId: string): Promise<void>;
}

export class PromptTemplate {
  constructor(
    public id: string,
    public name: string,
    public systemPrompt: string,
    public alpha: number,
    public beta: number,
    public appearances: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}

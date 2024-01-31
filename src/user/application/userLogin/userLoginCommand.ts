import { ICommand } from '@nestjs/cqrs';

export class UserLoginCommand implements ICommand {
  constructor(
    public name: string,
    public email: string,
    public sub?: string,
    public provider?: string,
  ) {}
}

export class User {
  public readonly id: number | null;
  public name: string;
  public email: string;
  public sub: string;
  public provider: string;

  constructor(details: Partial<User>) {
    this.id = details.id || null; // Assuming ID can be null for a new user
    this.name = details.name || '';
    this.email = details.email || '';
    this.sub = details.sub || '';
    this.provider = details.provider || '';
  }

  static createUser(details: Partial<User>): User {
    return new User(details);
  }
}

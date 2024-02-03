export class User {
  constructor(
    public id: string | null,
    public name: string,
    public username: string,
    public email: string,
    public passwordHash: string,
    public lastVerified?: Date,
  ) {}

  get isVerified() {
    return !!this.lastVerified;
  }
}

export class User {
  constructor(
    public id: string | null,
    public name: string,
    public username: string,
    public email: string,
    public passwordHash: string,
    public passwordSalt: string
  ) {
  }
}

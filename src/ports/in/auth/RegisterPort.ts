export type RegisterPortOptions = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export interface RegisterPort {
  register(options: RegisterPortOptions): Promise<void>;
}

export const RegisterPort = Symbol('RegisterPort');

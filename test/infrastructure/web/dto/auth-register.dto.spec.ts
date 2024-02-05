import { validate } from 'class-validator';
import { AuthRegisterDto } from '@infrastructure/web/dto/auth-register.dto';

describe('AuthRegisterDto', () => {
  let dto: AuthRegisterDto;

  beforeEach(() => {
    dto = new AuthRegisterDto();
    dto.name = 'John Doe';
    dto.username = 'sarps123';
    dto.email = 'example@email.com';
    dto.password = 'ZL4IW90N7Wsn3IC!';
    dto.passwordConfirmation = 'ZL4IW90N7Wsn3IC!';
  });

  it('should validate with no errors for valid data', async () => {
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if name is empty', async () => {
    dto.name = '';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toEqual('name');
  });

  it('should fail validation if username is not alphanumeric', async () => {
    dto.username = 'invalid username!';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toEqual('username');
  });

  it('should fail validation if email is invalid', async () => {
    dto.email = 'invalid-email';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toEqual('email');
  });

  it('should fail validation if password does not meet complexity requirements', async () => {
    dto.password = 'weak';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toEqual('password');
    // Depending on the implementation of @IsStrongPassword, check for specific constraints
  });

  it('should fail validation if passwordConfirmation does not match password', async () => {
    dto.passwordConfirmation = 'mismatch';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    // Ensure there's an error related to passwordConfirmation mismatch
    const passwordConfirmationError = errors.find(
      (error) => error.property === 'passwordConfirmation',
    );
    expect(passwordConfirmationError).toBeDefined();
    expect(passwordConfirmationError.constraints.isEmpty).toBeDefined();
  });
});

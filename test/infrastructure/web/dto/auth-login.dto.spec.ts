import { validate } from 'class-validator';
import { AuthLoginDto } from '@infrastructure/web/dto/auth-login.dto';

describe('AuthLoginDto', () => {
  it('should validate with no errors for valid data', async () => {
    const dto = new AuthLoginDto();
    dto.username = 'example@email.com';
    dto.password = 'ZL4IW90N7Wsn3IC!';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if username is empty', async () => {
    const dto = new AuthLoginDto();
    dto.username = '';
    dto.password = 'ZL4IW90N7Wsn3IC!';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          property: 'username',
        }),
      ]),
    );
  });

  it('should fail validation if password is empty', async () => {
    const dto = new AuthLoginDto();
    dto.username = 'example@email.com';
    dto.password = '';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          property: 'password',
        }),
      ]),
    );
  });

});

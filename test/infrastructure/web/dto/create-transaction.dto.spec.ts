import { validate } from 'class-validator';
import { CreateTransactionRequestDto } from '@infrastructure/web/dto/create-transaction-request.dto';

describe('CreateTransactionDto', () => {
  let validDto: CreateTransactionRequestDto;

  beforeEach(() => {
    validDto = new CreateTransactionRequestDto();
    validDto.amount = 10.2;
    validDto.narration = 'Test transaction';
    validDto.recipientId = 'ccda952a-ad77-4a57-9c97-d4e28989a0e1';
    // recipientNarration is optional
  });

  it('should validate with no errors for valid data', async () => {
    const errors = await validate(validDto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if amount is not positive', async () => {
    validDto.amount = -10.2;
    const errors = await validate(validDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          property: 'amount',
        }),
      ]),
    );
  });

  it('should fail validation if amount has more than 2 decimal places', async () => {
    validDto.amount = 10.123;
    const errors = await validate(validDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          property: 'amount',
        }),
      ]),
    );
  });

  it('should fail validation if narration is empty', async () => {
    validDto.narration = '';
    const errors = await validate(validDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          property: 'narration',
        }),
      ]),
    );
  });

  it('should fail validation if recipientId is not a UUID', async () => {
    validDto.recipientId = 'not-a-uuid';
    const errors = await validate(validDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          property: 'recipientId',
        }),
      ]),
    );
  });

  it('should pass validation when recipientNarration is not provided (optional)', async () => {
    // recipientNarration is optional and not provided in this test
    const errors = await validate(validDto);
    expect(errors.length).toBe(0);
  });
});

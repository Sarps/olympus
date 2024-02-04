import { validate } from 'class-validator';
import { CreateTransactionDto } from '@infrastructure/web/dto/create-transaction.dto';

describe('CreateTransactionDto', () => {
  let validDto: CreateTransactionDto;

  beforeEach(() => {
    validDto = new CreateTransactionDto();
    validDto.idempotencyKey = 'a1d61baf-3299-4143-a523-069b8dc65671';
    validDto.amount = 10.20;
    validDto.narration = 'Test transaction';
    validDto.recipientId = 'ccda952a-ad77-4a57-9c97-d4e28989a0e1';
    // recipientNarration is optional
  });

  it('should validate with no errors for valid data', async () => {
    const errors = await validate(validDto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if idempotencyKey is not a UUID', async () => {
    validDto.idempotencyKey = 'not-a-uuid';
    const errors = await validate(validDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          property: 'idempotencyKey',
        }),
      ]),
    );
  });

  it('should fail validation if amount is not positive', async () => {
    validDto.amount = -10.20;
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

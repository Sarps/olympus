import { It, Mock } from 'moq.ts';
import { UserPersistencePort } from '@ports/out/persistence/user.persistence.port';
import { UserRegisteredEventPort } from '@ports/out/events/user-registered.event.port';
import { RegisterUseCase } from '@domain/application/auth/register.use-case';
import { ConflictException } from '@nestjs/common';
import { UserEntity } from '@domain/models/entities/user.entity';

const bcrypt = require('bcrypt');

describe('RegisterUseCase', () => {
  let userPersistence: Mock<UserPersistencePort>;
  let userRegisteredEvent: Mock<UserRegisteredEventPort>;
  let underTest: RegisterUseCase;

  const registration = {
    name: 'John Doe',
    username: 'johnDoe',
    email: 'john@example.com',
    password: 'securePassword',
  };

  beforeEach(() => {
    userPersistence = new Mock<UserPersistencePort>();
    userRegisteredEvent = new Mock<UserRegisteredEventPort>();
    underTest = new RegisterUseCase(
      userPersistence.object(),
      userRegisteredEvent.object(),
    );

    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
    userRegisteredEvent.setup((i) => i.fire(It.IsAny())).returnsAsync();
  });

  it('should successfully register a new user', async () => {
    userPersistence.setup((i) => i.save(It.IsAny())).returnsAsync('1');

    await underTest.register(registration);

    userPersistence.verify((i) =>
      i.save(
        It.Is(
          (user: UserEntity) =>
            user.username === registration.username &&
            user.email === registration.email,
        ),
      ),
    );
    userRegisteredEvent.verify((i) =>
      i.fire(
        It.Is(
          (user: UserEntity) =>
            user.id === '1' && user.name === registration.name,
        ),
      ),
    );
  });

  it('should throw a ConflictException if the username or email is already in use', async () => {
    userPersistence
      .setup((i) => i.save(It.IsAny()))
      .throwsAsync(new Error('Duplicate entry'));

    await expect(underTest.register(registration)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should hash the password before saving the user', async () => {
    userPersistence.setup((i) => i.save(It.IsAny())).returnsAsync('1');

    await underTest.register(registration);

    userPersistence.verify((i) =>
      i.save(
        It.Is((user: UserEntity) => user.passwordHash === 'hashedPassword'),
      ),
    );
  });

  it('should not include the password hash in the event data', async () => {
    userPersistence.setup((i) => i.save(It.IsAny())).returnsAsync('1');

    await underTest.register(registration);

    userRegisteredEvent.verify((i) =>
      i.fire(
        It.Is((user: UserEntity) => typeof user.passwordHash === 'undefined'),
      ),
    );
  });
});

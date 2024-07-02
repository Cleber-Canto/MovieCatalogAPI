import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should return the user data excluding the password', async () => {
      const user = { id: 1, username: 'testuser', password: 'hashedpassword' };
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as boolean);

      const result = await authService.validateUser('testuser', 'testpass');
      expect(result).toEqual({ id: 1, username: 'testuser' });
    });

    it('should return null if password does not match', async () => {
      const user = { id: 1, username: 'testuser', password: 'hashedpassword' };
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as boolean);

      const result = await authService.validateUser('testuser', 'wrongpass');
      expect(result).toBeNull();
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

      const result = await authService.validateUser('nonexistent', 'testpass');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token on successful login', async () => {
      const user = { id: 1, username: 'testuser' };
      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('test_token');

      const result = await authService.login({ username: 'testuser', password: 'testpass' });
      expect(result).toEqual({ access_token: 'test_token' });
    });

    it('should throw an error if validation fails', async () => {
      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

      await expect(authService.login({ username: 'testuser', password: 'testpass' }))
        .rejects
        .toThrow('Invalid credentials');
    });
  });

  describe('register', () => {
    it('should create a new user', async () => {
      const user = { id: 1, username: 'testuser', password: 'hashedpassword' };
      const result = { message: 'User created successfully', user: { id: 1, username: 'testuser' } };
      jest.spyOn(usersService, 'create').mockResolvedValue(user);

      expect(await authService.register({ username: 'testuser', password: 'testpass' })).toEqual(result);
    });

    it('should throw an error if user already exists', async () => {
      jest.spyOn(usersService, 'create').mockImplementation(() => {
        throw new Error('Username already exists');
      });

      await expect(authService.register({ username: 'existinguser', password: 'testpass' }))
        .rejects
        .toThrow('Username already exists');
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../auth/auth.controller';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
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

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should register a user successfully', async () => {
      const result = {
        message: 'User created successfully',
        user: { id: 1, username: 'testuser' },
      };
      jest.spyOn(authService, 'register').mockImplementation(async () => result);

      expect(await authController.register({ username: 'testuser', password: 'testpass' })).toBe(result);
    });
  });

  describe('login', () => {
    it('should return access token on successful login', async () => {
      const result = { access_token: 'test_token' };
      jest.spyOn(authService, 'login').mockImplementation(async () => result);

      expect(await authController.login({ username: 'testuser', password: 'testpass' })).toBe(result);
    });
  });
});

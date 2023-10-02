import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Public } from './decorators/is-public.decorator';

@ApiTags('Autenticação')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Autenticar o usuário e retornar o token JWT.
   * @returns Um token JWT se a autenticação for bem-sucedida.
   */
  @ApiOperation({ summary: 'Autenticar o usuário e retornar o token JWT' })
  @ApiResponse({
    status: 200,
    description: 'Usuário autenticado com sucesso e token JWT retornado',
  })
  @ApiResponse({
    status: 401,
    description: 'O email ou a senha fornecidos estão incorretos',
  })
  @ApiBody({
    description: 'Credenciais do usuário (email e senha)',
    examples: {
      email: {
        summary: 'Credenciais',
        description: 'Email e senha do usuário',
        value: {
          email: 'email@example.com',
          password: '123123',
        },
      },
    },
  })
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}

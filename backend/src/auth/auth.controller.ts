import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup-dto';
import { Public } from './decorators/is-public.decorator';
import { RememberDto } from './dto/remember.dto';

@ApiTags('Autenticação')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Criar um novo usuário.
   * @param signUpDto As informações do usuário a serem cadastradas.
   * @returns Uma mensagem indicando que o usuário foi criado com sucesso.
   */
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário criado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição inválida',
  })
  @ApiResponse({
    status: 409,
    description: 'Dados do usuário em conflito',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
  })
  @ApiBody({
    type: SignUpDto,
    description: 'Informações do usuário a serem cadastradas',
    examples: {
      user: {
        summary: 'Informações do usuário',
        description: 'Dados para criar um novo usuário',
        value: {
          name: 'Lara Ester',
          age: '22',
          email: 'lara@example.com',
          password: '123123',
        },
      },
    },
  })
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  signup(
    @Res({ passthrough: true }) res: Response,
    @Body() signUpDto: SignUpDto,
  ) {
    return this.authService.signUp(signUpDto, res);
  }

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
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
  })
  @ApiBody({
    description: 'Credenciais do usuário (email e senha)',
    examples: {
      email: {
        summary: 'Credenciais',
        description: 'Email e senha do usuário',
        value: {
          email: 'nata@example.com',
          password: 'admin123',
        },
      },
    },
  })
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
    @Body() remember: RememberDto,
  ) {
    return this.authService.login(req.user, res, remember.remember);
  }

  /**
   * Atualizar o token JWT existente para estender a sessão do usuário.
   * @param req Requisição HTTP recebida.
   * @param res Resposta HTTP a ser retornada com o novo token no cookie.
   * @returns Um novo token JWT é definido como um cookie na resposta.
   */
  @ApiOperation({
    summary: 'Atualizar token JWT para estender a sessão do usuário',
  })
  @ApiCookieAuth('token')
  @ApiResponse({
    status: 200,
    description:
      'Token JWT atualizado com sucesso e definido como um cookie na resposta',
  })
  @ApiResponse({
    status: 401,
    description: 'Falha ao atualizar o token JWT',
  })
  @Post('/auth/refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshToken(req.signedCookies.token, res);
  }

  /**
   * Desconectar o usuário e limpar o cookie do token.
   * @returns Uma mensagem indicando que o logout foi bem-sucedido.
   */
  @ApiOperation({ summary: 'Desconectar o usuário e limpar o cookie do token' })
  @ApiCookieAuth('token')
  @ApiResponse({
    status: 200,
    description: 'Usuário desconectado com sucesso e cookie do token limpo',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.signOut(res);
  }
}

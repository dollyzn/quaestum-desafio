import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Cria um novo usuário.
   * @param createUserDto Os dados do usuário a serem criados.
   * @returns O usuário criado.
   */
  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Dados do usuário para criar um novo usuário',
  })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Retorna todos os usuários cadastrados.
   * @returns Uma lista de todos os usuários.
   */
  @Get()
  @ApiOperation({ summary: 'Obter todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de todos os usuários' })
  readAll() {
    return this.usersService.readAll();
  }

  /**
   * Atualiza as informações de um usuário existente.
   * @param id O ID do usuário a ser atualizado.
   * @param updateUserDto Os dados do usuário a serem atualizados.
   * @returns O usuário atualizado.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um usuário existente' })
  @ApiParam({ name: 'id', description: 'ID do usuário a ser atualizado' })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Dados do usuário para atualizar um usuário existente',
  })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Exclui um usuário existente.
   * @param id O ID do usuário a ser excluído.
   * @returns O usuário excluído.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um usuário existente' })
  @ApiParam({ name: 'id', description: 'ID do usuário a ser excluído' })
  @ApiResponse({ status: 200, description: 'Usuário excluído com sucesso' })
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}

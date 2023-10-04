import { IsBoolean, IsOptional } from 'class-validator';

export class RememberDto {
  @IsBoolean()
  @IsOptional()
  remember: boolean;
}

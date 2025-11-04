import { ApiPropertyOptional } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';
import { IsIn, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreateCartDto {
  @ApiPropertyOptional({ description: 'Identificador del usuario propietario del carrito', format: 'uuid' })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({ enum: ['EUR', 'USD'], default: 'EUR' })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsIn(['EUR', 'USD'])
  currency?: 'EUR' | 'USD';
}

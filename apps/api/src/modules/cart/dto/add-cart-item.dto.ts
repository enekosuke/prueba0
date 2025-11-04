import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsPositive, IsUUID, Min } from 'class-validator';

@InputType()
export class AddCartItemDto {
  @ApiProperty({ format: 'uuid' })
  @Field(() => String)
  @IsUUID()
  variantId!: string;

  @ApiProperty({ minimum: 1, default: 1 })
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  quantity = 1;
}

@InputType()
export class UpdateCartItemDto {
  @ApiProperty({ minimum: 0, default: 1 })
  @Field(() => Int)
  @IsInt()
  @Min(0)
  quantity!: number;
}

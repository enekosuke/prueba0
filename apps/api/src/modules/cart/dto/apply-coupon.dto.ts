import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class ApplyCouponDto {
  @ApiProperty({ example: 'SPRING21' })
  @Field(() => String)
  @IsString()
  @Length(3, 32)
  code!: string;
}

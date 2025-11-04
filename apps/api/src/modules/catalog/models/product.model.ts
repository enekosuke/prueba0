import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductVariantModel {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  sku!: string;

  @Field(() => Int)
  stock!: number;

  @Field(() => Float, { nullable: true })
  price?: number;
}

@ObjectType()
export class ProductModel {
  @Field(() => ID)
  id!: string;

  @Field()
  slug!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => [String])
  images!: string[];

  @Field(() => [ProductVariantModel])
  variants!: ProductVariantModel[];

  @Field(() => Float, { nullable: true })
  rating?: number;
}

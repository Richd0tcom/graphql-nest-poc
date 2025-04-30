import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";

@InputType()
export class CreateAuthInput {
  @Field()
  @IsEmail()
  username: string;

  @Field()
  @MinLength(7)
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  username: string;

  @Field()
  @MinLength(7)
  password: string;
}



import { InputType, Field } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateAuthInput {
  @Field()
  username: string;

  @Field()
  @MinLength(2)
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  @MinLength(2)
  password: string;
}



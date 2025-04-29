import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDepartmentInput {
  @Field()
  name: string

  sub_departments: [];
}

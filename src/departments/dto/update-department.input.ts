import { IsNotEmpty, MinLength } from 'class-validator';
import { CreateDepartmentInput } from './create-department.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @Field()
  @IsNotEmpty({ message: 'Department id is required' })
  id: string;


  @Field()
  @IsNotEmpty({ message: 'Department name is required' })
  @MinLength(2, { message: 'Department name must be at least 2 characters long' })
  name: string;
}

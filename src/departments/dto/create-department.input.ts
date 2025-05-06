import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength, ValidateIf, ValidateNested } from 'class-validator';



@InputType()
export class SubDepartmentInput {
  @Field()
  @IsNotEmpty({ message: 'Sub-department name is required' })
  @MinLength(2, { message: 'Sub-department name must be at least 2 characters long' })
  name: string;
}

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsNotEmpty({ message: 'Department name is required' })
  @MinLength(2, { message: 'Department name must be at least 2 characters long' })
  name: string

  @Field(() => [SubDepartmentInput], { nullable: true })
  @ValidateIf((obj) => obj.sub_departments !== null && obj.sub_departments !== undefined)
  @ValidateNested({ each: true })
  // @Type(() => SubDepartmentInput)
  sub_departments?: SubDepartmentInput[] | null;
}


@InputType()
export class UpdateDepartmentInput {
  @Field()
  id: number;

  @Field()
  @IsNotEmpty({ message: 'Department name is required' })
  @MinLength(2, { message: 'Department name must be at least 2 characters long' })
  name: string;
}
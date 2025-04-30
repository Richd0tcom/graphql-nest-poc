import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';

@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Department)
  createDepartment(@Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput) {
    return this.departmentsService.create(createDepartmentInput);
  }



  // @Query(() => [Department])
  // @UseGuards(JwtAuthGuard)
  // async getDepartments(): Promise<Department[]> {
  //   return this.departmentService.findAll();
  // }

  @Query(() => Department)
  @UseGuards(JwtAuthGuard)
  async getDepartment(@Args('id', { type: () => String }) id: string): Promise<Department | null> {
    return this.departmentsService.getDepartment(id);
  }


  @Mutation(() => Department)
  @UseGuards(JwtAuthGuard)
  async updateDepartment(
    @Args('UpdateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput,
  ): Promise<Department> {
    return this.departmentsService.updateDepartment(updateDepartmentInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteDepartment(
    @Args('id', { type: () => Int }) id: string,
  ): Promise<boolean> {
    return this.departmentsService.deleteDepartment(id);
  }
}

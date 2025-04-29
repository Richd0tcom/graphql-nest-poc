import { Injectable } from '@nestjs/common';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {

  constructor(@InjectRepository(Department) private departmentRepo: Repository<Department> ) {}
  async create(createDepartmentInput: CreateDepartmentInput) {
    const { name, sub_departments } = createDepartmentInput
    let dept = this.departmentRepo.create({
      name,
    })

    dept = await this.departmentRepo.save(dept)

    if (sub_departments.length > 0 ) {
      const sub_depts = sub_departments.map((dep: any)=> {
        return {
          name: dep.name,
          parent_id: dept.id
        }
      })
  
      await this.departmentRepo.insert(sub_depts)
    }

    return dept
  }

  async getDepartment(id: string) {
    const dept = await this.departmentRepo.findOne({
      where: {
        id
      },
      relations: ["sub_departments"]
    })

    return dept
  }

  async updateDepartment(dto: UpdateDepartmentInput) {

    const { id,  name } = dto
    const dept  = await this.departmentRepo.update(id, {
      name
    })

    return dept
  }

  async deleteDepartment(id: string) {
    
  }

}

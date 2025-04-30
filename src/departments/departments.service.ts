import { Injectable, NotFoundException } from '@nestjs/common';
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

    if (sub_departments && sub_departments.length > 0 ) {
      const sub_depts = sub_departments.map((dep: {name: string})=> {
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

  async getDepartments() {
    const dept = await this.departmentRepo.find({

      relations: ["sub_departments"]
    })

    return dept
  }

  async updateDepartment(dto: UpdateDepartmentInput) {

    const { id,  name } = dto
    const dept = await this.departmentRepo.findOne({
      where: {
        id
      }
    })

    if (!dept) {
      throw new NotFoundException("department not found")
    }
    const result  = await this.departmentRepo.update(id, {
      name
    })

    return result.raw as Department
  }

  async deleteDepartment(id: string) {
    //this assumes only a single layer of nesting
    const d = await this.getDepartment(id)
    if (!d) {
      throw new NotFoundException("department not found")
    }

    const sub_departments = await this.departmentRepo.find({
      where: {
        parent_id: id
      }
    })
    await this.departmentRepo.remove(sub_departments)
    await this.departmentRepo.remove(d)

    return true
  }

}

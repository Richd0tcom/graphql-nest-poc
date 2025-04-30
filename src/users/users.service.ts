import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}


  async create(username: string, password: string) {


    let user = this.userRepo.create({
      username,
      password
    })

    user = await this.userRepo.save(user)

    return user
  }

  async findById(id: string) {
    return this.userRepo.findOne({
      where: {
        id
      }
    })
  }

  async findByUsername(username: string) {
    return this.userRepo.findOne({
      where: {
        username
      }
    })
  }


}

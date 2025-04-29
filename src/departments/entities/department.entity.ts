import { ObjectType, Field,  ID } from '@nestjs/graphql';
import { CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class Department {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;


  name: string;


  parent_id: string;


  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;

  @ManyToOne(() => Department, department => department.sub_departments)
  parent: Department;
  
  @OneToMany(() => Department, department => department.parent)
  sub_departments: Department[];
}

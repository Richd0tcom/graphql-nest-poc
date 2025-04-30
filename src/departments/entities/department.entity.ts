import { ObjectType, Field,  ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('departments')
export class Department {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Field()
  @Column()
  name: string;


  @Field({ nullable: true })
  @Column({ nullable: true })
  parent_id: string;


  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;


  @ManyToOne(() => Department, { nullable: true, lazy: true })
  @JoinColumn({ name: 'parent_id' })
  parent?: Promise<Department>;


  @Field(() => [Department], { nullable: true })
  @OneToMany(() => Department, department => department.parent, { lazy: true })
  sub_departments?: Promise<Department[]>;
}

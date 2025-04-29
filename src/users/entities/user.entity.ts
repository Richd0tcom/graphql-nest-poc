// import { ObjectType, Field, ID } from "@nestjs/graphql";

import { Field, ID } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";
import { PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn } from "typeorm";

// @ObjectType()
// export class User {
//   @Field(() => ID)
//   id: string;

//   @Field()
//   user: string;

//   //password is deliberately excluded from GraphQL response

//   @Field({ nullable: true })
//   biometricKey?: string;

//   @Field()
//   createdAt: Date;

//   @Field()
//   updatedAt: Date;
// }

export class User {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @IsEmail()
  @Index()
  @MinLength(2)
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}

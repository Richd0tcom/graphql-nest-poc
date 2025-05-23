import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";
import { PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

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

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', nullable: false, unique: true })
  @Index()
  @MinLength(2)
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}

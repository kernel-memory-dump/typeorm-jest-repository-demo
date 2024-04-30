import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    BaseEntity,
    JoinColumn,
    ManyToMany,
  } from "typeorm";

  
  @Entity()
  export default class Role extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

  }
  
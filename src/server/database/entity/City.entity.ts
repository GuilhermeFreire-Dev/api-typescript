import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "cidades"})
export class City {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt!: Date;
}
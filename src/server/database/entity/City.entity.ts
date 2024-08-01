import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "cidades"})
export class City {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @CreateDateColumn()
  data_cria?: Date;

  @CreateDateColumn()
  data_alt?: Date;
}
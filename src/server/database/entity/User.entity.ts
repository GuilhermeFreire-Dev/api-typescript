import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "usuarios"})
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({unique: true})
  email!: string;

  @Column()
  senha!: string;

  @CreateDateColumn()
  data_cria?: Date;

  @CreateDateColumn()
  data_alt?: Date;
}
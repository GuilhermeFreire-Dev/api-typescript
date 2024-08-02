import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @UpdateDateColumn()
  data_alt?: Date;
}
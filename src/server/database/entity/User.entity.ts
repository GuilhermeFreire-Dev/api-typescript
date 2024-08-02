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

  @Column({nullable: true})
  token?:string;

  @Column({nullable: true})
  data_exp?: Date;

  @CreateDateColumn()
  data_cria?: Date;

  @UpdateDateColumn()
  data_alt?: Date;
}
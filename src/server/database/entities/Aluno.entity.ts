import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Pessoa } from "./Pessoa.entity";

@Entity()
export class Aluno {

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Pessoa)
  @JoinColumn()
  pessoa!: Pessoa;

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;
}
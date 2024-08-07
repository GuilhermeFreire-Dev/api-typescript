import { CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Disciplina } from "./Disciplina.entity";

@Entity()
export class Professor {

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Professor)
  @JoinColumn()
  pessoa!: Professor;

  @OneToMany(() => Disciplina, (disciplina) => disciplina.professor)
  disciplinas?: Disciplina[];

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;
}
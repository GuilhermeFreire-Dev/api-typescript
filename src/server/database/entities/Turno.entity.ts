import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Turma } from "./Turma.entity";

@Entity()
export class Turno {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  turno!: string;

  @OneToMany(() => Turma, (turma) => turma.turno)
  turmas?: Turma[];

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;
}
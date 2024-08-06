import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Turno } from "./Turno.entity";
import { Nivel } from "./Nivel.entity";

@Entity()
export class Turma {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Nivel, (nivel) => nivel.turmas)
  nivel?: Nivel;

  @ManyToOne(() => Turno, (turno) => turno.turmas)
  turno?: Turno;

  @Column({ unique: true })
  codigo!: string;

  @Column()
  ano!: number;

  @Column()
  anoLetivo!: number;

  @Column({ default: 1 })
  freqMin!: number;

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;
}
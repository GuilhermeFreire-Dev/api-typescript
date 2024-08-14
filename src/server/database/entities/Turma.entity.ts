import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Disciplina } from "./Disciplina.entity";
import { Nota } from "./Nota.entity";
import { Frequencia } from "./Frequencia.entity";

export enum ETurno {
  MATUTINO = "matutino",
  VESPERTINO = "vespertino",
  NOTURNO = "noturno",
}

export enum ENivel {
  FUNDAMENTAL = "fundamental",
  MEDIO = "medio",
}

export enum ETurmaStatus {
  ATIVA = "ativa",
  INATIVA = "inativa",
}

@Entity()
export class Turma {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: ENivel })
  nivel!: ENivel;

  @Column({ type: "enum", enum: ETurno })
  turno!: ETurno;

  @ManyToMany(() => Disciplina)
  @JoinTable()
  disciplinas!: Disciplina[];

  @OneToMany(() => Nota, (nota) => nota.turma)
  notas?: Nota[];

  @OneToMany(() => Frequencia, (frequencia) => frequencia.turma)
  frequencias?: Frequencia[];

  @Column({ unique: true })
  codigo!: string;

  @Column()
  ano!: number;

  @Column()
  anoLetivo!: number;

  @Column({ default: 1 })
  freqMin!: number;

  @Column({ type: "enum", enum: ETurmaStatus, default: ETurmaStatus.ATIVA })
  status!: ETurmaStatus;

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;
}

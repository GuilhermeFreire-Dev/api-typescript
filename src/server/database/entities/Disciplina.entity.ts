import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Professor } from "./Professor.entity";
import { Nota } from "./Nota.entity";

export enum EDisciplinaStatus {
  ATIVA = "ativa",
  INATIVA = "inativa",
}

@Entity()
export class Disciplina {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Professor, (professor) => professor.disciplinas)
  professor!: Professor;

  @OneToMany(() => Nota, (nota) => nota.disciplina)
  notas?: Nota[];

  @Column({ unique: true })
  codigo!: string;

  @Column({
    type: "enum",
    enum: EDisciplinaStatus,
    default: EDisciplinaStatus.ATIVA,
  })
  status!: EDisciplinaStatus;

  @Column()
  nome!: string;

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;
}

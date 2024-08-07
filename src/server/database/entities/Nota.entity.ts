import { 
  Column,
  CreateDateColumn, 
  Entity, 
  ManyToOne, 
  PrimaryGeneratedColumn, 
  Unique, 
  UpdateDateColumn 
} from "typeorm";
import { Aluno } from "./Aluno.entity";
import { Turma } from "./Turma.entity";
import { Disciplina } from "./Disciplina.entity";

@Entity()
@Unique(["aluno", "turma", "disciplina"])
export class Nota {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.notas)
  aluno!: Aluno;

  @ManyToOne(() => Turma, (turma) => turma.notas)
  turma!: Turma;

  @ManyToOne(() => Disciplina, (disciplina) => disciplina.notas)
  disciplina!: Disciplina;

  @Column("decimal", { precision: 1, default: 0, unsigned: true })
  n1!: number;

  @Column("decimal", { precision: 1, default: 0, unsigned: true })
  n2!: number;

  @Column("decimal", { precision: 1, default: 0, unsigned: true })
  n3!: number;

  @Column("decimal", { precision: 1, default: 0, unsigned: true })
  n4!: number;

  @Column("decimal", { precision: 1, unsigned: true })
  media?: number;

  @Column()
  situacao?: string;

  @Column()
  observacao?: string;

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;

}
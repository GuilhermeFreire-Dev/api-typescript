import { 
  CreateDateColumn, 
  Entity, 
  ManyToOne, 
  PrimaryGeneratedColumn 
} from "typeorm";
import { Aluno } from "./Aluno.entity";
import { Turma } from "./Turma.entity";

@Entity()
export class Frequencia {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.frequencias)
  aluno!: Aluno;

  @ManyToOne(() => Turma, (turma) => turma.frequencias)
  turma!: Turma;

  @CreateDateColumn()
  data_freq!: Date;
}
import { 
  Entity, 
  OneToMany, 
} from "typeorm";
import { Disciplina } from "./Disciplina.entity";
import { Pessoa } from "./Pessoa.entity";

@Entity()
export class Professor extends Pessoa {

  @OneToMany(() => Disciplina, (disciplina) => disciplina.professor)
  disciplinas?: Disciplina[];

}
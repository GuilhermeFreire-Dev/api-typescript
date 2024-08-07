import { Entity, OneToMany } from "typeorm";
import { Pessoa } from "./Pessoa.entity";
import { Nota } from "./Nota.entity";
import { Frequencia } from "./Frequencia.entity";

@Entity()
export class Aluno extends Pessoa { 

  @OneToMany(() => Nota, (nota) => nota.aluno)
  notas?: Nota[];

  @OneToMany(() => Frequencia, (frequencia) => frequencia.aluno)
  frequencias?: Frequencia[];

}
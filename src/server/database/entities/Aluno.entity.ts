import { Entity } from "typeorm";
import { Pessoa } from "./Pessoa.entity";

@Entity()
export class Aluno extends Pessoa { }
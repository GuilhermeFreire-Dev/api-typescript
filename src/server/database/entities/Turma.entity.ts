import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinTable, 
  ManyToMany, 
  ManyToOne, 
  OneToMany, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from "typeorm";
import { Turno } from "./Turno.entity";
import { Nivel } from "./Nivel.entity";
import { Disciplina } from "./Disciplina.entity";
import { Nota } from "./Nota.entity";
import { Frequencia } from "./Frequencia.entity";

@Entity()
export class Turma {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Nivel, (nivel) => nivel.turmas)
  nivel?: Nivel;

  @ManyToOne(() => Turno, (turno) => turno.turmas)
  turno?: Turno;

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

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;
}
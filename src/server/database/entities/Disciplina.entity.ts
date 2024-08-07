import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  ManyToOne, 
  OneToMany, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from "typeorm";
import { Professor } from "./Professor.entity";
import { Nota } from "./Nota.entity";

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

  @Column()
  nome!: string;

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;
}
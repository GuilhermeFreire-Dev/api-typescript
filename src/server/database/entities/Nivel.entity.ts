import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  OneToMany, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from "typeorm";
import { Turma } from "./Turma.entity";

@Entity()
export class Nivel {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nivel!: string;

  @OneToMany(() => Turma, (turma) => turma.nivel)
  turmas?: Turma[];

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;
}
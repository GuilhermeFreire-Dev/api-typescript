import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  OneToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from "typeorm";
import { Pessoa } from "./Pessoa.entity";

@Entity()
export class Usuario {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  senha!: string;

  @OneToOne(() => Pessoa)
  @JoinColumn()
  pessoa!: Pessoa;

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;
}
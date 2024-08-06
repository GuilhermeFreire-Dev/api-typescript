import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  OneToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from "typeorm";
import { Endereco } from "./Endereco.entity";

@Entity()
export class Pessoa {

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Endereco)
  @JoinColumn()
  endereco?: Endereco;

  @Column()
  nome!: string;

  @Column()
  dataNasc!: Date;

  @Column({ unique: true })
  cpf!: string;

  @Column()
  email!: string;

  @Column()
  telefonePrincipal!: number;

  @Column()
  telefoneSecundario?: number;

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;
}
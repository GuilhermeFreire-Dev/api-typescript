import { 
  Column, 
  CreateDateColumn, 
  JoinColumn, 
  OneToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from "typeorm";
import { Endereco } from "./Endereco.entity";
import { Usuario } from "./Usuario.entity";

export class Pessoa {

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Endereco)
  @JoinColumn()
  endereco?: Endereco;

  @OneToOne(() => Usuario)
  @JoinColumn()
  usuario?: Usuario;

  @Column()
  nome!: string;

  @Column()
  dataNasc!: Date;

  @Column({ unique: true })
  cpf!: string;

  @Column()
  email!: string;

  @Column()
  telefonePrincipal!: string;

  @Column({ nullable: true })
  telefoneSecundario?: string;

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;
}
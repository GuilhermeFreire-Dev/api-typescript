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

export enum EStatus {
  ATIVO = "ativo",
  INATIVO = "inativo",
  SUSPENSO = "suspenso",
}

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

  @Column({ type: "enum", enum: EStatus, default: EStatus.ATIVO})
  status?: EStatus;

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;
}
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
import { Usuario } from "./Usuario.entity";

@Entity()
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
  telefonePrincipal!: number;

  @Column()
  telefoneSecundario?: number;

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;
}
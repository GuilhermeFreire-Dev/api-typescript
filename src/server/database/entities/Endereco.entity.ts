import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from "typeorm";

@Entity()
export class Endereco {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cep!: string;

  @Column()
  logradouro!: string;

  @Column()
  complemento!: string;

  @Column()
  numero!: number;

  @Column()
  bairro!: string;

  @Column()
  cidade!: string;

  @Column()
  estado!: string;

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;
}
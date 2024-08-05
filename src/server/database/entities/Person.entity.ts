import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./Address.entity";

@Entity({ name: "pessoa" })
export class Person {

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Address)
  @JoinColumn({ name: "id_endereco" })
  endereco?: Address;

  @Column()
  id_usuario?: number;

  @Column()
  nome!: string;

  @Column()
  data_nasc!: Date;

  @Column()
  cpf!: string;

  @Column()
  email!: string;

  @Column()
  telefone_principal!: number;

  @Column()
  telefone_secundario?: number;

  @CreateDateColumn()
  data_cria?: Date;

  @UpdateDateColumn()
  data_alt?: Date;
}
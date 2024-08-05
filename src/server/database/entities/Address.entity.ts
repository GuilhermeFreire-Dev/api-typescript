import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "endereco" })
export class Address {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cep!: number;

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
  data_cria?: Date;

  @UpdateDateColumn()
  data_alt?: Date;
}
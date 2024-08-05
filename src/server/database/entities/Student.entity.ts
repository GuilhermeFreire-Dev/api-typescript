import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Person } from "./Person.entity";

@Entity({ name: "aluno" })
export class Student {

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Person)
  @JoinColumn({ name: "id_pessoa" })
  pessoa!: Person;

  @CreateDateColumn()
  data_cria?: Date;

  @UpdateDateColumn()
  data_alt?: Date;
}
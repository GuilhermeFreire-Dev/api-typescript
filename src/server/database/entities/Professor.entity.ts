import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Professor {

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Professor)
  @JoinColumn()
  pessoa!: Professor;

  @CreateDateColumn()
  dataCria?: Date;

  @UpdateDateColumn()
  dataAlt?: Date;
}
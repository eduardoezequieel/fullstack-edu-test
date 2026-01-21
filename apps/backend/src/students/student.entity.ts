import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum StudentStatus {
  ACTIVE = 'active',
  GRADUATED = 'graduated',
}

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'start_year' })
  startYear: number;

  @Column({ unique: true })
  nue: string;

  @Column({
    type: 'text',
    default: StudentStatus.ACTIVE,
  })
  status: StudentStatus;

  @Column({ type: 'float', nullable: true, name: 'graduation_average' })
  graduationAverage: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

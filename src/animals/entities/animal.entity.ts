import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Location } from '../../locations/entities/location.entity';
import { User } from '../../users/entities/user.entity';

@Entity('animals')
export class Animal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  especie: string;

  @Column('int')
  edad: number;

  @Column({ length: 500 })
  descripcion: string;

  @Column({ default: 'disponible' })
  estado: string;

  @Column({ nullable: true })
  imagen: string;

  @Column()
  contacto: string;

  @ManyToOne(() => Location, (loc) => loc.animals, { eager: true, nullable: true })
  @JoinColumn({ name: 'locationId' })
  location: Location;

  @ManyToOne(() => User, (user) => user.registeredAnimals, { nullable: true })
  @JoinColumn({ name: 'registeredById' })
  registeredBy: User;

  @ManyToMany(() => User, (user) => user.favorites)
  interestedUsers: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { Anime } from './Anime';
import { Season } from './Season';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: string;

  @Index({ unique: true })
  @OneToOne(() => Anime)
  @JoinColumn()
  anime: Anime;

  @ManyToOne(() => Season, (season) => season.reviews)
  @JoinColumn()
  season: Season;

  @Column('decimal')
  score: number;

  @Column()
  members: number;

  @Column()
  rank: number;

  @Column()
  popularity: number;

  @Column()
  favorites: number;

  @Column()
  scored_by: number;
}

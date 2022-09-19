import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { Anime } from './Anime';
import { Season } from './Season';

@Entity()
export class Review {
  @PrimaryColumn()
  animeId: string;

  @PrimaryColumn()
  seasonYear: number;

  @PrimaryColumn()
  seasonSeason: string;

  @OneToOne(() => Anime)
  @JoinColumn()
  anime: Anime;

  @ManyToOne(() => Season, (season) => season.reviews)
  @JoinColumn()
  season: Season;

  @Column('decimal')
  score: number;

  @Column()
  rank: number;

  @Column()
  popularity: number;

  @Column()
  favorites: number;

  @Column()
  scored_by: number;
}

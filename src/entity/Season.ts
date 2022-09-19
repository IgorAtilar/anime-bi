import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Review } from './Review';

@Entity()
export class Season {
  @PrimaryColumn()
  year: number;

  @PrimaryColumn()
  season: string;

  @OneToMany(() => Review, (review) => review.season)
  reviews: Review[];
}

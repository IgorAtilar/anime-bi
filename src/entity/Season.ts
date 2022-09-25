import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Review } from './Review';

@Entity()
export class Season {
  @PrimaryColumn()
  year: number;

  @PrimaryColumn()
  name: string;

  @OneToMany(() => Review, (review) => review.season)
  reviews: Review[];
}

import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';
import { Anime } from './Anime';

@Entity()
export class Genre {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Anime, (anime) => anime.genres)
  animes: Anime[];
}

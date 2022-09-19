import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';
import { Anime } from './Anime';

@Entity()
export class Theme {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Anime, (anime) => anime.themes)
  animes: Anime[];
}

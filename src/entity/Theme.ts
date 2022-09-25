import { Entity, Column, PrimaryColumn, ManyToMany, Index } from 'typeorm';
import { Anime } from './Anime';

@Entity()
export class Theme {
  @PrimaryColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  name: string;

  @ManyToMany(() => Anime, (anime) => anime.themes)
  animes: Anime[];
}

import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { Genre } from './Genre';
import { Theme } from './Theme';

@Entity()
export class Anime {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  source: string;

  @Column()
  episodes: number;

  @Column()
  duration: string;

  @Column()
  rating: string;

  @ManyToMany(() => Genre, (genre) => genre.animes)
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => Theme, (theme) => theme.animes)
  @JoinTable()
  themes: Theme[];
}

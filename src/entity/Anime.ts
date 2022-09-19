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

  @Column({ nullable: true })
  episodes: number;

  @Column()
  duration: string;

  @Column()
  status: string;

  @Column({
    nullable: true,
  })
  rating: string;

  @ManyToMany(() => Genre, (genre) => genre.animes)
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => Theme, (theme) => theme.animes)
  @JoinTable()
  themes: Theme[];
}

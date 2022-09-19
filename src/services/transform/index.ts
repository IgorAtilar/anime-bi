import { ETLDataSource } from '../../config/data-source';
import { Anime, Genre, Theme, Season, Review } from '../../entity';
import { RawGenre, RawTheme, RawAnime } from '../extract';

export function tranformAnimeGenres(rawGenres: RawGenre[]) {
  const genres: Genre[] = [];

  rawGenres.forEach(({ mal_id, name }) => {
    const genre = ETLDataSource.manager.create(Genre, {
      id: mal_id,
      name,
    });

    genres.push(genre);
  });

  return genres;
}

export function transformAnimeThemes(rawThemes: RawTheme[]) {
  const themes: Theme[] = [];

  rawThemes.forEach(({ mal_id, name }) => {
    const theme = ETLDataSource.manager.create(Theme, {
      id: mal_id,
      name,
    });

    themes.push(theme);
  });

  return themes;
}

export function transformAnime({
  genres,
  rawAnime,
  themes,
}: {
  rawAnime: RawAnime;
  themes: Theme[];
  genres: Genre[];
}) {
  const { mal_id, source, duration, episodes, status, rating, title } =
    rawAnime;

  const anime = ETLDataSource.manager.create(Anime, {
    id: mal_id,
    source,
    duration,
    episodes,
    status,
    rating,
    genres,
    themes,
    title,
  });

  return anime;
}

export function transformAnimeSeason(rawAnime: RawAnime) {
  const { year, season: rawAnimeSeason } = rawAnime;
  const season = ETLDataSource.manager.create(Season, {
    year,
    season: rawAnimeSeason,
  });

  return season;
}

export function transformAnimeReview({
  anime,
  rawAnime,
  season,
}: {
  rawAnime: RawAnime;
  anime: Anime;
  season: Season;
}) {
  const { score, rank, popularity, favorites, scored_by } = rawAnime;

  const review = ETLDataSource.manager.create(Review, {
    anime,
    season,
    score: score || 0,
    rank: rank || 0,
    popularity: popularity || 0,
    favorites: favorites || 0,
    scored_by: scored_by || 0,
  });

  return review;
}

import { ETLDataSource } from '../../config/data-source';
import { extractAnimesData } from '../extract';
import {
  tranformAnimeGenres,
  transformAnime,
  transformAnimeReview,
  transformAnimeSeason,
  transformAnimeThemes,
} from '../transform';

export async function loadData() {
  const response = await extractAnimesData();

  for await (const rawAnime of response) {
    const rawGenres = rawAnime.genres;

    const genres = tranformAnimeGenres(rawGenres);

    for await (const genre of genres) {
      await ETLDataSource.manager.save(genre);
    }

    const rawThemes = rawAnime.themes;

    const themes = transformAnimeThemes(rawThemes);

    for await (const theme of themes) {
      await ETLDataSource.manager.save(theme);
    }

    const anime = transformAnime({ rawAnime, themes, genres });

    await ETLDataSource.manager.save(anime);

    const season = transformAnimeSeason(rawAnime);

    await ETLDataSource.manager.save(season);

    const review = transformAnimeReview({
      anime,
      rawAnime,
      season,
    });

    await ETLDataSource.manager.save(review);

    console.log(`ʕ•́ᴥ•̀ʔっ ${rawAnime.title} carregado no DM!`);
  }
}

import { api } from '../../config/api';

export type RawGenre = {
  mal_id: number;
  name: string;
};

export type RawTheme = {
  mal_id: number;
  name: string;
};

export type RawAnime = {
  mal_id: number;
  title: string;
  type: string;
  source: string;
  episodes: number;
  status: string;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  season: string;
  year: number;
  genres: RawGenre[];
  themes: RawTheme[];
};

type SeasonResponse = {
  data: RawAnime[];
};

async function fetchAnimesDataBySeason(year: number, season: string) {
  try {
    const {
      data: { data },
    } = await api.get<SeasonResponse>(`/seasons/${year}/${season}`);

    return data;
  } catch (error) {
    console.error(error);
  }
}

const seasons = ['summer', 'spring', 'fall', 'winter'];

const years = [...new Array(12)].map((_, idx) => {
  return 2010 + idx;
});

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function extractAnimesData() {
  const response: RawAnime[] = [];

  for (const year of years) {
    for await (const season of seasons) {
      const animes = await fetchAnimesDataBySeason(year, season);
      response.push(...animes);
      console.log(`(─‿‿─) animes da temporada ${year} - ${season} baixados!`);
      await delay(400);
    }
  }
  console.log(`Dados extraídos!`);
  return response;
}

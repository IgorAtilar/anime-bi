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
  pagination: {
    has_next_page: boolean;
    current_page: number;
  };
};

async function fetchAnimesDataBySeason(year: number, season: string) {
  const rawAnimes = [];
  try {
    let hasNextPage = true;
    let page = 1;

    while (hasNextPage) {
      const {
        data: {
          data,
          pagination: { has_next_page },
        },
      } = await api.get<SeasonResponse>(`/seasons/${year}/${season}`, {
        params: {
          page,
        },
      });

      rawAnimes.push(...data);

      hasNextPage = !!has_next_page;
      page++;

      await delay(400);
    }

    return rawAnimes;
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
    }
  }
  console.log(`Dados extraídos!`);
  return response;
}

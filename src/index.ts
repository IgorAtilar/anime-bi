import { ETLDataSource } from './config/data-source';
import { loadData } from './services/load';

ETLDataSource.initialize()
  .then(async () => {
    await loadData();
  })
  .catch((error) => console.log(error));

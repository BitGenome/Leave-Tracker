import { app } from 'electron';
import path from 'path';

const productionDbName = path.join(
  app.getPath('userData'),
  'assets/database/eLeave_prod.db',
);
const developmentDbName = 'assets/database/eLeave_dev.db';

export const isProduction = process.env.NODE_ENV === 'production';

export const DATABASE_PATH = isProduction
  ? productionDbName
  : developmentDbName;

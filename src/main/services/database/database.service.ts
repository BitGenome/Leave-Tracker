import { AccessDeniedError, Sequelize } from 'sequelize';
import log from 'electron-log';
import { DATABASE_PATH } from '../../utils/database';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DATABASE_PATH,
});

/**
 *
 * @returns return a boolean - true for success database connection otherwise false
 * @see [sequelize] - https://sequelize.org/docs/v6/getting-started/#testing-the-connection
 */
async function initDbService(): Promise<boolean> {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    log.info('Connection has been established successfully.');
    return true;
  } catch (error) {
    if (error instanceof AccessDeniedError) {
      throw new Error('Insufficient database prevelage');
    }
    log.error('Unable to connect to the database:', error);
    return false;
  }
}

export { initDbService, sequelize };

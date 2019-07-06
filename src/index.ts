import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as swaggerUI from 'swagger-ui-express';

import { RegisterRoutes } from './router/routes';
import logger from './utils/winston-logger';
import './controller/helloWorldController';

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  express: express.Express;

  // Run configuration methods on the Express instance.
  constructor() {
      // test
    this.express = express();

    this.middleware();
    this.routes();
    this.startSwagger();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.disable('x-powered-by');
  }

  // Configure API endpoints.
  private routes(): void {
    // use generated routes by tsoa for swagger-ui
    RegisterRoutes(this.express);
  }

  /**
   * start swagger-ui express server and setup the documentation to be served
   */
  private startSwagger(): void {
    try {
      const swaggerDoc = require('../swagger.json');
      this.express.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
    } catch (error) {
      logger.error(error);
    }
  }

}

export default new App().express;

import express, { Router } from 'express';
import connectToDatabase from './connection';
import errorMiddleware from './middlewares/errorHandler';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }
  
  private errorHandler(): void {
    this.app.use(errorMiddleware);
  }

  public startServer(PORT: string | number = 3001): void {
    try {
      connectToDatabase();
      this.app.listen(
        PORT,
        () => console.log(`Server running here 👉 http://localhost:${PORT}`),
      );
    } catch (err) {
      console.error(err);
      this.errorHandler();
    }
  }

  public addRouter(router: Router) {
    this.app.use(router);
  }

  public getApp() {
    return this.app;
  }
}

export default App;

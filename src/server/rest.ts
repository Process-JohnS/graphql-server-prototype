
import { Express, Request, Response, NextFunction } from 'express';
import registerOrderWebhooks from '../webhooks/order-webhooks';


const LoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`);
  next();
}


export default (app: Express) => {

  if (false) app.use(LoggerMiddleware);

  registerOrderWebhooks(app);

}


import { Express, Request, Response, Router } from 'express';


const webhookRouter = Router();

webhookRouter.get('/create-order', (req: Request, res: Response) => {
  res.json({
    action: 'create_order',
    status: 'ok'
  });
});

webhookRouter.get('/update-order', (req: Request, res: Response) => {
  res.json({
    action: 'update_order',
    status: 'ok'
  });
});


export default (app: Express) => {
  app.use('/webhooks', webhookRouter);
}

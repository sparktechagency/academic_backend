import { Router } from 'express';
import { subscriberController } from './subscriber.controller';

const router = Router();

router.post('/create-subscriber', subscriberController.createsubscriber);

// router.patch('/update/:id', subscriberController.updatesubscriber);

// router.delete('/:id', subscriberController.deletesubscriber);

// router.get('/:id', subscriberController.getsubscriber);
// router.get('/', subscriberController.getsubscriber);

export const subscriberRoutes = router;
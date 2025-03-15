import { Router } from 'express';
import { eventController } from './event.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
  '/create-event',
  auth(USER_ROLE.user, USER_ROLE.admin),
  eventController.createevent,
);

router.patch('/update/:id', eventController.updateevent);
router.get('/user-event/:userId', eventController.getEventByUserId);
router.delete('/:id', eventController.deleteevent);
router.get(
  '/my-event',
  auth(USER_ROLE.user, USER_ROLE.admin),
  eventController.getMyeventById,
);
router.get('/:id', eventController.geteventById);
router.get('/', eventController.getAllevent);

export const eventRoutes = router;

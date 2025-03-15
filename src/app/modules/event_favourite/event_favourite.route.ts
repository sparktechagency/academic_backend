import { Router } from 'express';
import { event_favouriteController } from './event_favourite.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
  '/create-event_favourite',
  auth(USER_ROLE.user, USER_ROLE.admin),
  event_favouriteController.createevent_favourite,
);

router.patch('/update/:id', event_favouriteController.updateevent_favourite);
router.get(
  '/user-event_favourite/:userId',
  event_favouriteController.getevent_favouriteByUserId,
);
router.delete('/:id', event_favouriteController.deleteevent_favourite);
router.get(
  '/my-event_favourite',
  auth(USER_ROLE.user, USER_ROLE.admin),
  event_favouriteController.getMyevent_favouriteById,
);
router.get('/:id', event_favouriteController.getevent_favouriteById);
router.get('/', event_favouriteController.getAllevent_favourite);

export const event_favouriteRoutes = router;

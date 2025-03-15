import { Router } from 'express';
import { calenderController } from './calender.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.get(
  '/show-calender',
  auth(USER_ROLE.user, USER_ROLE.admin),
  calenderController.getUserFavouriteCalendar,
);

// router.patch('/update/:id', calenderController.updatecalender);

// router.delete('/:id', calenderController.deletecalender);

// router.get('/:id', calenderController.getcalender);
// router.get('/', calenderController.getcalender);

export const calenderRoutes = router;

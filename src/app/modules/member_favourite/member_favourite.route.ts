import { Router } from 'express';
import { member_favouriteController } from './member_favourite.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
  '/create-member_favourite',
  auth(USER_ROLE.user, USER_ROLE.admin),
  member_favouriteController.createmember_favourite,
);

router.patch('/update/:id', member_favouriteController.updatemember_favourite);
router.get(
  '/user-member_favourite/:userId',
  member_favouriteController.getMember_favouriteByUserId,
);
router.delete('/:id', member_favouriteController.deletemember_favourite);
router.get(
  '/my-member_favourite',
  auth(USER_ROLE.user, USER_ROLE.admin),
  member_favouriteController.getMymember_favouriteById,
);
router.get('/:id', member_favouriteController.getmember_favouriteById);
router.get('/', member_favouriteController.getAllmember_favourite);

export const member_favouriteRoutes = router;

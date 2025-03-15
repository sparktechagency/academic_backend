import { Router } from 'express';
import { grants_favouriteController } from './grants_favourite.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
  '/create-grants_favourite',
  auth(USER_ROLE.user, USER_ROLE.admin),
  grants_favouriteController.creategrants_favourite,
);

router.patch('/update/:id', grants_favouriteController.updategrants_favourite);
router.get(
  '/user-grants_favourite/:userId',
  grants_favouriteController.getgrants_favouriteByUserId,
);
router.delete('/:id', grants_favouriteController.deletegrants_favourite);
router.get(
  '/my-grants_favourite',
  auth(USER_ROLE.user, USER_ROLE.admin),
  grants_favouriteController.getMygrants_favouriteById,
);
router.get('/:id', grants_favouriteController.getgrants_favouriteById);
router.get('/', grants_favouriteController.getAllgrants_favourite);

export const grants_favouriteRoutes = router;

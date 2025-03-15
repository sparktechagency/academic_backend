import { Router } from 'express';
import { grantsController } from './grants.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
  '/create-grants',
  auth(USER_ROLE.user, USER_ROLE.admin),
  grantsController.creategrants,
);

router.patch('/update/:id', grantsController.updategrants);
router.get('/user-grants/:userId', grantsController.getgrantsByUserId);
router.delete('/:id', grantsController.deletegrants);
router.get(
  '/my-grants',
  auth(USER_ROLE.user, USER_ROLE.admin),
  grantsController.getMygrantsById,
);
router.get('/:id', grantsController.getgrantsById);
router.get('/', grantsController.getAllgrants);

export const grantsRoutes = router;

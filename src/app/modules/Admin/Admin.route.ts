import { Router } from 'express';
import { AdminController } from './Admin.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.get(
  '/count-Admin',
  //   auth(USER_ROLE.admin),
  AdminController.getAllCalCulation,
);
router.get(
  '/dashboard',
  //   auth(USER_ROLE.admin),
  AdminController.dashboardData,
);

export const AdminRoutes = router;

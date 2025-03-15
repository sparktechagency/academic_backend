import { Router } from 'express';
import { callForpaper_favouriteController } from './callForpaper_favourite.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
  '/create-callForpaper_favourite',
  auth(USER_ROLE.user, USER_ROLE.admin),
  callForpaper_favouriteController.createcallForpaper_favourite,
);

router.patch(
  '/update/:id',
  callForpaper_favouriteController.updatecallForpaper_favourite,
);

router.get(
  '/user-callForpaper_favourite/:userId',
  callForpaper_favouriteController.getcallForpaper_favouriteByUserId,
);

router.delete(
  '/:id',
  callForpaper_favouriteController.deletecallForpaper_favourite,
);

router.get(
  '/my-callForpaper_favourite',
  auth(USER_ROLE.user),
  callForpaper_favouriteController.getMycallForpaper_favouriteById,
);

router.get(
  '/:id',
  callForpaper_favouriteController.getcallForpaper_favouriteById,
);
router.get('/', callForpaper_favouriteController.getAllcallForpaper_favourite);

export const callForpaper_favouriteRoutes = router;

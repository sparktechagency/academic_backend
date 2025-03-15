import { Router } from 'express';
import { jobpost_favouriteController } from './jobpost_favourite.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
  '/create-jobpost_favourite',
  auth(USER_ROLE.user, USER_ROLE.admin),
  jobpost_favouriteController.createjobpost_favourite,
);

router.patch(
  '/update/:id',
  jobpost_favouriteController.updatejobpost_favourite,
);
router.get(
  '/user-jobpost_favourite/:userId',
  jobpost_favouriteController.getjobpost_favouriteByUserId,
);

router.delete('/:id', jobpost_favouriteController.deletejobpost_favourite);
router.get(
  '/my-jobpost_favourite',
  auth(USER_ROLE.user, USER_ROLE.admin),
  jobpost_favouriteController.getMyjobpost_favouriteById,
);
router.get('/:id', jobpost_favouriteController.getjobpost_favouriteById);
router.get('/', jobpost_favouriteController.getAlljobpost_favourite);

export const jobpost_favouriteRoutes = router;

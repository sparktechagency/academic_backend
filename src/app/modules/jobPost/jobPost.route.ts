import { Router } from 'express';
import { jobPostController } from './jobPost.controller';
import { USER_ROLE } from '../user/user.constants';
import auth from '../../middleware/auth';

const router = Router();

router.post(
  '/create-jobPost',
  auth(USER_ROLE.user, USER_ROLE.admin),
  jobPostController.createjobPost,
);

router.patch('/update/:id', jobPostController.updatejobPost);
router.get('/user-jobPost/:userId', jobPostController.getJobPostByUserId);
router.delete('/:id', jobPostController.deletejobPost);
router.get(
  '/my-jobpost',
  auth(USER_ROLE.user, USER_ROLE.admin),
  jobPostController.getMyjobPostById,
);
router.get('/:id', jobPostController.getjobPostById);
router.get('/', jobPostController.getAlljobPost);

export const jobPostRoutes = router;

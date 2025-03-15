import { Router } from 'express';
import { callForPaperController } from './callForPaper.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
  '/create-callForPaper',
  auth(USER_ROLE.user, USER_ROLE.admin),
  callForPaperController.createcallForPaper,
);

router.patch('/update/:id', callForPaperController.updatecallForPaper);
router.get(
  '/user-callForPaper/:userId',
  callForPaperController.getCallForPaperByUserId,
);
router.delete('/:id', callForPaperController.deletecallForPaper);
router.get(
  '/my-callForPaper',
  auth(USER_ROLE.user, USER_ROLE.admin),
  callForPaperController.getMycallForPaperById,
);
router.get('/:id', callForPaperController.getcallForPaperById);
router.get('/', callForPaperController.getAllcallForPaper);

export const callForPaperRoutes = router;

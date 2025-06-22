import { Router } from 'express';
import { invitationController } from './invitation.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
  '/create-invitation',
  auth(USER_ROLE.user, USER_ROLE.admin),
  invitationController.createinvitation,
);

router.patch('/update/:id', invitationController.updateinvitation);

router.delete('/:id', invitationController.deleteinvitation);

router.get('/:id', invitationController.getinvitationById);
router.get('/', invitationController.getAllinvitation);

export const invitationRoutes = router;

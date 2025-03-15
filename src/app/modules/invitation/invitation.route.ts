import { Router } from 'express';
import { invitationController } from './invitation.controller';

const router = Router();

router.post('/create-invitation', invitationController.createinvitation);

router.patch('/update/:id', invitationController.updateinvitation);

router.delete('/:id', invitationController.deleteinvitation);

// router.get('/:id', invitationController.getinvitation);
// router.get('/', invitationController.getinvitation);

export const invitationRoutes = router;

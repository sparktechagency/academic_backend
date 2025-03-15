import { Router } from 'express';
import { make_folderController } from './make_folder.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
  '/create-make_folder',
  auth(USER_ROLE.user),
  make_folderController.createmake_folder,
);

router.patch('/update/:id', make_folderController.updatemake_folder);

router.delete('/:id', make_folderController.deletemake_folder);
router.get(
  '/my-make_folder',
  auth(USER_ROLE.user),
  make_folderController.getMyFolders,
);
router.get('/public/:userId', make_folderController.getPublicFoldersByUserId);
router.get('/:id', make_folderController.getmake_folderById);
router.get('/', make_folderController.getAllmake_folder);

export const make_folderRoutes = router;

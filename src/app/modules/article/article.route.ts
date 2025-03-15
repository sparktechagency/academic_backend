import { Router } from 'express';
import { articleController } from './article.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
  '/create-article',
  auth(USER_ROLE.user),
  articleController.createarticle,
);
router.get('/folder/:id', articleController.getArticlesByFolderId);

router.patch('/update/:id', articleController.updatearticle);

router.delete('/:id', articleController.deletearticle);

router.get('/:id', articleController.getarticleById);
router.get('/', articleController.getAllarticle);

export const articleRoutes = router;

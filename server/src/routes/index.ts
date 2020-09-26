import Router from 'koa-router';

import boardRoutes from './board';
import postRoutes from './post';
import tokenRoutes from './token';
import userRoutes from './user';

const router = new Router();

router.use('/boards', boardRoutes.routes());
router.use('/posts', postRoutes.routes());
router.use('/tokens', tokenRoutes.routes());
router.use('/users', userRoutes.routes());

export default router;
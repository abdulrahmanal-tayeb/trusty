import { Router } from 'express';
import { humanizeText } from '../controllers/humanizer.controller';

const router = Router();

router.post('/humanize', humanizeText);

export default router;

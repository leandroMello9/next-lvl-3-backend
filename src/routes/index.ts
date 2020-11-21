import {Router} from 'express';

import OrphanageController from '../controllers/OrphanagesController'

import multer from 'multer'
;
import uploadConfig from '../config/upload'

const upload = multer(uploadConfig)

const router = Router();

router.post('/orphanage',upload.array('images'), OrphanageController.create)
router.get('/orphanage', OrphanageController.index)
router.get('/orphanage/:id', OrphanageController.show)
export default router;
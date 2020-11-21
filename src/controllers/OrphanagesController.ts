import {Request, Response} from 'express'
import {getRepository} from 'typeorm';
import Orphanage from '../models/Orphanages'
import orphanageView from '../view/orphanage_view'
import * as Yup from 'yup'
export default {
  async create(req: Request, res: Response) {
    try {
      
      const orphanageRepository = getRepository(Orphanage)

      const requestImages = req.files as Express.Multer.File[];

      const images = requestImages.map(image => {
        return { path: image.filename }
      })
  
      const {latitude, longitude, about, name, opening_hours, opening_on_weekends, instructions} = req.body
      
    
      const data = orphanageRepository.create({
        instructions,
        about,
        latitude,
        longitude,
        name,
        opening_hours,
        opening_on_weekends,
        images
      })
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        instructions: Yup.string().required(),
        opening_hours: Yup.string().required(),
        opening_on_weekends: Yup.string().required(),
        about: Yup.string().required().max(300),
        latitude: Yup.number().required(),
        longitude: Yup.number().required(),
        images: Yup.array(Yup.object().shape({
          path: Yup.string().required()
        }))
      })
      
      await schema.validate(data, {
        abortEarly: false
      })
      await orphanageRepository.save(data)
  
      return res.status(201).json(data)
    } catch(err) {
      return res.status(400).json(err)
    }
  },
  async index(req: Request, res:Response) {
    try {
      const orphanageRepository = getRepository(Orphanage)
      const orphanages = await orphanageRepository.find({
        relations: ['images']
      });
      return res.status(200).json(orphanageView.renderMany(orphanages))
    }catch(err) {
      return res.status(400).json(err)
    }
  
  },
  async show(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const orphanageRepository = getRepository(Orphanage)
      const orphanages = await orphanageRepository.findOne({
        where: { id },
        relations: ['images']
      });
      if(!orphanages) {
        return res.status(400).json({
          message: 'Orphanage not exist'
        })
      }
      return res.status(200).json(orphanageView.render(orphanages));
    }catch(err) {
      return res.status(400).json(err);
    }
    
  }
}
import { Router } from 'express';
import { BuildingController } from './building.controller';

const router = Router();

router.get('/:id', BuildingController.getSingleBuilding);
router.post('/', BuildingController.createBuilding);
router.get('/', BuildingController.getBuildings);
router.delete('/:id', BuildingController.deleteBuilding);
router.patch('/:id', BuildingController.updateBuilding);

export const BuildingRoutes = router;

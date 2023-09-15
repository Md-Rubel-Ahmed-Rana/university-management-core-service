import { Router } from 'express';
import { RoomController } from './room.controller';

const router = Router();

router.post('/', RoomController.createRoom);
router.get('/', RoomController.getAll);
router.get('/:id', RoomController.getSingle);
router.delete('/:id', RoomController.deleteRoom);
router.patch('/:id', RoomController.updateRoom);

export const RoomRoutes = router;

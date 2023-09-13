import { Router } from 'express';
import { FacultyController } from './faculty.controller';

const router = Router();

router.post('/', FacultyController.create);
router.get('/', FacultyController.getAll);
router.get('/:id', FacultyController.getSingle);
router.delete('/:id', FacultyController.deleteFaculty);
router.patch('/:id', FacultyController.updateFaculty);

export const FacultyRoutes = router;

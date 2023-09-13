import { Router } from 'express';
import { StudentController } from './student.controller';

const router = Router();

router.post('/', StudentController.create);
router.get('/', StudentController.getAll);
router.get('/:id', StudentController.getSingle);
router.delete('/:id', StudentController.deleteStudent);
router.patch('/:id', StudentController.updateStudent);

export const StudentRoutes = router;

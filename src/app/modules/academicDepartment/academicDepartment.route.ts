import { Router } from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = Router();

router.post('/', AcademicDepartmentController.create);
router.get('/', AcademicDepartmentController.getAll);
router.get('/:id', AcademicDepartmentController.getSingle);
router.delete('/:id', AcademicDepartmentController.deleteDepartment);
router.patch('/:id', AcademicDepartmentController.updateDepartment);

export const AcademicDepartmentRoutes = router;

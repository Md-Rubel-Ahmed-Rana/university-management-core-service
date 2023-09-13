import { Router } from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = Router();

router.post('/', AcademicFacultyController.create);
router.get('/', AcademicFacultyController.getAll);
router.get('/:id', AcademicFacultyController.getSingle);
router.delete('/:id', AcademicFacultyController.deleteDepartment);
router.patch('/:id', AcademicFacultyController.updateDepartment);

export const AcademicFacultiesRoutes = router;

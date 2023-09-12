import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidator } from './academicSemester.validator';

const router = Router();

router.get('/', AcademicSemesterController.getAllFromDB);

router.get('/:id', AcademicSemesterController.getSingleData);

router.delete('/:id', AcademicSemesterController.deleteSemester);

router.patch('/:id', AcademicSemesterController.updateSemester);

router.post(
  '/',
  validateRequest(AcademicSemesterValidator.createZod),
  AcademicSemesterController.insertIntoDB
);

export const AcademicSemesterRoutes = router;

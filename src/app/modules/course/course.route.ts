import { Router } from 'express';
import { CourseController } from './course.controller';

const router = Router();

router.post('/', CourseController.createCourse);
router.get('/', CourseController.getCourses);
router.get('/:id', CourseController.getCourse);
router.delete('/:id', CourseController.deleteCourse);
router.delete('/', CourseController.deleteCourses);
router.patch('/:id', CourseController.updateCourse);

export const CourseRoutes = router;

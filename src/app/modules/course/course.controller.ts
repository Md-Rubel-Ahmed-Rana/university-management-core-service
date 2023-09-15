import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CourseService } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseService.createCourse(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getCourses = catchAsync(async (req, res) => {
  const result = await CourseService.getCourses();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses fetched successfully',
    data: result,
  });
});

const getCourse = catchAsync(async (req, res) => {
  const result = await CourseService.getCourse(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const result = await CourseService.deleteCourse(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const result = await CourseService.updateCourse(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getCourses,
  getCourse,
  deleteCourse,
  updateCourse,
};

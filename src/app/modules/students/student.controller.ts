import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StudentService } from './student.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully!',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.getAll();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrieved successfully!',
    data: result,
  });
});

const getSingle = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully!',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.deleteStudent(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully!',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.updateStudent(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully!',
    data: result,
  });
});

export const StudentController = {
  create,
  getAll,
  getSingle,
  deleteStudent,
  updateStudent,
};

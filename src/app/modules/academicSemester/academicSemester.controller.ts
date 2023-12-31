import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.insertIntoDB(req.body);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'code', 'year']);
  const options = pick(req.query, [
    'page',
    'limit',
    'skip',
    'sortBy',
    'sortOrder',
  ]);
  const result = await AcademicSemesterService.getAllFromDB(filters, options);
  sendResponse<AcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getSingleData(req.params.id);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester fetched',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.deleteSemester(req.params.id);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester deleted',
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.updateSemester(
    req.params.id,
    req.body
  );
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester updated',
    data: result,
  });
});

export const AcademicSemesterController = {
  insertIntoDB,
  getAllFromDB,
  getSingleData,
  deleteSemester,
  updateSemester,
};

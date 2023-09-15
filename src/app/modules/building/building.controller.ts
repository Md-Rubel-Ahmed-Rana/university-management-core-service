import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BuildingService } from './building.service';

const createBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.createBuilding(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building created successfully',
    data: result,
  });
});

const getBuildings = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.getBuildings();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buildings fetched successfully',
    data: result,
  });
});

const getSingleBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.getSingleBuilding(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building fetched successfully',
    data: result,
  });
});

const deleteBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.deleteBuilding(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building deleted successfully',
    data: result,
  });
});

const updateBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.updateBuilding(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building updated successfully',
    data: result,
  });
});

export const BuildingController = {
  createBuilding,
  getBuildings,
  getSingleBuilding,
  deleteBuilding,
  updateBuilding,
};

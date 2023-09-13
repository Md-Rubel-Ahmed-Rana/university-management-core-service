import { AcademicSemester, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prismaInstance';
import { IAcademicSemesterFilter } from './academicSemester.interface';

const insertIntoDB = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IAcademicSemesterFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: ['title', 'code', 'startMonth', 'endMonth'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // filtering
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.AcademicSemesterWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.academicSemester.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.academicSemester.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleData = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteSemester = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateSemester = async (
  id: string,
  payload: Partial<AcademicSemester>
) => {
  const result = await prisma.academicSemester.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const AcademicSemesterService = {
  insertIntoDB,
  getAllFromDB,
  getSingleData,
  deleteSemester,
  updateSemester,
};

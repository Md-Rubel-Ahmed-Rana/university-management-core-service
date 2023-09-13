import { AcademicFaculty } from '@prisma/client';
import { prisma } from '../../../shared/prismaInstance';

const create = async (data: AcademicFaculty): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data,
  });
  return result;
};

const getAll = async (): Promise<AcademicFaculty[]> => {
  const result = await prisma.academicFaculty.findMany();
  return result;
};

const getSingle = async (id: string): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteDepartment = async (
  id: string
): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateDepartment = async (
  id: string,
  data: Partial<AcademicFaculty>
): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const AcademicFacultyService = {
  create,
  getAll,
  getSingle,
  deleteDepartment,
  updateDepartment,
};

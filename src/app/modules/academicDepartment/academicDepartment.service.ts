import { AcademicDepartment } from '@prisma/client';
import { prisma } from '../../../shared/prismaInstance';

const create = async (
  data: AcademicDepartment
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({
    data,
  });
  return result;
};

const getAll = async (): Promise<AcademicDepartment[]> => {
  const result = await prisma.academicDepartment.findMany();
  return result;
};

const getSingle = async (id: string): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteDepartment = async (
  id: string
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateDepartment = async (
  id: string,
  data: Partial<AcademicDepartment>
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const AcademicDepartmentService = {
  create,
  getAll,
  getSingle,
  deleteDepartment,
  updateDepartment,
};

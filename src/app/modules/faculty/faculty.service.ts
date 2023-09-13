import { Faculty } from '@prisma/client';
import { prisma } from '../../../shared/prismaInstance';

const create = async (data: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data,
  });
  return result;
};

const getAll = async (): Promise<Faculty[]> => {
  const result = await prisma.faculty.findMany();
  return result;
};

const getSingle = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteFaculty = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateFaculty = async (
  id: string,
  data: Partial<Faculty>
): Promise<Faculty | null> => {
  const result = await prisma.faculty.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const FacultyService = {
  create,
  getAll,
  getSingle,
  deleteFaculty,
  updateFaculty,
};

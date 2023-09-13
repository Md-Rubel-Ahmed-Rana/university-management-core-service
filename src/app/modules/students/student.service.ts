import { Student } from '@prisma/client';
import { prisma } from '../../../shared/prismaInstance';

const create = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data,
  });
  return result;
};

const getAll = async (): Promise<Student[]> => {
  const result = await prisma.student.findMany();
  return result;
};

const getSingle = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteStudent = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateStudent = async (
  id: string,
  data: Partial<Student>
): Promise<Student | null> => {
  const result = await prisma.student.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const StudentService = {
  create,
  getAll,
  getSingle,
  deleteStudent,
  updateStudent,
};

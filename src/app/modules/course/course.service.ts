/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course } from '@prisma/client';
import { prisma } from '../../../shared/prismaInstance';

const createCourse = async (data: any): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.create({ data: courseData });

    if (preRequisiteCourses && preRequisiteCourses.length) {
      for (const preReqCourse of preRequisiteCourses) {
        await transactionClient.courseToPrerequisite.create({
          data: {
            courseId: result.id,
            preRequisiteId: preReqCourse.courseId,
          },
        });
      }
    }

    return result;
  });

  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: { id: newCourse.id },
      include: {
        prerequisite: { include: { preRequisite: true } },
        prerequisiteFor: { include: { course: true } },
      },
    });
    return responseData;
  }
};

const getCourses = async (): Promise<Course[]> => {
  const result = await prisma.course.findMany();
  return result;
};

const getCourse = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteCourse = async (id: string): Promise<Course> => {
  const result = await prisma.course.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateCourse = async (
  id: string,
  data: Partial<Course>
): Promise<Course> => {
  const result = await prisma.course.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const CourseService = {
  createCourse,
  getCourses,
  getCourse,
  deleteCourse,
  updateCourse,
};

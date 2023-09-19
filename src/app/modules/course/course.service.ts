/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prismaInstance';
import { asyncForEach } from '../../../shared/utils';
import {
  ICourseCreateData,
  IPrerequisiteCourseRequest,
} from './course.interface';

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
  const result = await prisma.course.findMany({
    include: {
      prerequisite: true,
      prerequisiteFor: true,
    },
  });
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

const deleteCourses = async (ids: string[]) => {
  let result;
  for (let index = 0; index < ids.length; index++) {
    result = await prisma.course.deleteMany({
      where: {
        id: ids[index],
      },
    });
  }
  return result;
};

const updateCourse = async (
  id: string,
  payload: ICourseCreateData
): Promise<Course | null> => {
  const { preRequisiteCourses, ...courseData } = payload;
  await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.update({
      where: {
        id,
      },
      data: courseData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to update course');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePrerequisite = preRequisiteCourses.filter(
        prerequisite => prerequisite.courseId && prerequisite.isDeleted
      );
      const newPrerequisite = preRequisiteCourses.filter(
        prerequisite => prerequisite.courseId && !prerequisite.isDeleted
      );

      await asyncForEach(
        deletePrerequisite,
        async (prerequisiteCourse: IPrerequisiteCourseRequest) => {
          await transactionClient.courseToPrerequisite.deleteMany({
            where: {
              AND: [
                {
                  courseId: id,
                },
                {
                  preRequisiteId: prerequisiteCourse.courseId,
                },
              ],
            },
          });
        }
      );

      await asyncForEach(
        newPrerequisite,
        async (insertPrerequisite: IPrerequisiteCourseRequest) => {
          await transactionClient.courseToPrerequisite.create({
            data: {
              courseId: id,
              preRequisiteId: insertPrerequisite.courseId,
            },
          });
        }
      );
    }
    return result;
  });

  const responseData = await prisma.course.findUnique({
    where: { id: id },
    include: {
      prerequisite: { include: { preRequisite: true } },
      prerequisiteFor: { include: { course: true } },
    },
  });

  return responseData;
};

export const CourseService = {
  createCourse,
  getCourses,
  getCourse,
  deleteCourse,
  updateCourse,
  deleteCourses,
};

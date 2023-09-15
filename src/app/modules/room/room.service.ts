import { Room } from '@prisma/client';
import { prisma } from '../../../shared/prismaInstance';

const createRoom = async (data: Room): Promise<Room> => {
  const result = await prisma.room.create({
    data,
    include: {
      building: true,
    },
  });
  return result;
};

const getAll = async (): Promise<Room[]> => {
  const result = await prisma.room.findMany({
    include: {
      building: true,
    },
  });
  return result;
};

const getSingle = async (id: string): Promise<Room | null> => {
  const result = await prisma.room.findUnique({
    where: {
      id,
    },
    include: {
      building: true,
    },
  });
  return result;
};

const deleteRoom = async (id: string): Promise<Room> => {
  const result = await prisma.room.delete({
    where: {
      id,
    },
    include: {
      building: true,
    },
  });
  return result;
};

const updateRoom = async (id: string, data: Partial<Room>): Promise<Room> => {
  const result = await prisma.room.update({
    where: {
      id,
    },
    data,
    include: {
      building: true,
    },
  });
  return result;
};

export const RoomService = {
  createRoom,
  getAll,
  getSingle,
  deleteRoom,
  updateRoom,
};

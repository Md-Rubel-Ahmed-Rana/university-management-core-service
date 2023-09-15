import { Building, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createBuilding = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data,
  });
  return result;
};

const getBuildings = async (): Promise<Building[]> => {
  const result = await prisma.building.findMany();
  return result;
};
const getSingleBuilding = async (id: string): Promise<Building | null> => {
  const result = await prisma.building.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteBuilding = async (id: string): Promise<Building | null> => {
  const result = await prisma.building.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateBuilding = async (
  id: string,
  data: Partial<Building>
): Promise<Building | null> => {
  const result = await prisma.building.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const BuildingService = {
  createBuilding,
  getBuildings,
  getSingleBuilding,
  deleteBuilding,
  updateBuilding,
};

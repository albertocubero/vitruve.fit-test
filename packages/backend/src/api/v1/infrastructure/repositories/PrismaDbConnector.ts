import { PrismaClient } from '@prisma/client';

const prismaBaseServiceFactory = (() => {
  let instance: PrismaClient;

  return {
    getInstance(): PrismaClient {
      if (!instance) {
        instance = new PrismaClient();
      }
      return instance;
    },
  };
})();

export { prismaBaseServiceFactory };

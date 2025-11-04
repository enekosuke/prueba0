import { Test } from '@nestjs/testing';

import { PrismaService } from '../../prisma/prisma.service';

import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  it('should be defined', async () => {
    const mockPrisma = {
      product: {
        findMany: jest.fn().mockResolvedValue([]),
        findUnique: jest.fn().mockResolvedValue(null)
      },
      category: {
        findMany: jest.fn().mockResolvedValue([])
      }
    };

    const moduleRef = await Test.createTestingModule({
      providers: [CatalogService, { provide: PrismaService, useValue: mockPrisma }]
    }).compile();

    const service = moduleRef.get(CatalogService);
    expect(service).toBeDefined();
  });
});

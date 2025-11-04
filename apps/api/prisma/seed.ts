import { PrismaClient, RoleKey, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function createRoles() {
  const roles = [
    { key: RoleKey.ADMIN, name: 'Administrador' },
    { key: RoleKey.MANAGER, name: 'Gestor' },
    { key: RoleKey.CUSTOMER, name: 'Cliente' }
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { key: role.key },
      update: {},
      create: {
        ...role,
        permissions: {
          create: [
            { resource: 'product', action: 'manage' },
            { resource: 'order', action: 'manage' },
            { resource: 'promotion', action: 'manage' }
          ]
        }
      }
    });
  }
}

async function createUsers() {
  const passwordHash = '$2b$10$UuIpNgtrENcGukdxbYlR.O9EMNjz6txwuus09uqSTQQuJnfVQL1.e'; // Demo1234!
  const admin = await prisma.user.upsert({
    where: { email: 'admin@demo.dev' },
    update: {},
    create: {
      email: 'admin@demo.dev',
      passwordHash,
      firstName: 'Aurora',
      lastName: 'Admin',
      roles: { create: [{ role: { connect: { key: RoleKey.ADMIN } } }] }
    }
  });

  await prisma.user.upsert({
    where: { email: 'manager@demo.dev' },
    update: {},
    create: {
      email: 'manager@demo.dev',
      passwordHash,
      firstName: 'Marta',
      lastName: 'Manager',
      roles: { create: [{ role: { connect: { key: RoleKey.MANAGER } } }] }
    }
  });

  await prisma.user.upsert({
    where: { email: 'cliente@demo.dev' },
    update: {},
    create: {
      email: 'cliente@demo.dev',
      passwordHash,
      firstName: 'Carlos',
      lastName: 'Cliente',
      roles: { create: [{ role: { connect: { key: RoleKey.CUSTOMER } } }] }
    }
  });

  return admin.id;
}

async function createCategories() {
  const categories = [
    'Novedades',
    'Colección Premium',
    'Moda',
    'Calzado',
    'Accesorios',
    'Hogar',
    'Tecnología',
    'Belleza',
    'Deportes',
    'Kids'
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { slug: faker.helpers.slugify(name.toLowerCase()) },
      update: {},
      create: {
        name,
        slug: faker.helpers.slugify(name.toLowerCase())
      }
    });
  }
}

async function createProducts() {
  const categoryIds = await prisma.category.findMany({ select: { id: true, slug: true } });

  for (let i = 0; i < 40; i++) {
    const title = `Producto ${i + 1}`;
    const slug = `producto-${i + 1}`;
    const product = await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        title,
        slug,
        description: faker.commerce.productDescription(),
        heroImage: `https://picsum.photos/seed/aurora-${i}/800/600.webp`,
        images: {
          create: new Array(3).fill(null).map((_, idx) => ({
            url: `https://picsum.photos/seed/aurora-${i}-${idx}/800/600.webp`,
            alt: `${title} imagen ${idx + 1}`,
            position: idx
          }))
        },
        categories: {
          create: categoryIds.slice(0, 2).map((category) => ({ category: { connect: { id: category.id } } }))
        }
      }
    });

    for (const variantName of ['Estándar', 'Deluxe']) {
      const variant = await prisma.productVariant.create({
        data: {
          productId: product.id,
          name: variantName,
          sku: `${slug}-${faker.string.alpha(5).toUpperCase()}`,
          attributes: { color: faker.color.human(), size: faker.helpers.arrayElement(['S', 'M', 'L']) }
        }
      });

      await prisma.inventory.create({
        data: { variantId: variant.id, stock: faker.number.int({ min: 5, max: 40 }), threshold: 3 }
      });

      await prisma.price.create({
        data: {
          productId: product.id,
          currency: 'EUR',
          amount: new Prisma.Decimal(faker.commerce.price({ min: 29, max: 249 })),
          compareAt: new Prisma.Decimal(faker.commerce.price({ min: 59, max: 299 }))
        }
      });
    }
  }
}

async function main() {
  await createRoles();
  await createCategories();
  await createUsers();
  await createProducts();

  await prisma.coupon.upsert({
    where: { code: 'BIENVENIDA10' },
    update: {},
    create: {
      code: 'BIENVENIDA10',
      type: 'percentage',
      value: new Prisma.Decimal(10)
    }
  });

  console.log('Seed completado');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

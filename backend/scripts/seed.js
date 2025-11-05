import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import Product from '../src/models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envLocalPath = path.resolve(__dirname, '../.env');
const envRootPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else if (fs.existsSync(envRootPath)) {
  dotenv.config({ path: envRootPath });
} else {
  dotenv.config();
}

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('MONGO_URI no está definido. Configura la cadena de conexión antes de ejecutar el seed.');
  process.exit(1);
}

const dataPath = path.resolve(__dirname, '../data/products.json');

async function seed() {
  try {
    if (!fs.existsSync(dataPath)) {
      throw new Error(`No se encontró el archivo de productos en ${dataPath}`);
    }

    const raw = await fs.promises.readFile(dataPath, 'utf-8');
    const products = JSON.parse(raw);

    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('El archivo de productos no contiene elementos.');
    }

    await mongoose.connect(mongoUri);
    console.log('Conexión a MongoDB establecida. Limpiando colección de productos...');

    await Product.deleteMany({});
    await Product.insertMany(products, { ordered: false });

    console.log(`Seed completado: ${products.length} productos insertados.`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error durante el seed de productos:', error);
    process.exit(1);
  }
}

seed();

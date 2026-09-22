import 'dotenv/config';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { User } from '../models/User';

async function seedAdmin() {
  const mongoUri = process.env.MONGODB_URI;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!mongoUri) {
    throw new Error('MONGODB_URI não configurado');
  }

  if (!adminEmail || !adminPassword) {
    throw new Error(
      'ADMIN_EMAIL e ADMIN_PASSWORD precisam estar configurados'
    );
  }

  await mongoose.connect(mongoUri);

  console.log('Conectado ao MongoDB');

  const existingAdmin = await User.findOne({
    email: adminEmail,
  });

  if (existingAdmin) {
    console.log(
      `Usuário com email ${adminEmail} já existe.`
    );

    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(
    adminPassword,
    12
  );

  const admin = await User.create({
    name: 'Administrador SwimRank',
    email: adminEmail,
    passwordHash,
    role: 'ADMIN',
  });

  console.log('ADMIN criado com sucesso!');
  console.log({
    id: admin._id.toString(),
    name: admin.name,
    email: admin.email,
    role: admin.role,
  });

  await mongoose.disconnect();
}

seedAdmin().catch(async (error) => {
  console.error('Erro ao criar ADMIN:', error);

  await mongoose.disconnect();

  process.exit(1);
});
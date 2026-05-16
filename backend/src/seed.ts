import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './common/entities/user.entity';
import { UserRole } from './common/enums/userRole.enums';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userRepo = app.get<Repository<User>>(getRepositoryToken(User));

  const adminEmail = 'admin@pollunit.com';
  const existing = await userRepo.findOne({ where: { email: adminEmail } });

  if (existing) {
    console.log('Admin account already exists — skipping seed.');
    await app.close();
    return;
  }

  const hashedPassword = await bcrypt.hash('Admin1234', 10);

  const admin = userRepo.create({
    firstName: 'Poll',
    lastName: 'Admin',
    email: adminEmail,
    password: hashedPassword,
    state: 'Lagos',
    role: UserRole.ADMIN,
  });

  await userRepo.save(admin);
  console.log('✓ Admin account created:');
  console.log('  Email:    admin@pollunit.com');
  console.log('  Password: Admin1234');

  await app.close();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

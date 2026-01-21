import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

export async function seedDatabase() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    // Verificar si ya existe el usuario admin
    const adminExists = await usersService.findByEmail('admin@admin.com');

    if (!adminExists) {
      await usersService.create('admin@admin.com', 'admin123', 'Admin');
      console.log('Usuario admin creado exitosamente');
    } else {
      console.log('Usuario admin ya existe');
    }
  } catch (error) {
    console.error('Error al crear usuario admin:', error);
  } finally {
    await app.close();
  }
}

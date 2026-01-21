import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentsService } from './students.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get()
  async findAll(): Promise<Student[]> {
    return this.studentsService.findAll();
  }

  @Get('stats')
  async getStats() {
    return this.studentsService.count();
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importStudents(@UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }

    const validMimeTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    if (!file.mimetype || !validMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Tipo de archivo no válido. Solo se permiten archivos CSV o Excel',
      );
    }

    const result = await this.studentsService.importFromFile(file);
    return {
      message: 'Importación completada',
      ...result,
    };
  }

  @Post()
  async create(@Body() studentData: Partial<Student>): Promise<Student> {
    return this.studentsService.create(studentData);
  }

  @Delete('truncate')
  async truncate() {
    await this.studentsService.deleteAll();
    return { message: 'Todos los estudiantes han sido eliminados' };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.studentsService.delete(parseInt(id, 10));
  }
}

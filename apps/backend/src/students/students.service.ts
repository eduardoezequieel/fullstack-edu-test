import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student, StudentStatus } from './student.entity';
import * as XLSX from 'xlsx';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async create(studentData: Partial<Student>): Promise<Student> {
    const student = this.studentRepository.create(studentData);
    return this.studentRepository.save(student);
  }

  async delete(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }

  async deleteAll(): Promise<void> {
    await this.studentRepository.clear();
  }

  async count(): Promise<{ total: number; active: number; graduated: number }> {
    const total = await this.studentRepository.count();
    const active = await this.studentRepository.count({
      where: { status: StudentStatus.ACTIVE },
    });
    const graduated = await this.studentRepository.count({
      where: { status: StudentStatus.GRADUATED },
    });

    return { total, active, graduated };
  }

  async importFromFile(file: Express.Multer.File): Promise<{
    success: number;
    failed: number;
    errors: Array<{ row: number; errors: string[] }>;
  }> {
    const workbook = XLSX.read(file.buffer, {
      type: 'buffer',
      codepage: 65001, // UTF-8 para soportar caracteres especiales como tildes
    });
    const sheetName = workbook.SheetNames[0] as string;
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, {
      raw: false, // Convertir valores a string para mejor manejo
      defval: '', // Valor por defecto para celdas vacías
    }) as Record<string, unknown>[];

    const results = {
      success: 0,
      failed: 0,
      errors: [] as Array<{ row: number; errors: string[] }>,
    };

    // Validar que el archivo no esté vacío
    if (data.length === 0) {
      throw new BadRequestException(
        'El archivo está vacío. Debe contener al menos una fila de datos.',
      );
    }

    // Validar estructura del CSV - columnas requeridas
    const requiredColumns = [
      'nombre_estudiante',
      'anio_inicio',
      'nue',
      'estado',
      'promedio_graduacion',
    ];
    const firstRow = data[0];
    const missingColumns = requiredColumns.filter((col) => !(col in firstRow));

    if (missingColumns.length > 0) {
      throw new BadRequestException(
        `El archivo no tiene la estructura correcta. Faltan las columnas: ${missingColumns.join(', ')}. ` +
          `Columnas requeridas: ${requiredColumns.join(', ')}`,
      );
    }

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowNumber = i + 2; // +2 porque Excel empieza en 1 y la primera fila es header

      try {
        // Mapear el estado de español a inglés
        const estadoStr = String(row.estado).toLowerCase();
        let status: StudentStatus;
        if (estadoStr === 'activo') {
          status = StudentStatus.ACTIVE;
        } else if (estadoStr === 'graduado') {
          status = StudentStatus.GRADUATED;
        } else {
          status = row.estado as StudentStatus;
        }

        // Mapear columnas del Excel a nuestro DTO
        const dto = plainToInstance(CreateStudentDto, {
          name: row.nombre_estudiante as string,
          startYear: parseInt(String(row.anio_inicio), 10),
          nue: String(row.nue),
          status: status,
          graduationAverage: row.promedio_graduacion
            ? parseFloat(String(row.promedio_graduacion as number | string))
            : undefined,
        });

        // Validar con class-validator
        const errors = await validate(dto);

        if (errors.length > 0) {
          const errorMessages = errors.flatMap((error) =>
            Object.values(error.constraints || {}),
          );
          results.errors.push({ row: rowNumber, errors: errorMessages });
          results.failed++;
          continue;
        }

        // Validar que el NUE no exista
        const existingStudent = await this.studentRepository.findOne({
          where: { nue: dto.nue },
        });

        if (existingStudent) {
          results.errors.push({
            row: rowNumber,
            errors: [`El NUE ${dto.nue} ya existe en el sistema`],
          });
          results.failed++;
          continue;
        }

        // Crear estudiante
        await this.create({
          name: dto.name,
          startYear: dto.startYear,
          nue: dto.nue,
          status: dto.status,
          graduationAverage: dto.graduationAverage,
        });

        results.success++;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Error desconocido al procesar la fila';
        results.errors.push({
          row: rowNumber,
          errors: [errorMessage],
        });
        results.failed++;
      }
    }

    return results;
  }
}

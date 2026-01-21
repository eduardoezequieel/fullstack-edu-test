import {
  IsString,
  IsInt,
  IsEnum,
  IsNumber,
  Min,
  Max,
  ValidateIf,
  IsNotEmpty,
} from 'class-validator';
import { StudentStatus } from '../student.entity';

export class CreateStudentDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  name: string;

  @IsInt({ message: 'El año de inicio debe ser un número entero' })
  @Min(1900, { message: 'El año de inicio debe ser mayor o igual a 1900' })
  @Max(new Date().getFullYear(), {
    message: `El año de inicio no puede ser mayor a ${new Date().getFullYear()}`,
  })
  startYear: number;

  @IsString({ message: 'El NUE debe ser un texto' })
  @IsNotEmpty({ message: 'El NUE no puede estar vacío' })
  nue: string;

  @IsEnum(StudentStatus, {
    message: 'El estado debe ser "activo" o "graduado"',
  })
  status: StudentStatus;

  @ValidateIf((o: CreateStudentDto) => o.status === StudentStatus.GRADUATED)
  @IsNotEmpty({
    message:
      'El promedio de graduación es requerido cuando el estado es graduado',
  })
  @IsNumber(
    {},
    { message: 'El promedio de graduación debe ser un número válido' },
  )
  @Min(0, { message: 'El promedio de graduación debe ser mayor o igual a 0' })
  @Max(10, { message: 'El promedio de graduación no puede ser mayor a 10' })
  graduationAverage?: number;
}

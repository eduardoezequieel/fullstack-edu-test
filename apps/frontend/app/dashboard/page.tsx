import { DashboardStats } from '@/features/dashboard/components/DashboardStats';
import { getStudentStats } from '@/features/students/lib/students.server';

export default async function DashboardPage() {
  const stats = await getStudentStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Inicio</h1>
        <p className="text-muted-foreground mt-2">Bienvenido! Has iniciado sesión correctamente.</p>
      </div>

      <DashboardStats stats={stats} />
    </div>
  );
}

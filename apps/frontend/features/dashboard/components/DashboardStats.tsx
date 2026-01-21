import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, GraduationCap } from 'lucide-react';

type StatsCardProps = {
  title: string;
  value: number;
  icon: React.ElementType;
  description: string;
  iconColor: string;
  iconBgColor: string;
};

function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  iconColor,
  iconBgColor,
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`rounded-full p-2 ${iconBgColor}`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <p className="text-muted-foreground text-xs">{description}</p>
      </CardContent>
    </Card>
  );
}

interface DashboardStatsProps {
  stats: {
    total: number;
    active: number;
    graduated: number;
  } | null;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statsData = [
    {
      title: 'Total de Estudiantes',
      value: stats?.total ?? 0,
      icon: Users,
      description: 'Total de estudiantes registrados',
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'Estudiantes Activos',
      value: stats?.active ?? 0,
      icon: UserCheck,
      description: 'Estudiantes actualmente activos',
      iconColor: 'text-green-600',
      iconBgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: 'Estudiantes Graduados',
      value: stats?.graduated ?? 0,
      icon: GraduationCap,
      description: 'Estudiantes que se han graduado',
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statsData.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

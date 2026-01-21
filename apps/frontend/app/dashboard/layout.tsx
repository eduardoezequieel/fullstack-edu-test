import { DashboardSidebar } from '@/features/dashboard/components/DashboardSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}

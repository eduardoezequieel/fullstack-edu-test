'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookUser, Home, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/lib/http';

const navigationItems = [
  {
    title: 'Inicio',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Estudiantes',
    href: '/dashboard/students',
    icon: BookUser,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove(AUTH_COOKIE_NAME);
    router.push('/');
  };

  return (
    <aside className="bg-background fixed top-0 left-0 h-screen w-64 border-r">
      <div className="flex h-full flex-col">
        {/* Logo/Header */}
        <div className="border-b p-6">
          <h2 className="text-xl font-bold">App</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t p-4">
          <button
            onClick={handleLogout}
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </aside>
  );
}

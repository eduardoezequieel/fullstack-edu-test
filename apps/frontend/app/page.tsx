import { LoginForm } from '@/features/auth/components/LoginForm';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <LoginForm />
    </div>
  );
}

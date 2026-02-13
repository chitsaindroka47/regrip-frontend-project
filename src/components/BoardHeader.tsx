import { LogOut, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const BoardHeader = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
      <div className="flex items-center gap-2">
        <LayoutDashboard size={20} className="text-primary" />
        <h1 className="text-lg font-semibold text-foreground">Kanban</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden sm:block">{user}</span>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default BoardHeader;

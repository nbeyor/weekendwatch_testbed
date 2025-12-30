import Link from 'next/link';
import { LayoutDashboard, Heart, Plug, Settings } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Admin header */}
      <header className="border-b-2 border-black p-4">
        <div className="admin-container flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">WeekendWatch Admin</h1>
            <p className="text-xs text-gray-dark">Health Data & Integration Console</p>
          </div>
          <Link href="/" className="text-sm underline">
            Exit Admin
          </Link>
        </div>
      </header>

      <div className="admin-container flex gap-4 py-4">
        {/* Sidebar */}
        <aside className="w-48 flex-shrink-0">
          <nav className="space-y-1 border-2 border-black">
            <NavLink href="/admin" icon={LayoutDashboard}>
              Dashboard
            </NavLink>
            <NavLink href="/admin/health" icon={Heart}>
              Health Data
            </NavLink>
            <NavLink href="/admin/integrations" icon={Plug}>
              Integrations
            </NavLink>
            <NavLink href="/admin/settings" icon={Settings}>
              Settings
            </NavLink>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

function NavLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 p-3 border-b border-black last:border-b-0 hover:bg-hatch-pattern transition-all"
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{children}</span>
    </Link>
  );
}

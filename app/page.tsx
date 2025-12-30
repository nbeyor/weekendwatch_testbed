import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-md w-full space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">WeekendWatch V1</h1>
          <p className="text-sm text-gray-dark">
            Monochrome e-ink smartwatch web app with admin console
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/watch" className="btn-primary block text-center">
            Launch Watch Interface
          </Link>
          <Link href="/admin" className="btn-secondary block text-center">
            Open Admin Console
          </Link>
        </div>

        <div className="border-t border-black pt-4">
          <p className="text-xs text-gray-dark">
            <strong>Watch interface:</strong> Optimized for 360×360 viewport
            <br />
            <strong>Admin console:</strong> Desktop-optimized dashboard
          </p>
        </div>
      </div>
    </div>
  );
}

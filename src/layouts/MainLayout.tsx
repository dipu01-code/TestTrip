import { Outlet } from '@tanstack/react-router';
import { Navbar } from '@/components/Navbar.js';
import { Footer } from '@/components/Footer.js';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
import { Link, Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    // <main> sekarang memiliki header dan area konten yang terpisah
    <main className="min-h-screen w-full flex flex-col">
      <header>
        <nav className="w-full flex justify-start px-4 md:px-8 items-center h-16 bg-white border-b">
          {/* brand */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold hover:cursor-pointer flex-shrink-0"
          >
            NovoGuard
          </Link>
        </nav>
      </header>

      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
        <Outlet />
      </div>
    </main>
  );
};

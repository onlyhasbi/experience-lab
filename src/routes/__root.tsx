import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { Sidebar } from "../layout/sidebar";

export const Route = createRootRoute({
  notFoundComponent: () => <NotFound />,
  component: () => <Root />,
});

function Root() {
  const navigation = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Person",
      path: "/person",
    },
    { label: "Currency", path: "/currency" },
    { label: "Form Issue", path: "/form" },
  ];

  return (
    <div className="w-full min-h-screen flex">
      <div className="min-w-[250px] bg-slate-50 py-4">
        <Link to="/" className="block text-2xl text-center font-semibold">
          Testry
        </Link>
        <Sidebar navigation={navigation} />
      </div>
      <div className="w-full h-full min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-3 text-center">
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="tracking-wider text-xs">
          The page you trying to open, not found
        </p>
      </div>
    </div>
  );
}

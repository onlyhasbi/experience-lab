import { Link } from '@tanstack/react-router';
import clsx from 'clsx';

export const Sidebar = ({ navigation }: { navigation: Array<{ label: string; path: string }> }) => (
  <ul className="my-3 flex flex-col">
    {navigation.map(({ label, path }) => (
      <Link
        key={path}
        to={path}
        className={clsx(
          'text-sm px-5 py-2 border-b hover:border-b-slate-300 rounded cursor-pointer [&.active]:font-semibold'
        )}
      >
        {label}
      </Link>
    ))}
  </ul>
);

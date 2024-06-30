import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: () => {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-3xl font-semibold">Experience Lab</h2>
          <p className="tracking-wider">Muhammad Hasbi</p>
        </div>
      </div>
    );
  }
});

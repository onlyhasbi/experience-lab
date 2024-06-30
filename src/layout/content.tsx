export const ContentLayout = ({
  isLoading,
  children
}: {
  isLoading?: boolean;
  children: React.ReactNode;
}) => {
  if (isLoading) {
    return (
      <div className="bg-slate-400 w-full min-h-screen flex justify-center items-center ">
        <img className="animate-spin w-5 h-5" src="/loading.svg" alt="loading-icon" />
      </div>
    );
  }
  return <div className="flex flex-col gap-2 p-8">{children}</div>;
};

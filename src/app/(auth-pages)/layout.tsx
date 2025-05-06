export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 w-full flex-col gap-12 items-center justify-center">{children}</div>
  );
}

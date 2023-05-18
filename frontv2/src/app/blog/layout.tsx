export default function Layout({children}: {children: React.ReactNode}) {
  return <div className="bg-secondary h-[calc(100vh_-_96px)]">{children}</div>;
}

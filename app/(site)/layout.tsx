import Sidebar from "@/components/Sidebar";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="shell">
      <Sidebar />
      <main className="main">{children}</main>
    </div>
  );
}

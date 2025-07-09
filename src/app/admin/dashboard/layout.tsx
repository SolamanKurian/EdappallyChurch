import AdminAuthWrapper from "@/components/AdminAuthWrapper";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuthWrapper>{children}</AdminAuthWrapper>;
} 
import { Outlet } from "react-router-dom";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function VisitorLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

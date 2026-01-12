
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Index from "./pages/Index";
import TicketsPage from "./pages/TicketsPage";
import TicketDetailPage from "./pages/TicketDetailPage";
import NewTicketPage from "./pages/NewTicketPage";

import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import heroBackground from "@/assets/hero-background.jpg";
import "./App.css";

function AppLayout() {
  const location = useLocation();
  const showGlobalBackground = location.pathname !== "/";

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="pt-20 min-h-screen relative">
        {showGlobalBackground && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background z-10" />
            <img
              src={heroBackground}
              alt="Background"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>
        )}

        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<AdminLoginPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/tickets/new" element={<NewTicketPage />} />
            <Route path="/tickets/:id" element={<TicketDetailPage />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <AppLayout />
      </Router>
    </ThemeProvider>
  );
}

export default App;

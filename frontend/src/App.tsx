import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Invoice from "./pages/Invoice";
import InvoicePreviewModal from "./components/invoice-preview/InvoicePreviewModal";
import { useEffect } from "react";
import { useAppStore } from "./store/appStore";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthStore } from "./store/authStore";
import ProtectedRoutes from "./components/layout/ProtectedRoutes";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthSkeleton } from "./components/ui/skeleton/AuthSkeleton";

const queryClient = new QueryClient();

function AppRoutes() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.add("no-transitions");
    document.documentElement.classList.toggle("dark", theme === "dark");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove("no-transitions");
      });
    });
  }, [theme]);

  return (
    <TooltipProvider>
      <Routes location={backgroundLocation || location}>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/invoices/new" element={<Invoice />} />
          <Route path="/invoices/:id/edit" element={<Invoice />} />
          <Route
            path="/invoices/:id/preview"
            element={<InvoicePreviewModal />}
          />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path="/invoices/:id/preview"
            element={<InvoicePreviewModal />}
          />
        </Routes>
      )}
    </TooltipProvider>
  );
}

function App() {
  const { initializeAuth, isAuthLoading } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  if (isAuthLoading) return <AuthSkeleton />;
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

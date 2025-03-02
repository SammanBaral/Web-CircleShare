import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import { AuthContext, AuthProvider } from "./context/AuthContext";
import CategoriesManagement from "./core/private/categoriesManagement";
import Dashboard from "./core/private/dashboard";
import ItemManagement from "./core/private/itemManagement";
import Layout from "./core/private/layout";
import UserManagement from "./core/private/userManagement";
import ForgotPassword from "./core/public/auth/ForgotPassword";
import LoginPage from "./core/public/auth/Login";
import Register from "./core/public/auth/Register";
import ResetPasswordPage from "./core/public/auth/ResetPassword";
import AboutPage from "./core/public/components/AboutPage";
import ContactPage from "./core/public/components/ContactPage";
import ServicesPage from "./core/public/components/ServicesPage";
import AddItemPage from "./core/public/home/AddItemPage";
import AdminDashboard from "./core/public/home/AdminPage"; // Import AdminDashboard
import EditItemPage from "./core/public/home/EditItemPage"; // Import EditItemPage
import HomePage from "./core/public/home/Home";
import HowItWorksPage from "./core/public/home/HowItWorksPage"; // Import HowItWorksPage
import ItemDetail from "./core/public/home/ItemDetail";
import PetDetailsPage from "./core/public/home/pet_details";
import ProfilePage from "./core/public/home/ProfilePage";
import SearchPage from "./core/public/home/SearchPage";

const queryClient = new QueryClient();

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return element;
};

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/services", element: <ServicesPage /> },
  { path: "/pet/:id", element: <PetDetailsPage /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/add-item", element: <AddItemPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/item/:id", element: <ItemDetail /> },
  { path: "/edit-item/:id", element: <EditItemPage /> }, // Add route for EditItemPage
  { path: "/how-it-works", element: <HowItWorksPage /> }, // Add route for HowItWorksPage
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} />, // Only logged-in users can access
  },
  {
    path: "/admin",
    element: <ProtectedRoute element={<Layout />} />, // Remove role check for admin access
    children: [
      { path: "admin", element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <AdminDashboard /> }, // Use AdminDashboard here
      { path: "user-management", element: <UserManagement /> },
      { path: "categories-management", element: <CategoriesManagement /> },
      { path: "item-management", element: <ItemManagement /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
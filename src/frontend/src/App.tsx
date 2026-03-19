import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WhatsAppButton from "./components/WhatsAppButton";
import { InternetIdentityProvider } from "./hooks/useInternetIdentity";
import { useSeedData } from "./hooks/useQueries";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Countries from "./pages/Countries";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";

const queryClient = new QueryClient();

function RootLayout() {
  useSeedData();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster richColors position="top-right" />
    </div>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: Services,
});
const countriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/countries",
  component: Countries,
});
const testimonialsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/testimonials",
  component: Testimonials,
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: Blog,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  servicesRoute,
  countriesRoute,
  testimonialsRoute,
  blogRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <InternetIdentityProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </InternetIdentityProvider>
  );
}

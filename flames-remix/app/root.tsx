import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useMatches,
  useRouteError,
} from "@remix-run/react";
import "./tailwind.css";
import { useEffect } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1F2937" />
        <link rel="manifest" href="/resources/manifest.json" />
        <Meta />
        <Links />
      </head>
      <body>
        <NavBar />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function NavBar() {
  return (
    <nav className="bg-gray-800 p-2">
      <div className="container flex flex-row items-start mx-auto space-x-10">
        <div className="text-white text-xl font-bold">
          <img
            className="h-10 w-auto"
            src="/flames.png"
            alt="Flames Animation App"
          />
        </div>
        <div className="hidden md:flex space-x-10">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/animations" className="text-white">
            Animations
          </Link>
          <Link to="/about" className="text-white">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const location = useLocation();
  const matches = useMatches();
  let isMount = true;

  useEffect(() => {
    const mounted = isMount;
    isMount = false;

    if ("serviceWorker" in navigator) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller?.postMessage({
          type: "REMIX_NAVIGATION",
          isMount: mounted,
          location,
          matches,
          manifest: window.__remixManifest,
        });
      } else {
        const listener = async () => {
          await navigator.serviceWorker.ready;
          navigator.serviceWorker.controller?.postMessage({
            type: "REMIX_NAVIGATION",
            isMount: mounted,
            location,
            matches,
            manifest: window.__remixManifest,
          });
        };
        navigator.serviceWorker.addEventListener("controllerchange", listener);
        return () => {
          navigator.serviceWorker.removeEventListener(
            "controllerchange",
            listener
          );
        };
      }
    }
  }, [location]);

  return <Outlet />;
}

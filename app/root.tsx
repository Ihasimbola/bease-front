import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { useEffect, useState } from "react";
import { RoleService } from "./services/RoleService";
import * as Prismic from "@prismicio/client";

type RoleContextType = {
  _id: string;
  attribute: string;
};

export async function clientLoader() {
  const client = Prismic.createClient("bease", {
    accessToken:
      "MC5hTVFXMHhNQUFDUUFneUd6.b--_vSNz77-9RO-_vSnvv71V77-9Q--_ve-_ve-_vSIMSWpW77-9IyHvv73vv73vv73vv71NE--_ve-_ve-_vQ",
  });
  const pubData = await client.getByType("pub");
  const socialMediaLinks = await client.getByType("social_media_links");

  try {
    const roles: any[] = await RoleService.getRoles();
    const connecetedUserRole = JSON.parse(localStorage.getItem("user")!).user
      .role;

    const role = roles.find((role) => role._id === connecetedUserRole);

    return {
      data: role,
      error: null,
      pubData,
      socialMediaLinks,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  const [role, setRole] = useState(loaderData?.data?.attribute);
  useEffect(() => {
    setRole(loaderData?.data?.attribute);
  }, [loaderData?.data?.attribute]);
  return (
    <Outlet
      context={{
        role,
        pubData: loaderData?.pubData,
        socialMediaLinks: loaderData?.socialMediaLinks,
      }}
    />
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error?.response?.data?.message || "Une erreur est survenue";
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

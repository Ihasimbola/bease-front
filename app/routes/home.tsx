import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Dashboard from "./dashboard/Dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bease | Basketball" },
    {
      name: "description",
      content: "Bienvenue sur l' application Bease basketball",
    },
  ];
}

export default function Home() {
  return <Dashboard />;
}

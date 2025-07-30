import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route('planning', "./routes/planning/Planning.tsx"),
  route('club', "./routes/club/Club.tsx"),
  route('membre', "./routes/membre/Membre.tsx"),
] satisfies RouteConfig;

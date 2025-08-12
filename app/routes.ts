import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    layout('./layouts/AppLayouts.tsx', [
      index("routes/home.tsx"),
      route('planning', "./routes/planning/Planning.tsx"),
      route('club', "./routes/club/Club.tsx"),
      route('club/edit/:id', "./routes/club/EditClub.tsx"),
      route('membre', "./routes/membre/Membre.tsx"),
    ]),
  

  ...prefix("auth", [
      layout("./layouts/AuthLayout.tsx", [
      route('login', "./routes/auth/Login.tsx"),
      route('register', "./routes/auth/Signup.tsx")
    ])
  ])
  
] satisfies RouteConfig;

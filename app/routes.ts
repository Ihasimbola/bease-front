import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    layout('./layouts/AppLayouts.tsx', [
      index("routes/home.tsx"),
      route('planning', "./routes/planning/Planning.tsx"),
      route('club', "./routes/club/Club.tsx"),
      route('club/create', "./routes/club/CreateClub.tsx"),
      route('club/edit/:id', "./routes/club/EditClub.tsx", [
        route('create-category', "./routes/club/CreateCategory.tsx"),
        route('create-subteam', "./routes/club/CreateSubteam.tsx"),
        route('destroy-subteam', "./routes/club/RemoveSubteam.tsx"),
        route('destroy-category', "./routes/club/RemoveCategory.tsx"),
      ]),
      route('membre', "./routes/membre/Membre.tsx", [
        route('import-excel', "./routes/membre/ImportExcelDialog.tsx"),
      ]),
    ]),
  

  ...prefix("auth", [
      layout("./layouts/AuthLayout.tsx", [
      route('login', "./routes/auth/Login.tsx"),
      route('register', "./routes/auth/Signup.tsx")
    ])
  ])
  
] satisfies RouteConfig;

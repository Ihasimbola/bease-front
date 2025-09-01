import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    layout('./layouts/AppLayouts.tsx', [
      index("routes/home.tsx"),
      route('planning', "./routes/planning/Planning.tsx", [
        route('import-match', "./routes/planning/ImportMatchExcelDialog.tsx"),
        route('assign-post', "./routes/planning/AssignPost.tsx"),
        route('confirm-delete', "./routes/planning/ConfirmDeletePost.tsx"),
        route('confirm-delete-match', "./routes/planning/section/match/ConfirmDeleteMatch.tsx")
      ]),
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
        route('add-member', "./routes/membre/AddMemberDialog.tsx"),
        route('delete-member/:id', './routes/membre/ConfirmationDialog.tsx'),
        route('edit-member/:id', './routes/membre/EditMemberDialog.tsx'),
      ]),
    ]),
  

  ...prefix("auth", [
      layout("./layouts/AuthLayout.tsx", [
      route('login', "./routes/auth/Login.tsx"),
      route('register', "./routes/auth/Signup.tsx"),
      route('change-password', "./routes/auth/ChangePassword.tsx"),
      route('change-password-request', "./routes/auth/SendMail.tsx"),
    ])
  ]),

  route('confirm', "./routes/auth/Confirm.tsx"),
  
] satisfies RouteConfig;

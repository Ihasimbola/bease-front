import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    layout('./layouts/AppLayouts.tsx', [
      index("routes/home.tsx"),
      route('planning', "./routes/planning/Planning.tsx", [
        route('import-match', "./routes/planning/ImportMatchExcelDialog.tsx"),
        route('assign-post', "./routes/planning/AssignPost.tsx"),
        route('confirm-delete', "./routes/planning/ConfirmDeletePost.tsx"),
        route('confirm-delete-match', "./routes/planning/section/match/ConfirmDeleteMatch.tsx"),
        route('assign-invitation', "./routes/planning/section/match/SendAssingInvitationMail.tsx"),
        route('create-match', "./routes/planning/pages/create-match/CreateMatch.tsx"),
        route('delete-selected', "./routes/planning/section/match/ConfirmDeleteAll.tsx"),
      ]),

      // routes planning for super admin
      route("planning/clubs", "./routes/planning/super_admin/AllClub.tsx", [
        index('./routes/planning/super_admin/ClubList.tsx'),
        route('details/:id', "./routes/planning/super_admin/ClubDetails.tsx", [
          route("import-match", "./routes/planning/super_admin/ImportExcel.tsx"),
          route('create-match', "./routes/planning/super_admin/CreateMatch.tsx"),
          
        ]),
      ]),

      // routes club for super admin
      route('club', "./routes/club/Club.tsx"),
      route('club/all', "./routes/club/super_admin/AllClubs.tsx", [
        index("./routes/club/super_admin/ClubList.tsx"),
        route('details/:id', "./routes/club/super_admin/ClubDetails.tsx"),
      ]),
      route('club/create', "./routes/club/CreateClub.tsx"),
      route('club/edit/:id', "./routes/club/EditClub.tsx", [
        route('create-category', "./routes/club/CreateCategory.tsx"),
        route('create-subteam', "./routes/club/CreateSubteam.tsx"),
        route('create-subname', "./routes/club/CreateSubname.tsx"),
        route('destroy-subteam', "./routes/club/RemoveSubteam.tsx"),
        route('destroy-category', "./routes/club/RemoveCategory.tsx"),
        route('destroy-subname', "./routes/club/RemoveSubname.tsx"),
      ]),
      route('membre', "./routes/membre/Membre.tsx", [
        route('import-excel', "./routes/membre/ImportExcelDialog.tsx"),
        route('add-member', "./routes/membre/AddMemberDialog.tsx"),
        route('delete-member/:id', './routes/membre/ConfirmationDialog.tsx'),
        route('edit-member/:id', './routes/membre/EditMemberDialog.tsx'),
        route('excel-model', "./routes/excel_model/model.tsx"),

      ]),

      // routes membre for super admin
      route('membre/clubs', "./routes/membre/super_admin/AllClubs.tsx", [
        index('./routes/membre/super_admin/ClubList.tsx'),
        route('details/:id', "./routes/membre/super_admin/AllMemberClub.tsx"),
      ]),

      route('profile', "./routes/profile/Profile.tsx"),
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

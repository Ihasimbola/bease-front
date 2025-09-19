import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { RoleService } from "~/services/RoleService";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(date: Date) {
  let hour = date.getHours().toString();
  const minute = date.getMinutes().toString();

  // add 0 if hour is less than 10
  if(+hour < 10) {
    hour = "0" + hour;
  }

  return `${hour}:${minute}`
}

export const chekcIfSuperAdmin = async() => {
  const roles = (await RoleService.getRoles()) as {
      _id: string;
      attribute: string;
    }[];

    const userConnectedRoleId = JSON.parse(localStorage.getItem("user")!).user
      .role;

    const userConnectedRole = roles.find(
      (role) => role._id === userConnectedRoleId
    );

    return {
      isSuperAdmin: userConnectedRole?.attribute === "SUPER_ADMIN",
      userConnectedRole
    }
}

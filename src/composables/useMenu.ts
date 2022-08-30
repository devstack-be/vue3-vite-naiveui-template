import {t} from "@/i18n"
export interface MenuType {
  id: string;
  label: string;
  to?: string;
  icon?: string;
  name?: string;
  params?: { [key: string]: string };
  children?: MenuType[];
}

export const MenuItems = (): MenuType[] => {
  return [
    {
      id: "0",
      label: t("navmenu.dashboard"),
      icon: "dashboard",
      name: "home",
    },
    {
      id: "1",
      label: t("navmenu.users"),
      icon: "users",
      children: [
        { id: "2", label: t("navmenu.users.list"), name: "users" },
        { id: "3", label: t("navmenu.users.create"), name: "users.create" },
      ],
    },
  ];
}

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
      label: "Dashboard",
      icon: "dashboard",
      name: "home",
    },
    {
      id: "1",
      label: "Users",
      icon: "users",
      children: [
        { id: "2", label: "List", name: "users" },
        { id: "3", label: "Create", name: "users.create" },
      ],
    },
  ];
}

/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { Contact, Currency, User, Home } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import _ from 'lodash';
 
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { APPLICATION_ROLES, ApplicationRoleType } from "@/lib/constant";

interface NavLinkInterface {
  href: string;
  label: string;
  icon: React.ComponentType; 
  roles: ApplicationRoleType[];
}

const NAV_LINKS: NavLinkInterface[] = [
  { 
    href: "/",
    label: "Home",
    icon: Home,
    roles: []
  },
  { 
    href: "/members",
    label: "Members",
    icon: User,
    roles: [APPLICATION_ROLES.ADMIN]
  },
  { 
    href: "/donations",
    label: "Donations",
    icon: Currency,
    roles: [],
  },
  { 
    href: "/contact",
    label: "Contact",
    roles: [APPLICATION_ROLES.MANAGER],
    icon: Contact
  },
];

export default function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout, fetchUser } = useAuthStore()

  useEffect(() => {
    if (_.isEmpty(user)) {
      fetchUser(); 
    }
  }, []);

  useEffect(() => {
    const parentNavItem = NAV_LINKS.find(({ href }) => href !== "/" && pathname.startsWith(href));
    const hasAccess = _.isEmpty(parentNavItem?.roles) || parentNavItem?.roles.some(r => user?.roles?.includes(r))
    if (!hasAccess) {
      router.replace(_.isEmpty(user) ? "/login" : "/403");
    }
}, [pathname, user]);

  const navigation = useMemo(
    () =>
      NAV_LINKS.filter(
        (item) => item.roles.length === 0 || item.roles.some(r => user?.roles?.includes(r))
      ),
    [user]
  );

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                (
                  _.isEmpty(item.roles) ||
                  (!_.isEmpty(user) && item.roles.some(r => user?.roles?.includes(r)))
                ) && (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild>
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              ))}
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {_.isEmpty(user) ? 
            <Link href="/login">
              <Button className="w-full">
                  Login
              </Button>
            </Link>
          :
          <Button onClick={handleLogout}>Logout</Button>
        }
      </SidebarFooter>
    </Sidebar>
  );
}

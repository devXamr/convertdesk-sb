
import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import convertDeskBG from '../../public/convertdesklogo.png'
import React from "react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {




  return (
      <main>




          <div>
              {children}
          </div>


      </main>
  );
}

import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import convertDeskBG from '../../public/convertdesklogo.png'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div>

        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-1 items-center font-semibold">
              <Image src={convertDeskBG} alt='convert desk logo' className='w-12'/>
              <Link href={"/"} className='text-xl text-blue-950'>ConvertDesk</Link>
            </div>
            <div className='flex gap-4'>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
            <ThemeSwitcher/>
            </div>
          </div>
        </nav>


        <div className='max-w-5xl mx-auto'>
          {children}
        </div>
      </div>
    </main>
  );
}

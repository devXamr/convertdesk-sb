import {redirect} from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import DashboardPage from "@/components/dashboard-page";
import Image from "next/image";
import convertDeskBG from "@/public/convertdesklogo.png";
import {hasEnvVars} from "@/lib/utils";
import {EnvVarWarning} from "@/components/env-var-warning";
import {AuthButton} from "@/components/auth-button";
import {ThemeSwitcher} from "@/components/theme-switcher";
import React from "react";

export default async function ProtectedPage() {
  const supabase = await createClient();


  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  console.log("auth user data:", data.user)


    {/* if the user does not exist and is logging in for the first time, add the user to the User_Info table */}
  const addUserToDB = await supabase.from('User_Info').upsert({user_email: data.user.email, user_id: data.user.id}, {onConflict: 'user_email'})
  console.log('This is what adding the user results in: ', addUserToDB)



  const userInfo = await supabase.from("User_Info").select().eq("user_email", data.user.email)
    console.log("This is the user's info", userInfo)

  return (
      <div className='mt-10'>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-1 items-center font-semibold">
              <Image src={convertDeskBG} alt='convert desk logo' className='w-12'/>
              <Link href={"/"} className='text-xl text-blue-950'>ConvertDesk</Link>
            </div>
            <div className='flex gap-4'>
              {!hasEnvVars ? <EnvVarWarning/> : <AuthButton/>}
              <ThemeSwitcher/>
            </div>
          </div>
        </nav>
        <DashboardPage/>

      </div>
  );
}

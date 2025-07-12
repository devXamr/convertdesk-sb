import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import Link from "next/link";

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
      <div className='flex justify-between'>
      <div>
      <div className='text-xl font-medium'>Your Chatbots</div>
      <div className='text-gray-600 dark:text-gray-200'>Create and manage your chatbots</div>
      </div>
      <Link href='/dashboard/create-bot' className='bg-gray-200 h-fit px-4 py-2 rounded-sm border border-gray-300 hover:bg-gray-100 text-sm'>Create Bot</Link>
      </div>
      </div>
  );
}

import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center mx-auto">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              ConvertDesk
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
            <Link href='/dashboard'>Dashboard</Link>
          </div>
        </nav>

        <div className='py-40 bg-blue-50 w-full'>
          <div className='text-4xl text-center'>Your Front Desk that captures leads <span className='font-light px-4 rounded-lg mr-2 py-2 bg-blue-300'>24/7</span>.</div>
        </div>


        <div className='relative max-w-5xl'>
          <div className='w-0.5 bg-gray-100 -left-2 h-screen absolute '></div>
          <div className='w-0.5 bg-gray-100 -right-2 h-screen absolute '></div>
          <div
              className='text-left mt-16 text-gray-600 text-md bg-gray-50 px-3 py-2 rounded-md w-fit border border-dashed'>How
            it works
          </div>
          <div className='text-left text-lg mt-2 text-gray-600 px-3'>We have made managing customer service agents as
            simple as it gets.
          </div>
          <div className='grid grid-cols-3 gap-4 mt-4'>
            <div
                className='col-span-1 border rounded-lg shadow-sm py-5 px-5 bg-gradient-to-br from-blue-200 via-green-100 to-yellow-400'>
              <div className='text-lg'>Create an agent</div>
              <div className='text-gray-600 text-sm'>Just create an agent with a single click</div>
            </div>
            <div
                className='col-span-1 border rounded-lg py-5 px-5 bg-gradient-to-br from-blue-200 via-green-100 to-yellow-400 shadow-sm'>
              <div className='text-lg'>Upload knowledge base</div>
              <div className='text-gray-600 text-sm'>Your agent replies based on the knowledge it is trained on.</div>
            </div>
            <div
                className='col-span-1 border rounded-lg py-5 px-5 bg-gradient-to-br from-blue-200 via-green-100 to-yellow-400 shadow-sm'>
              <div className='text-lg'>Deploy using your preferred integration.</div>
              <div className='text-gray-600 text-sm'>Whatsapp, Slack, Wordpress, Facebook Messenger, or all at once.
              </div>
            </div>
          </div>


          <div className='mx-auto w-fit my-24 flex gap-3 items-center'>
            <div className='text-lg text-gray-800'>Deploy a chat agent within minutes.</div>
            <Link href='/auth/sign-up' className='text-lg px-4 py-1 bg-yellow-200 rounded-md'> Get Started</Link>
          </div>


          <div>
            <div
                className='text-left text-gray-600 text-md bg-gray-50 px-3 py-2 rounded-md w-fit border border-dashed mb-4'>Features
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div
                  className='col-span-1 py-10 px-10 border shadow-md bg-gradient-to-br from-blue-200 via-green-200 to-pink-200 rounded-lg'>
                <div className='text-xl font-medium'>Smart Lead Capture</div>
                <div className='text-gray-600 mt-3'>Our AI cleverly detects where it should insert a contact form and
                  captures the visitors contact
                  information.
                </div>
              </div>
              <div
                  className='col-span-1 py-10 px-10 border shadow-md bg-gradient-to-bl from-blue-200 via-green-200 to-pink-200 rounded-lg'>
                <div className='text-xl font-medium'>Appearance Settings</div>
                <div className='text-gray-600 mt-3'>Customize your chatbot according to your company&apos;s needs.</div>
              </div>
              <div
                  className='col-span-1 py-10 px-10 border shadow-md bg-gradient-to-tr from-blue-200 via-green-200 to-pink-200 rounded-lg'>
                <div className='text-xl font-medium'>Integrations</div>
                <div className='text-gray-600 mt-3'>Choose from amongst carefully picked integrations that you will need
                  for your business.
                </div>
              </div>
              <div
                  className='col-span-1 py-10 px-10 border shadow-md bg-gradient-to-tl from-blue-200 via-green-200 to-pink-200 rounded-lg'>
                <div className='text-xl font-medium'>
                  Easy to use.
                </div>
                <div className='text-gray-600 mt-3'>
                  We have chosen the best models for running the chatbots and created a simple and intuitive interface
                  that abstracts away the complicated behaviour of most AI chat agents over the configuration.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full relative py-32 mt-16 bg-blue-100'>
          <div className='w-fit mx-auto'>
            <div>
              <div></div>
              <div className=' text-4xl font-bold'>ConvertDesk</div>
            </div>
          </div>

        </div>


      </div>
    </main>
  );
}

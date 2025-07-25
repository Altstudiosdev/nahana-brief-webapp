import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='flex min-h-screen bg-black'>
      <div className='w-full md:w-1/2 flex items-center justify-center p-4 md:p-8'>
        <div className='w-full max-w-md'>
          <div className='mb-10'>
            <Link href='/' className='inline-block'>
              <h1 className='text-white text-2xl font-black tracking-tight'>
                N.H.N.
              </h1>
              <p className='text-white text-xs uppercase tracking-wider'>
                COMMUNICATIONS GROUP
              </p>
            </Link>
          </div>
          <SignIn
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'bg-white border border-black p-6',
                headerTitle: 'text-3xl font-black text-black uppercase',
                headerSubtitle: 'text-gray-700',
                formButtonPrimary:
                  'bg-black text-white font-medium py-3 px-6 uppercase tracking-wider',
                formFieldInput:
                  'border-black focus:border-[#ff9ec0] focus:outline-none',
                footerActionLink: 'text-black hover:text-gray-700 font-bold',
                socialButtonsBlockButton:
                  'border border-black hover:bg-gray-50',
              },
            }}
          />
        </div>
      </div>
      <div className='hidden md:flex md:w-1/2 bg-[#ff9ec0] items-center justify-center'>
        <div className='p-12'>
          <h2 className='text-5xl font-black uppercase leading-tight text-black mb-6'>
            We are thought leadership in unlocking exponential growth
          </h2>
          <p className='text-lg text-black'>
            For our brands and our people and our leaders regularly write and
            speak in South Africa and globally.
          </p>
        </div>
      </div>
    </div>
  );
}

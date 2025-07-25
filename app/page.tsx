import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { BriefForm } from './components/BriefForm';

export default function Home() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Navigation */}
      <nav className='bg-white py-4'>
        <div className='mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <h1 className='text-xl font-black tracking-tight'>
                N.H.N.
                <span className='block text-xs uppercase tracking-wider'>
                  COMMUNICATIONS GROUP
                </span>
              </h1>
            </div>
            <div className='flex items-center space-x-6 my-3'>
              <SignedIn>
                <UserButton afterSignOutUrl='/' />
              </SignedIn>
              <SignedOut>
                <Link
                  href='/sign-in'
                  className='text-black hover:text-gray-700 px-3 py-2 text-sm font-medium'
                >
                  Sign In
                </Link>
                <Link
                  href='/sign-up'
                  className='btn btn-primary text-sm font-medium'
                >
                  Sign Up
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <SignedOut>
          <div className='flex flex-col md:flex-row min-h-[calc(100vh-80px)]'>
            {/* Left side - Sign In */}
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 nahana-bg-black text-white'>
              <div className='w-full max-w-md'>
                <h2 className='text-5xl font-black uppercase mb-6 nahana-pink'>
                  NAHANA
                </h2>
                <h3 className='text-3xl font-black uppercase mb-6'>
                  COMMUNICATIONS
                </h3>
                <h3 className='text-3xl font-black uppercase mb-6'>GROUP</h3>
                <p className='text-lg mb-8'>
                  At Nahana Group, we believe in the imagination made real, by
                  bringing together Africa's sharpest minds.
                </p>
                <div className='flex justify-center'>
                  <Link href='/sign-in' className='btn btn-inverse'>
                    SIGN IN
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side - Get Started */}
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 nahana-bg-pink'>
              <div className='w-full max-w-md'>
                <h2 className='text-3xl font-black text-black mb-4 uppercase'>
                  WELCOME TO NAHANA BRIEF APP
                </h2>
                <p className='text-xl text-black mb-8'>
                  Transform your ideas into professionally formatted briefs
                  using AI
                </p>
                <div className='flex justify-center'>
                  <Link href='/sign-up' className='btn btn-primary'>
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <BriefForm />
        </SignedIn>
      </main>
    </div>
  );
}

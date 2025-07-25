import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { BriefForm } from './components/BriefForm';

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      {/* Navigation */}
      <nav className='bg-white shadow-md'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex items-center'>
              <h1 className='text-xl font-bold text-gray-900'>
                Nahana Brief App
              </h1>
            </div>
            <div className='flex items-center space-x-4'>
              <SignedIn>
                <UserButton afterSignOutUrl='/' />
              </SignedIn>
              <SignedOut>
                <Link
                  href='/sign-in'
                  className='text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
                >
                  Sign In
                </Link>
                <Link
                  href='/sign-up'
                  className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium'
                >
                  Sign Up
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className='flex flex-col items-center justify-center px-4 py-12'>
        <SignedOut>
          <div className='text-center max-w-2xl'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Welcome to Nahana Brief App
            </h2>
            <p className='text-xl text-gray-600 mb-8'>
              Transform your ideas into professionally formatted briefs using AI
            </p>
            <div className='flex gap-4 justify-center'>
              <Link
                href='/sign-up'
                className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors'
              >
                Get Started
              </Link>
              <Link
                href='/sign-in'
                className='bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-3 px-6 rounded-md transition-colors'
              >
                Sign In
              </Link>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div className='w-full max-w-4xl'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-900 mb-2'>
                Create Your Brief
              </h2>
              <p className='text-gray-600'>
                Enter your project details and get a professionally formatted
                brief
              </p>
            </div>
            <BriefForm />
          </div>
        </SignedIn>
      </main>
    </div>
  );
}

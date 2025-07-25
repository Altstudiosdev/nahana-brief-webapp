'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

export function BriefForm() {
  const { user } = useUser();
  const [briefInput, setBriefInput] = useState('');
  const [formattedBrief, setFormattedBrief] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isTestMode, setIsTestMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setFormattedBrief('');
    setIsTestMode(false);

    try {
      const response = await fetch('/api/brief', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ briefInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process brief');
      }

      setFormattedBrief(data.formattedBrief);
      setIsTestMode(data.testMode || false);
      setBriefInput(''); // Clear input after successful submission
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <div className='bg-white rounded-lg shadow-lg p-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6'>
          Create Your Brief
        </h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='brief'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Enter your brief details
            </label>
            <textarea
              id='brief'
              rows={6}
              className='w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none'
              placeholder='Describe your project, goals, requirements, and any other relevant information...'
              value={briefInput}
              onChange={(e) => setBriefInput(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className='bg-red-50 border-l-4 border-red-400 p-4'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-5 w-5 text-red-400'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <p className='text-sm text-red-700'>{error}</p>
                  {error.includes('n8n webhook not found') && (
                    <p className='mt-2 text-xs text-red-600'>
                      The app is currently running in test mode. To enable real
                      AI processing, please configure your n8n webhook.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <button
            type='submit'
            disabled={isLoading || !briefInput.trim()}
            className='w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            {isLoading ? (
              <span className='flex items-center justify-center'>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Generate Formatted Brief'
            )}
          </button>
        </form>

        {formattedBrief && (
          <div className='mt-8'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold text-gray-900'>
                Formatted Brief
              </h3>
              {isTestMode && (
                <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
                  Test Mode
                </span>
              )}
            </div>
            <div className='bg-gray-50 rounded-lg p-6 border border-gray-200'>
              <div className='prose max-w-none'>
                <pre className='whitespace-pre-wrap font-sans text-gray-700'>
                  {formattedBrief}
                </pre>
              </div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(formattedBrief);
                alert('Brief copied to clipboard!');
              }}
              className='mt-4 text-blue-600 hover:text-blue-700 font-medium'
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

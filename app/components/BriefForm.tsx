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
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        boxSizing: 'border-box',
        padding: '20px 0',
        margin: '0',
        backgroundColor: '#ff9ec0',
        overflow: 'auto',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        {!formattedBrief ? (
          <div
            style={{
              backgroundColor: 'white',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              padding: '40px',
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                marginBottom: '30px',
              }}
            >
              <h2
                style={{
                  fontSize: '2rem',
                  fontWeight: '900',
                  color: 'black',
                  marginBottom: '8px',
                  textAlign: 'center',
                  fontFamily: 'Arial, sans-serif',
                  letterSpacing: '-0.5px',
                }}
              >
                CREATE YOUR BRIEF
              </h2>
              <p
                style={{
                  color: '#666',
                  textAlign: 'center',
                  fontSize: '1rem',
                  maxWidth: '500px',
                  margin: '0 auto',
                }}
              >
                Transform your ideas into professionally formatted briefs using
                AI
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor='brief'
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  ENTER YOUR BRIEF DETAILS
                </label>
                <textarea
                  id='brief'
                  rows={8}
                  style={{
                    width: '100%',
                    backgroundColor: '#f9f9f9',
                    padding: '16px',
                    border: 'none',
                    resize: 'none',
                    boxSizing: 'border-box',
                    minHeight: '180px',
                    fontSize: '0.9rem',
                    color: '#333',
                  }}
                  placeholder='Describe your project, goals, requirements, and any other relevant information...'
                  value={briefInput}
                  onChange={(e) => setBriefInput(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div
                  style={{
                    backgroundColor: '#fee2e2',
                    borderLeft: '4px solid #ef4444',
                    padding: '12px',
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <div style={{ flexShrink: 0 }}>
                      <svg
                        style={{
                          height: '16px',
                          width: '16px',
                          color: '#ef4444',
                        }}
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
                    <div style={{ marginLeft: '10px' }}>
                      <p style={{ fontSize: '0.8rem', color: '#b91c1c' }}>
                        {error}
                      </p>
                      {error.includes('n8n webhook not found') && (
                        <p
                          style={{
                            marginTop: '6px',
                            fontSize: '0.7rem',
                            color: '#b91c1c',
                          }}
                        >
                          The app is currently running in test mode. To enable
                          real AI processing, please configure your n8n webhook.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '30px',
                  boxSizing: 'border-box',
                }}
              >
                <button
                  type='submit'
                  disabled={isLoading || !briefInput.trim()}
                  style={{
                    display: 'inline-block',
                    border: 'none',
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: '0',
                    padding: '12px 30px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    boxSizing: 'border-box',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  {isLoading ? (
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg
                        className='animate-spin'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        style={{
                          height: '1rem',
                          width: '1rem',
                          marginRight: '0.5rem',
                          color: 'white',
                        }}
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
                    'GET STARTED'
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: 'white',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ padding: '30px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '900',
                    color: 'black',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.5px',
                  }}
                >
                  YOUR BRIEF
                </h3>
                {isTestMode && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '3px 10px',
                      fontSize: '0.65rem',
                      fontWeight: '700',
                      backgroundColor: '#f5f5f5',
                      color: 'black',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    TEST MODE
                  </span>
                )}
              </div>
              <div
                style={{
                  backgroundColor: '#f9f9f9',
                  padding: '20px',
                  border: 'none',
                  maxHeight: '400px',
                  overflowY: 'auto',
                }}
              >
                <div>
                  <pre
                    style={{
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'Arial, sans-serif',
                      color: '#333',
                      margin: 0,
                      fontSize: '0.85rem',
                      lineHeight: '1.5',
                    }}
                  >
                    {formattedBrief}
                  </pre>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
                backgroundColor: '#f9f9f9',
                gap: '15px',
                borderTop: '1px solid #eee',
              }}
            >
              <button
                onClick={() => {
                  navigator.clipboard.writeText(formattedBrief);
                  alert('Brief copied to clipboard!');
                }}
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0',
                  padding: '10px 24px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                COPY TO CLIPBOARD
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([formattedBrief], {
                    type: 'text/plain',
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'project-brief.txt';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid black',
                  borderRadius: '0',
                  padding: '10px 24px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                DOWNLOAD
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

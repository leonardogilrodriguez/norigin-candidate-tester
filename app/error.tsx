'use client';

export default function Error({ error, reset }: {
  error: Error;
  reset: () => void;
}) {

  return (
    <div className={'popup'}>
      <h2>⚠️ Something went wrong</h2>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Retry
      </button>
    </div>
  );
}
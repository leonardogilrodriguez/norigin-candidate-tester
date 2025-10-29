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
      >
        Retry
      </button>
    </div>
  );
}
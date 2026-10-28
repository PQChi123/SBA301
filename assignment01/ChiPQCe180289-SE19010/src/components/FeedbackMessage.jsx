import { useEffect, useState } from 'react';

function FeedbackMessage({ message }) {
  const [dismissedMessage, setDismissedMessage] = useState(null);

  useEffect(() => {
    if (!message) return undefined;

    const timeoutId = window.setTimeout(() => {
      setDismissedMessage(message);
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [message]);

  if (!message || dismissedMessage === message) return null;

  const isError = message.type === 'error';

  return (
    <p
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      style={{
        padding: '10px 14px',
        margin: '0 0 16px',
        borderRadius: '4px',
        color: isError ? '#842029' : '#0f5132',
        backgroundColor: isError ? '#f8d7da' : '#d1e7dd',
        border: `1px solid ${isError ? '#f5c2c7' : '#badbcc'}`
      }}
    >
      {message.text}
    </p>
  );
}

export default FeedbackMessage;

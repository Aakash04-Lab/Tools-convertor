import { useState } from 'react';

export default function PasswordInput({ value, onChange, placeholder = 'Password', autoComplete }) {
  const [visible, setVisible] = useState(false);

  return <span className="password-field">
    <input
      placeholder={placeholder}
      type={visible ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
    />
    <button
      type="button"
      className="password-toggle"
      onClick={() => setVisible(!visible)}
      aria-label={visible ? 'Hide password' : 'Show password'}
      title={visible ? 'Hide password' : 'Show password'}
    >
      {visible ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 3l18 18" />
          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
          <path d="M9.9 4.2A10.7 10.7 0 0 1 12 4c5 0 8.5 4.1 9.7 5.8a2 2 0 0 1 0 2.4 18.7 18.7 0 0 1-2.5 3" />
          <path d="M6.4 6.5a18.5 18.5 0 0 0-4.1 3.3 2 2 0 0 0 0 2.4C3.5 13.9 7 18 12 18a10.8 10.8 0 0 0 4.3-.9" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M2.3 9.8C3.5 8.1 7 4 12 4s8.5 4.1 9.7 5.8a2 2 0 0 1 0 2.4C20.5 13.9 17 18 12 18s-8.5-4.1-9.7-5.8a2 2 0 0 1 0-2.4Z" />
          <circle cx="12" cy="11" r="3" />
        </svg>
      )}
    </button>
  </span>
}

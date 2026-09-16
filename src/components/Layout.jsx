import React from 'react';

export default function Layout({ number, title, description, children }) {
  return (
    <main className="shell">
      <header>
        <p className="eyebrow">
          UGB · DESENVOLVIMENTO WEB <span>EXERCÍCIO {number}</span>
        </p>
        <h1>{title}</h1>
        <p className="intro">{description}</p>
      </header>
      {children}
    </main>
  );
}

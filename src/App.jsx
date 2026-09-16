import React from 'react';

export default function App() {
  return <main className="shell">
    <p className="eyebrow">UGB · DESENVOLVIMENTO WEB</p>
    <h1>Exercícios em React</h1>
    <p className="intro">Cada exercício está em uma branch independente do repositório.</p>
    <section className="panel">
      <h2>Escolha a branch para executar</h2>
      <ul>
        <li><code>feat-exercicio1</code> — Sistema de caixa de mercado</li>
        <li><code>feat-exercicio2</code> — Jogo de adivinhação</li>
        <li><code>feat-exercicio3</code> — Pedra, papel e tesoura</li>
      </ul>
    </section>
  </main>;
}

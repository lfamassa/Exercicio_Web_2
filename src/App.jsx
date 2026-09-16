import React, { useState } from 'react';
import Layout from './components/Layout.jsx';

function Resultados({ valores }) {
  if (!valores)
    return (
      <p className="muted">Preencha os dois valores e clique em Calcular.</p>
    );
  const [valor1, valor2] = valores;
  const formatar = (valor) =>
    Number.isFinite(valor)
      ? valor.toLocaleString('pt-BR', { maximumFractionDigits: 10 })
      : 'Resultado fora do limite numérico';
  const operacoes = [
    ['Soma', formatar(valor1 + valor2)],
    ['Subtração', formatar(valor1 - valor2)],
    ['Multiplicação', formatar(valor1 * valor2)],
    [
      'Divisão',
      valor2 === 0
        ? 'Não é possível dividir por zero'
        : formatar(valor1 / valor2),
    ],
  ];
  return (
    <div className="results">
      {operacoes.map(([nome, resultado]) => (
        <div className="result" key={nome}>
          <span>{nome}</span>
          <strong>{resultado}</strong>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [primeiro, setPrimeiro] = useState('');
  const [segundo, setSegundo] = useState('');
  const [valores, setValores] = useState(null);
  const [erro, setErro] = useState('');

  function calcular(event) {
    event.preventDefault();
    const valor1 = Number(primeiro.trim().replace(',', '.'));
    const valor2 = Number(segundo.trim().replace(',', '.'));
    if (
      !primeiro.trim() ||
      !segundo.trim() ||
      !Number.isFinite(valor1) ||
      !Number.isFinite(valor2)
    ) {
      setErro('Preencha os dois campos com números válidos.');
      setValores(null);
      return;
    }
    setErro('');
    setValores([valor1, valor2]);
  }
  function limparResultado() {
    setValores(null);
    setErro('');
  }
  return (
    <Layout
      number="01"
      title="Caixa de mercado"
      description="Digite dois valores para calcular as quatro operações."
    >
      <section className="panel">
        <h2>Valores da compra</h2>
        <form onSubmit={calcular} noValidate>
          <div className="fields">
            <label>
              Primeiro valor
              <input
                inputMode="decimal"
                value={primeiro}
                onChange={(e) => {
                  setPrimeiro(e.target.value);
                  limparResultado();
                }}
                placeholder="Ex.: 25,50"
              />
            </label>
            <label>
              Segundo valor
              <input
                inputMode="decimal"
                value={segundo}
                onChange={(e) => {
                  setSegundo(e.target.value);
                  limparResultado();
                }}
                placeholder="Ex.: 10"
              />
            </label>
          </div>
          <div className="actions">
            <button type="submit">Calcular</button>
          </div>
          {erro && (
            <p className="error" role="alert">
              {erro}
            </p>
          )}
        </form>
      </section>
      <section className="panel" aria-live="polite" aria-label="Resultados">
        <h2>Resultados</h2>
        <Resultados valores={valores} />
      </section>
    </Layout>
  );
}

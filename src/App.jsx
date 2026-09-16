import React, { useState } from 'react';
import Layout from './components/Layout.jsx';

function gerarNumero() {
  return Math.floor(Math.random() * 100) + 1;
}

export default function App() {
  const [numeroSecreto, setNumeroSecreto] = useState(gerarNumero);
  const [palpite, setPalpite] = useState('');
  const [tentativas, setTentativas] = useState(0);
  const [mensagem, setMensagem] = useState('Qual é o seu primeiro palpite?');
  const [acertou, setAcertou] = useState(false);
  const [erro, setErro] = useState('');

  function tentar(event) {
    event.preventDefault();
    if (acertou) return;
    const numero = Number(palpite);
    if (
      !palpite.trim() ||
      !Number.isInteger(numero) ||
      numero < 1 ||
      numero > 100
    ) {
      setErro('Digite um número inteiro entre 1 e 100.');
      return;
    }
    setErro('');
    setTentativas((total) => total + 1);
    if (numero === numeroSecreto) {
      setMensagem(`Acertou! O número secreto era ${numeroSecreto}.`);
      setAcertou(true);
    } else if (numero > numeroSecreto) {
      setMensagem('Muito alto! Tente um número menor.');
    } else {
      setMensagem('Muito baixo! Tente um número maior.');
    }
    setPalpite('');
  }
  function reiniciar() {
    setNumeroSecreto(gerarNumero());
    setPalpite('');
    setTentativas(0);
    setMensagem('Novo número sorteado. Qual é o seu palpite?');
    setAcertou(false);
    setErro('');
  }
  return (
    <Layout
      number="02"
      title="Descubra o número"
      description="Tente adivinhar o número secreto entre 1 e 100."
    >
      <section className="panel">
        <h2>Faça seu palpite</h2>
        <form onSubmit={tentar} noValidate>
          <label>
            Seu palpite
            <input
              type="number"
              min="1"
              max="100"
              step="1"
              inputMode="numeric"
              value={palpite}
              disabled={acertou}
              onChange={(e) => {
                setPalpite(e.target.value);
                setErro('');
              }}
              placeholder="De 1 a 100"
            />
          </label>
          <div className="actions">
            <button type="submit" disabled={acertou}>
              Tentar
            </button>
            <button className="secondary" type="button" onClick={reiniciar}>
              Novo jogo
            </button>
          </div>
          {erro && (
            <p className="error" role="alert">
              {erro}
            </p>
          )}
        </form>
      </section>
      <section className="panel" aria-live="polite" aria-label="Progresso">
        <h2>Seu progresso</h2>
        <p className="message">{mensagem}</p>
        <p>
          Tentativas: <strong>{tentativas}</strong>
        </p>
      </section>
    </Layout>
  );
}

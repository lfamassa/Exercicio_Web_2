import React, { useState } from 'react';
import Layout from './components/Layout.jsx';

const opcoes = ['Pedra', 'Papel', 'Tesoura'];
const simbolos = ['✊', '✋', '✌️'];
const vence = { Pedra: 'Tesoura', Papel: 'Pedra', Tesoura: 'Papel' };
const placarInicial = { jogador: 0, computador: 0, empates: 0 };

function Placar({ placar }) {
  return (
    <div className="score" aria-label="Placar">
      <div className="stat">
        <span>Você</span>
        <strong>{placar.jogador}</strong>
      </div>
      <div className="stat">
        <span>Computador</span>
        <strong>{placar.computador}</strong>
      </div>
      <div className="stat">
        <span>Empates</span>
        <strong>{placar.empates}</strong>
      </div>
    </div>
  );
}

export default function App() {
  const [placar, setPlacar] = useState(placarInicial);
  const [rodada, setRodada] = useState(null);

  function jogar(jogador) {
    const computador = opcoes[Math.floor(Math.random() * opcoes.length)];
    let resultado;
    let mensagem;

    if (jogador === computador) {
      resultado = 'empates';
      mensagem = 'Empate!';
    } else if (vence[jogador] === computador) {
      resultado = 'jogador';
      mensagem = 'Você venceu!';
    } else {
      resultado = 'computador';
      mensagem = 'O computador venceu!';
    }

    setRodada({ jogador, computador, mensagem });
    setPlacar((atual) => ({ ...atual, [resultado]: atual[resultado] + 1 }));
  }
  function zerar() {
    setPlacar({ ...placarInicial });
    setRodada(null);
  }
  return (
    <Layout
      number="03"
      title="Pedra, papel e tesoura"
      description="Jogue contra o computador e acompanhe o placar."
    >
      <section className="panel">
        <h2>Qual é a sua jogada?</h2>
        <div className="choices">
          {opcoes.map((opcao, i) => (
            <button key={opcao} onClick={() => jogar(opcao)}>
              <span aria-hidden="true">{simbolos[i]}</span>
              {opcao}
            </button>
          ))}
        </div>
        <p className="muted">
          Pedra vence tesoura. Tesoura vence papel. Papel vence pedra.
        </p>
      </section>
      <section className="panel" aria-live="polite">
        <h2>Placar acumulado</h2>
        <Placar placar={placar} />
        {rodada ? (
          <div className="message">
            <strong>{rodada.mensagem}</strong>
            <br />
            Você: {rodada.jogador} · Computador: {rodada.computador}
          </div>
        ) : (
          <p className="message">Escolha uma opção para começar.</p>
        )}
        <div className="actions">
          <button className="secondary" onClick={zerar}>
            Zerar placar
          </button>
        </div>
      </section>
    </Layout>
  );
}

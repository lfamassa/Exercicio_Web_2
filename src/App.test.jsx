import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App.jsx';
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const casos = [
  ['Pedra', 0, 'Empate!', [0, 0, 1]],
  ['Pedra', 0.4, 'O computador venceu!', [0, 1, 0]],
  ['Pedra', 0.8, 'Você venceu!', [1, 0, 0]],
  ['Papel', 0, 'Você venceu!', [1, 0, 0]],
  ['Papel', 0.4, 'Empate!', [0, 0, 1]],
  ['Papel', 0.8, 'O computador venceu!', [0, 1, 0]],
  ['Tesoura', 0, 'O computador venceu!', [0, 1, 0]],
  ['Tesoura', 0.4, 'Você venceu!', [1, 0, 0]],
  ['Tesoura', 0.8, 'Empate!', [0, 0, 1]],
];
function placar() {
  return [...screen.getByLabelText('Placar').querySelectorAll('strong')].map(
    (item) => Number(item.textContent),
  );
}
it.each(casos)(
  'resolve %s contra sorteio %s',
  (jogada, random, mensagem, esperado) => {
    vi.spyOn(Math, 'random').mockReturnValue(random);
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: jogada, exact: true }));
    expect(screen.getByText(mensagem)).toBeTruthy();
    expect(placar()).toEqual(esperado);
  },
);
it('acumula rodadas e permite zerar o placar', () => {
  vi.spyOn(Math, 'random').mockReturnValue(0.8);
  render(<App />);
  for (let i = 0; i < 3; i++)
    fireEvent.click(screen.getByRole('button', { name: 'Pedra', exact: true }));
  expect(placar()).toEqual([3, 0, 0]);
  fireEvent.click(screen.getByRole('button', { name: 'Zerar placar' }));
  expect(placar()).toEqual([0, 0, 0]);
  expect(screen.getByText('Escolha uma opção para começar.')).toBeTruthy();
});

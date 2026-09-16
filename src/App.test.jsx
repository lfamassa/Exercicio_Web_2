import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App.jsx';
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function iniciar(random = 0.49) {
  vi.spyOn(Math, 'random').mockReturnValue(random);
  render(<App />);
}
function tentar(valor) {
  fireEvent.change(screen.getByLabelText('Seu palpite'), {
    target: { value: valor },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Tentar' }));
}
it('informa baixo, alto e acerto contando as tentativas', () => {
  iniciar();
  tentar('25');
  expect(screen.getByText(/Muito baixo/)).toBeTruthy();
  tentar('75');
  expect(screen.getByText(/Muito alto/)).toBeTruthy();
  tentar('50');
  expect(screen.getByText(/Acertou!/)).toBeTruthy();
  expect(screen.getByText('3', { selector: 'strong' })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Tentar' }).disabled).toBe(true);
});
it.each(['', '0', '101', '2.5'])('não conta entrada inválida %s', (valor) => {
  iniciar();
  tentar(valor);
  expect(screen.getByRole('alert')).toBeTruthy();
  expect(screen.getByText('0', { selector: 'strong' })).toBeTruthy();
});
it.each([
  [0, '1'],
  [0.99999, '100'],
])('inclui os extremos do intervalo', (random, valor) => {
  iniciar(random);
  tentar(valor);
  expect(screen.getByText(/Acertou!/)).toBeTruthy();
});
it('novo jogo sorteia novamente e reinicia contador', () => {
  iniciar();
  tentar('50');
  vi.mocked(Math.random).mockReturnValue(0);
  fireEvent.click(screen.getByRole('button', { name: 'Novo jogo' }));
  expect(screen.getByText('0', { selector: 'strong' })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Tentar' }).disabled).toBe(false);
  tentar('1');
  expect(screen.getByText(/Acertou!/)).toBeTruthy();
});

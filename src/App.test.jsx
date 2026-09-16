import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import App from './App.jsx';
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function calcular(a, b) {
  fireEvent.change(screen.getByLabelText('Primeiro valor'), {
    target: { value: a },
  });
  fireEvent.change(screen.getByLabelText('Segundo valor'), {
    target: { value: b },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Calcular' }));
}
it('calcula as quatro operações e aceita vírgula decimal', () => {
  render(<App />);
  calcular('12,5', '2');
  const resultados = screen.getByRole('region', { name: 'Resultados' });
  for (const valor of ['14,5', '10,5', '25', '6,25'])
    expect(within(resultados).getByText(valor)).toBeTruthy();
});
it('trata divisão por zero sem perder as outras operações', () => {
  render(<App />);
  calcular('10', '0');
  expect(screen.getByText('Não é possível dividir por zero')).toBeTruthy();
  expect(screen.getByText('0', { selector: 'strong' })).toBeTruthy();
});
it.each([
  ['', '2'],
  ['abc', '2'],
  ['1e999', '2'],
])('rejeita entrada inválida %s', (a, b) => {
  render(<App />);
  calcular(a, b);
  expect(screen.getByRole('alert')).toBeTruthy();
});
it('aceita negativos e limpa resultados ao editar', () => {
  render(<App />);
  calcular('-10', '2');
  expect(screen.getByText('-5')).toBeTruthy();
  fireEvent.change(screen.getByLabelText('Primeiro valor'), {
    target: { value: '3' },
  });
  expect(screen.queryByText('-5')).toBeNull();
});

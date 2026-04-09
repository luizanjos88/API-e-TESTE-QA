import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './index';

test('Deve renderizar o link para o Dashboard', () => {
  render(<Menu />, { wrapper: BrowserRouter });
  const linkDashboard = screen.getByText('Dashboard');
  expect(linkDashboard).toBeInTheDocument();
});

test('Deve renderizar uma lista com seis links', () => {
  render(<Menu />, { wrapper: BrowserRouter });
  const linksPaginaInicial = screen.getAllByRole('link');
  expect(linksPaginaInicial).toHaveLength(6);
});

test('Não deve renderizar o link de Extrato', () => {
  render(<Menu />, { wrapper: BrowserRouter });
  const linkExtrato = screen.queryByText('Extrato');
  expect(linkExtrato).not.toBeInTheDocument();
});

test('Deve renderizar os links com a classe link', () => {
  render(<Menu />, { wrapper: BrowserRouter });
  const links = screen.getAllByRole('link');
  links.forEach((link) => {
    expect(link).toHaveClass('link');
  });
  expect(links).toMatchSnapshot();
});

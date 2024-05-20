// Importamos React y el componente useState.
import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * Prueba para verificar si se renderiza el enlace "learn react".
 *
 * @retur
 * n {void}
 */
test('renders learn react link', () => {

  // Renderiza el componente App
  render(<App />);
  
  // Busca el elemento de enlace con el texto "learn react"
  const linkElement = screen.getByText(/learn react/i);
  
  // Verifica que el elemento de enlace esté presente en el documento
  expect(linkElement).toBeInTheDocument();
});

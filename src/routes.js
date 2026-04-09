import { Route, Routes } from 'react-router-dom';

import PaginaPadrao from 'paginas/PaginaPadrao';
import Home from 'paginas/Home';
import Contratos from './paginas/Home/Contratos';
import Produtos from './paginas/Home/Produtos';
import Pedidos from './paginas/Home/Pedidos';
import Cardapio from './paginas/Home/Cardapio';
import Refeicoes from './paginas/Home/Refeicoes';
import Inicio from 'paginas/Inicio';
import Pagina404 from 'paginas/Pagina404';
import { HomeProvider } from 'common/context/HomeContext';
import { CabecalhoProvider } from 'common/context/CabecalhoContext';
import { ModalProvider } from 'common/context/ModalContext';
import { MinhaConta } from 'paginas/MinhaConta';

export default function AppRoutes() {
  return (
    <HomeProvider>
      <CabecalhoProvider>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<PaginaPadrao />}>
              <Route path="/" element={<Inicio />} />
              <Route path="/home" element={<Home />}>
                <Route path="contratos" element={<Contratos />} />
                <Route path="produtos" element={<Produtos />} />
                <Route path="pedidos" element={<Pedidos />} />
                <Route path="cardapio" element={<Cardapio />} />
                <Route path="refeicoes" element={<Refeicoes />} />
              </Route>
              <Route path="/minha-conta" element={<MinhaConta />} />
            </Route>
            <Route path="*" element={<Pagina404 />} />
          </Routes>
        </ModalProvider>
      </CabecalhoProvider>
    </HomeProvider>
  );
}

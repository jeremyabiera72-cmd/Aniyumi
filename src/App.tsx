import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ShopArea } from './pages/ShopArea';
import { PreOrders } from './pages/PreOrders';
import { Contact } from './pages/Contact';
import { Pricing } from './pages/Pricing';
import { About } from './pages/About';
import { ProductDetail } from './pages/ProductDetail';
import { AdminPreOrders } from './pages/AdminPreOrders';
import { AppProvider } from './context/AppContext';
import { GlobalUI } from './components/GlobalUI';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <GlobalUI />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopArea />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/preorders" element={<PreOrders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/preorders" element={<AdminPreOrders />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Showcase from './pages/Showcase';
import Dashboard from './pages/Dashboard';
import NewsDetail from './pages/NewsDetail';
import Analyze from './pages/Analyze';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/showcase" element={<Showcase />} />
      </Routes>
    </BrowserRouter>
  );
}
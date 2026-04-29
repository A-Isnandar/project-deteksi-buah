import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import DetailPage from './pages/DetailPage';
import DatasetPage from './pages/DatasetPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/dataset" element={<DatasetPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

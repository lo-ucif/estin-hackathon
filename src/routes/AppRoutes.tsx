import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { WeeklySequence } from '../pages/WeeklySequence/WeeklySequence';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weekly" element={<WeeklySequence />} />
      </Routes>
    </BrowserRouter>
  );
};
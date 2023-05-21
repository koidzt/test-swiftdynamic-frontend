import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Test1 from './pages/Test1';
import Test3 from './pages/Test3';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/test1'} element={<Test1 />} />
        <Route path={'/test3'} element={<Test3 />} />
        <Route path="*" element={<Navigate to={'/'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

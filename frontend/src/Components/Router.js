import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Map from '../Routes/Map';
import Posting from '../Routes/Posting';

const Router = () => {
  return (
    <BrowserRouter basename="/wau">
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/posting" element={<Posting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

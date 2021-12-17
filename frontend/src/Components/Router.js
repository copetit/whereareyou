import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddPosting from '../Routes/AddPosting';
import Map from '../Routes/Map';
import Posting from '../Routes/Posting';

const Router = () => {
  return (
    <BrowserRouter basename="/wau">
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/posting" element={<Posting />} />
        <Route path="/add-posting" element={<AddPosting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

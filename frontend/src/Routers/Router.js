import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from '../Components/Main';
import Posting from '../Components/Posting';

const Router = () => {
  return (
    <BrowserRouter basename="/wau">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posting" element={<Posting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

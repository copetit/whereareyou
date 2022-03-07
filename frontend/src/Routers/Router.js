import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from '../Components/Main';
import Posting from '../Components/PostingPage/Posting';
import { Update } from '../Components/UpdatePage/Update';

const Router = () => {
  return (
    <BrowserRouter basename="/wau">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posting" element={<Posting />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

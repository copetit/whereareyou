import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

const Pages = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/about">
        <About />
      </Route>
    </Routes>
  </BrowserRouter>;
  )
};

export default Pages;

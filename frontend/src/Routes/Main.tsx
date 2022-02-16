import Header from './Header';
import Map from './Map';
import PostingButton from './PostingButton';
import PasswordChkModal from './PasswordChkModal';
import { useState } from 'react';

function Main() {
  const [showModal, setShowModal] = useState<Boolean>(false);

  return (
    <div id="container">
      <Header />
      <Map />
      {/* <PasswordChkModal isOpen={showModal} /> */}
      <PostingButton />
    </div>
  );
}

export default Main;

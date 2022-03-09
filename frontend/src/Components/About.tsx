import { Modal } from './Parts/Modal';
import redpanda from '../images/redpanda.jpg';
import eevee from '../images/eevee.png';

import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as TwitterLogo } from '../images/tw_icon.svg';
import { ReactComponent as GitLogo } from '../images/git_icon.svg';

export function About(props: any) {
  const { isOpen, setShowModal } = props;

  return (
    <Modal
      isOpen={isOpen}
      setShowModal={setShowModal}
      classList=""
      cancelBtnColor="text-white"
    >
      <div className="about-modal relative">
        <div className="bg-black flex items-center justify-evenly w-full h-1/2 ">
          <div className="h-3/4">
            <Logo />
          </div>
          <div className="text-center">
            <p className="text-white text-7xl mb-10">Where Are you</p>
            <p className="text-white">まいごのペットをみんなで探しませんか?</p>
          </div>
        </div>
        <div className="flex w-full h-1/2">
          <div className="flex items-center relative w-1/2 p-10">
            <img
              className="about-profile-img object-cover rounded-full"
              src={redpanda}
              alt="profile"
            />
            <div className="about-profile flex flex-col justify-center">
              <p className="text-3xl">Mini Redpanda</p>
            </div>
            <div className="flex items-center absolute bottom-20 right-10 space-x-6">
              <a href="#!">
                <TwitterLogo />
              </a>
              <a href="https://github.com/copetit">
                <GitLogo />
              </a>
            </div>
          </div>
          <div className="flex items-center relative w-1/2 p-10">
            <img
              className="about-profile-img object-contain rounded-full"
              src={eevee}
              alt="profile"
            />
            <div className="about-profile flex flex-col justify-center">
              <p className="text-3xl">SHY</p>
            </div>
            <div className="flex items-center absolute bottom-20 right-10">
              <a href="https://github.com/SHY-KG">
                <GitLogo />
              </a>
            </div>
          </div>
        </div>
        <small className="absolute bottom-0 right-5">&copy; wcww</small>
      </div>
    </Modal>
  );
}

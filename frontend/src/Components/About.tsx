import { Modal } from './Parts/Modal';
import { IAboutProps } from '../types/Interface';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as TwitterLogo } from '../images/tw_icon.svg';
import { ReactComponent as GitLogo } from '../images/git_icon.svg';

export function About(props: Required<IAboutProps>) {
  const { isOpen, setShowModal } = props;

  return (
    <Modal
      isOpen={isOpen}
      setShowModal={setShowModal}
      classList="about-modal"
      cancelBtnColor="text-white"
    >
      <div className="w-full h-full relative">
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
              className="about-profile-img object-cover"
              src="https://github.com/copetit.png"
              alt="profile"
            />
            <div className="about-profile">
              <p className="text-3xl">Mini Redpanda</p>
            </div>
            <div className="about-profile-sns space-x-6">
              <a
                href="https://twitter.com/mini_redpanda?s=20&t=KIy_jFkA70bNz133Wya8Rg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterLogo />
              </a>
              <a
                href="https://github.com/copetit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitLogo />
              </a>
            </div>
          </div>
          <div className="flex items-center relative w-1/2 p-10">
            <img
              className="about-profile-img object-contain"
              src="https://github.com/shhwan.png"
              alt="profile"
            />
            <div className="about-profile">
              <p className="text-3xl">shhwan</p>
            </div>
            <div className="about-profile-sns">
              <a
                href="https://github.com/shhwan"
                target="_blank"
                rel="noopener noreferrer"
              >
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

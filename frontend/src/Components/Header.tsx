import { MouseEventHandler, useState } from 'react';
import { ReactComponent as Logo } from '../images/logo.svg';
import { About } from './About';

export interface HeaderMenuListProps {
  classList: string;
  value: string;
  link: string;
  onClick: MouseEventHandler<HTMLAnchorElement>;
}

export function Header() {
  const [showModal, setShowModal] = useState<Boolean>(false);

  const onClickHandler = () => {
    setShowModal(true);
  };

  const HeaderMenuList = (props: HeaderMenuListProps) => {
    const { classList, value, link, onClick } = props;
    return (
      <li className="mr-6">
        <a
          className={`${classList} font-bold text-3xl 2xl:text-4xl`}
          href={link}
          onClick={onClick}
        >
          {value}
        </a>
      </li>
    );
  };

  return (
    <>
      <nav className="flex h-6/100 px-5 items-center justify-between bg-black">
        <a className="h-3/5" href="/wau">
          <Logo />
        </a>
        <ul className="flex">
          <HeaderMenuList
            classList="text-yellow-400 hover:text-white"
            value="About"
            link="#!"
            onClick={onClickHandler}
          />
        </ul>
      </nav>
      {showModal && <About isOpen={showModal} setShowModal={setShowModal} />}
    </>
  );
}

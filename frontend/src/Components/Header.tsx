import { ReactComponent as Logo } from '../images/logo.svg';

export function Header() {
  return (
    <nav className="flex h-8/100 px-5 items-center justify-between bg-black">
      {/* TODO dummyのリンク,デザインなので相談して内容を変える*/}
      <Logo />
      <ul className="flex">
        <li className="mr-6">
          <a
            className="text-white hover:text-yellow-400 font-semibold text-3xl"
            href="/"
          >
            List
          </a>
        </li>
        <li className="mr-6">
          <a
            className="text-yellow-400 hover:text-white font-semibold text-3xl"
            href="/"
          >
            About
          </a>
        </li>
      </ul>
    </nav>
  );
}
import { ReactComponent as Logo } from '../images/logo.svg';

export interface HeaderMenuListProps {
  classList: string;
  value: string;
  link: string;
}

export function Header() {
  const HeaderMenuList = (props: HeaderMenuListProps) => {
    const { classList, value, link } = props;
    return (
      <li className="mr-6">
        <a className={classList} href={link}>
          {value}
        </a>
      </li>
    );
  };

  return (
    <nav className="flex h-8/100 px-5 items-center justify-between bg-black">
      <a className="h-3/5" href="/wau">
        <Logo />
      </a>
      <ul className="flex">
        <HeaderMenuList
          classList="text-white hover:text-yellow-400 font-semibold text-3xl 2xl:text-4xl"
          value="List"
          link="/"
        />
        <HeaderMenuList
          classList="text-yellow-400 hover:text-white font-semibold text-3xl 2xl:text-4xl"
          value="About"
          link="/"
        />
      </ul>
    </nav>
  );
}

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
        <a
          className={`${classList} font-bold text-3xl 2xl:text-4xl`}
          href={link}
        >
          {value}
        </a>
      </li>
    );
  };

  return (
    <nav className="flex h-6/100 px-5 items-center justify-between bg-black">
      <a className="h-3/5" href="/wau">
        <Logo />
      </a>
      <ul className="flex">
        <HeaderMenuList
          classList="text-yellow-400 hover:text-white"
          value="About"
          link="/"
        />
      </ul>
    </nav>
  );
}

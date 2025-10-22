type NavLinkProps = {
  vertical?: boolean;
  onClick?: () => void;
};

const NavLink = ({ vertical = false, onClick }: NavLinkProps) => {
  const base = vertical ? "flex flex-col items-start gap-4" : "flex items-center gap-8";

  return (
    <ul className={base}>
      <li>
        <a href="#projects" className="hover:underline cursor-pointer" onClick={onClick}>
          Projects
        </a>
      </li>
      <li>
        <a href="#skills" className="hover:underline cursor-pointer" onClick={onClick}>
          Skills
        </a>
      </li>
      <li>
        <a href="#contact" className="hover:underline cursor-pointer" onClick={onClick}>
          Contact
        </a>
      </li>
      <li>
        <a href="#about-me" className="hover:underline cursor-pointer" onClick={onClick}>
          About Me
        </a>
      </li>
    </ul>
  );
};

export { NavLink };

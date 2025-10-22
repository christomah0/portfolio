const NavLink = () => {
  return (
    <ul className="flex items-center gap-12">
      <li><a href="#projects" className="hover:underline cursor-pointer">Projects</a></li>
      <li><a href="#skills" className="hover:underline cursor-pointer">Skills</a></li>
      <li><a href="#contact" className="hover:underline cursor-pointer">Contact</a></li>
      <li><a href="#about-me" className="hover:underline cursor-pointer">About Me</a></li>
    </ul>
  )
}

export { NavLink };

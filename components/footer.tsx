const Footer = () => {
  const year = new Date();

  return (
    <footer className="h-[50px] flex items-center justify-center bg-black">
      <span className="text-white">Copyright &copy; {year.getFullYear()}. Made by ❤️. Source code found on GitHub.</span>
    </footer>
  );
}

export default Footer;

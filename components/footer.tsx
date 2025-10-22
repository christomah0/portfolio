import Link from "next/link";

const Footer = () => {
  const year = new Date();

  return (
    <footer className="h-[50px] flex items-center justify-center bg-black">
      <span className="text-white">Copyright &copy; {year.getFullYear()}. Made by <span className="text-red-500">&hearts;</span>. Source code found on my <Link href={"https://github.com/christomah0"} target="_" className="underline">GitHub</Link>.</span>
    </footer>
  );
}

export default Footer;

"use client";

import { NavLink } from "./nav-link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select";

const Header = () => {
  return (
    <header className="fixed h-[50px] bg-white/30 backdrop-blur-lg w-full flex justify-center shadow-sm z-[99] border-b border-white/20">
      <nav className="flex items-center justify-between h-full container">
        <div className="flex items-center justify-between w-full">
          <a href="/" className="border border-black p-2 transition hover:bg-black hover:text-white">christomah0</a>
          <NavLink />
        </div>

        {/* Language selection */}
        <Select>
          <SelectTrigger className="ml-12">
            <SelectValue placeholder="🇬🇧" />
          </SelectTrigger>
          <SelectContent className="border-none shadow-lg text-black">
            <SelectItem value="en">🇬🇧</SelectItem>
            <SelectItem value="fr">🇨🇵</SelectItem>
          </SelectContent>
        </Select>
      </nav>
    </header>
  )
}

export default Header;

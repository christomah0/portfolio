import { FaFacebook, FaGithub, FaLinkedin, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

const SocialLink = () => {
  return (
    <div className="flex items-center justify-between gap-8 w-fit p-4">
      <a href="https://www.facebook.com/Mahalomba" target="_blank"><FaFacebook size={32} className="text-blue-700" /></a>
      <a href="https://github.com/christomah0" target="_blank"><FaGithub size={32} className="text-gray-600" /></a>
      <a href="https://www.linkedin.com/in/jean-christophe-mahalomba-45989b2a3" target="_blank"><FaLinkedin size={32} className="text-blue-500" /></a>
      <a href="https://x.com/@JeanMahalomba" target="_blank"><FaXTwitter size={32} className="text-black" /></a>
      <a href="tel:+261325620370"><FaWhatsapp size={32} className="text-green-600" target="_blank" /></a>
      <a href="mailto:christophemahalomba@gmail.com"><SiGmail size={32} className="text-black" /></a>
    </div>
  )
}

export default SocialLink;

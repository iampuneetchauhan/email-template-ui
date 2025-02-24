import { MdLogout } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
const Header = () => {
  return (
    <div className="bg-slate-900 h-10 flex items-center  text-white w-[100%]">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl ml-5">Email Template</h1>
        </div>
      <div className="mr-10 flex gap-8">
     <FaUserAlt className="text-2xl ml-5" /> 
    <MdLogout className="text-2xl ml-5" />
      </div>
    </div>
  )
}

export default Header

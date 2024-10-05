import { UserButton } from "@clerk/nextjs"
import Image from "next/image"

const Navbar = () => {
  return (
    <div>
    <div className="flex justify-between px-5">
    <div className="flex gap-5 items-center p-2">
      {/* <img alt="logo" width={130} src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/0dd6b895352303.5e95a9d65187e.jpg"/> */}
      <div className="text-4xl font-bold px-4">Fare<span className="text-yellow-500">ly</span></div>
      <div className="cursor-pointer">Home</div>
      <div className="cursor-pointer">History</div>
      <div className="cursor-pointer">Help</div>
    </div>
      <UserButton/>
    </div>
    <hr />
    </div>
  )
}

export default Navbar

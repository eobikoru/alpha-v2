import Link from "next/link"
import Image from "next/image";
export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b  border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/alp.png"
            alt="Alpha Logo"
            width={100}
            height={40}
            className="w-24"
          />
          </Link>
          <button  className="bg-green-400 text-black rounded-xl py-2 px-8 hover:bg-green-500">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}


"use client";

import {
  HomeOutlined,
  DollarCircleOutlined,
  UserOutlined,
  BellOutlined,
  CustomerServiceOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define the type for navigation links
interface LinkItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  links: LinkItem[];
}

export default function DashboardLayout({ children, links }: DashboardLayoutProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  console.log("Received links in DashboardLayout:", links);

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800">
        <div className="p-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-20%20at%2023.30.45-hQw5nRBIL0wRS9ymuII7yjiM9kAmYT.png"
            alt="Alpha Logo"
            width={100}
            height={40}
            className="w-24"
          />
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {links?.length > 0 ? (
              links?.map(({ href, icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive(href) ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {icon}
                    <span className="text-base">{label}</span> {/* Ensuring label is visible */}
                  </span>
                </Link>
              ))
            ) : (
              <p className="text-zinc-500 text-center">No links available</p>
            )}
          </div>

          <div className="mt-auto pt-8 border-t border-zinc-800 px-4 space-y-2">
            <Link
              href="/notifications"
              className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
            >
              <BellOutlined className="w-5 h-5" />
              <span className="text-base">Notifications</span>
            </Link>
            <Link
              href="/support"
              className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
            >
              <CustomerServiceOutlined className="w-5 h-5" />
              <span className="text-base">Support</span>
            </Link>
            <button className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 w-full">
              <LogoutOutlined className="w-5 h-5" />
              <span className="text-base">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search creators, categories or tools"
                className="w-full bg-zinc-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-300"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-zinc-800 px-4 py-1.5 rounded-lg text-xs font-mono text-zinc-400">
              0x7fCEB6e63D60C7CFCd6dE4eD94e1BE098A95E9e73
            </div>
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

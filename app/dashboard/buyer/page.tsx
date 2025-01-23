"use client"

import DashboardLayout from "@/src/components/layout/dashboard-layout"
import { ArrowRightOutlined } from "@ant-design/icons"
import Image from "next/image"
import { HomeOutlined, DollarCircleOutlined, UserOutlined } from "@ant-design/icons";


interface CreatorCardProps {
  name: string
  image: string
  stats: string
  sessions: number
}

function CreatorCard({ name, image, stats, sessions }: CreatorCardProps) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 hover:ring-2 hover:ring-lime-300 transition-all cursor-pointer">
      <Image src={image || "/placeholder.svg"} alt={name} width={200} height={150} className="w-full rounded-lg mb-4" />
      <h3 className="font-medium text-white mb-1">{name}</h3>
      <p className="text-sm text-zinc-400 mb-3">{stats}</p>
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        <span className="flex items-center gap-1">{sessions} Sessions booked</span>
      </div>
    </div>
  )
}

function CreatorSection({ title }: { title: string }) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          {title}
          <ArrowRightOutlined className="text-lime-300" />
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <CreatorCard
            key={i}
            name="Kamakazi"
            image="/assets/images/bnb.png"
            stats="I raised $2M in one year, with only 3 staff members"
            sessions={300}
          />
        ))}
      </div>
    </section>
  )
}

export default function Dashboard() {
  const navigationLinks = [
    { href: "/dashboard", label: "Dashboard", icon: <HomeOutlined className="w-5 h-5 text-white" /> },
    { href: "/earnings", label: "Earnings", icon: <DollarCircleOutlined className="w-5 h-5 text-white" /> },
    { href: "/profile", label: "Profile", icon: <UserOutlined className="w-5 h-5 text-white" /> },
  ];
  
  return (
    <DashboardLayout links={navigationLinks}>
      <CreatorSection title="Trending Creators" />
      <CreatorSection title="Creators In Tech" />
      <CreatorSection title="Creators In Entertainment" />
    </DashboardLayout>
  )
}

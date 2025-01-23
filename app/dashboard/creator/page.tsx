"use client"

import { useState } from "react"
import DashboardLayout from "@/src/components/layout/dashboard-layout"
import { HomeOutlined, DollarCircleOutlined, UserOutlined } from "@ant-design/icons"
import Image from "next/image"
import { Edit2, Share2, Plus, Calendar, TrendingUp, FileText, Video, ExternalLink } from "lucide-react"
import { Button, Tabs } from "antd"
import { AddToolModal } from "@/src/components/modals/add-tool-modal"
import { SetAvailabilityModal } from "@/src/components/modals/set-availability-modal"
import { AppointmentDetailsModal } from "@/src/components/modals/appointment-details-modal"
import { AllAppointmentsModal } from "@/src/components/modals/all-appointments-modal"
import { AllToolsModal } from "@/src/components/modals/all-tools-modal"

interface Appointment {
  id: string
  username: string
  time: string
  date: string
  avatar: string
  duration: string
  status: "upcoming" | "completed" | "cancelled"
  price: string
  notes?: string
}

interface Tool {
  id: string
  title: string
  description: string
  price: string
  image: string
  stats: {
    pdfs: number
    videos: number
    purchases: number
  }
}

export default function CreatorDashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const [isAddToolModalOpen, setIsAddToolModalOpen] = useState(false)
  const [isSetAvailabilityModalOpen, setIsSetAvailabilityModalOpen] = useState(false)
  const [isAllAppointmentsModalOpen, setIsAllAppointmentsModalOpen] = useState(false)
  const [isAppointmentDetailsModalOpen, setIsAppointmentDetailsModalOpen] = useState(false)
  const [isAllToolsModalOpen, setIsAllToolsModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const navigationLinks = [
    { href: "/dashboard/creator", label: "Dashboard", icon: <HomeOutlined className="w-5 h-5 text-white" /> },
    {
      href: "/dashboard/creator/profile",
      label: "Profile",
      icon: <UserOutlined className="w-5 h-5 text-white" />,
    },
    { href: "#", label: "Earnings", icon: <DollarCircleOutlined className="w-5 h-5 text-white" /> },
  ]

  const appointments: Appointment[] = [
    {
      id: "1",
      username: "Kristian234",
      time: "08:00",
      date: "Today",
      avatar: "/placeholder.svg?height=40&width=40",
      duration: "30 minutes",
      status: "upcoming",
      price: "0.1 ETH",
      notes: "Looking forward to discussing Web3 strategies.",
    },
    {
      id: "2",
      username: "Kristian234",
      time: "10:00",
      date: "Today",
      avatar: "/placeholder.svg?height=40&width=40",
      duration: "1 hour",
      status: "upcoming",
      price: "0.2 ETH",
    },
    {
      id: "3",
      username: "Kristian234",
      time: "14:00",
      date: "24 Jan",
      avatar: "/placeholder.svg?height=40&width=40",
      duration: "45 minutes",
      status: "completed",
      price: "0.15 ETH",
    },
    {
      id: "4",
      username: "Kristian234",
      time: "16:00",
      date: "24 Jan",
      avatar: "/placeholder.svg?height=40&width=40",
      duration: "30 minutes",
      status: "cancelled",
      price: "0.1 ETH",
    },
  ]

  const tools: Tool[] = [
    {
      id: "1",
      title: "Top Degen Resource",
      description:
        "The ultimate hub for degens in the Web3 space. Stay ahead of the curve with real-time alpha, expert insights, and curated guides on trading, NFTs, DeFi, and crypto trends",
      price: "300KYA",
      image: "/placeholder.svg?height=80&width=80",
      stats: {
        pdfs: 1,
        videos: 3,
        purchases: 5,
      },
    },
    {
      id: "2",
      title: "Top Degen Resource",
      description:
        "The ultimate hub for degens in the Web3 space. Stay ahead of the curve with real-time alpha, expert insights, and curated guides on trading, NFTs, DeFi, and crypto trends",
      price: "300KYA",
      image: "/placeholder.svg?height=80&width=80",
      stats: {
        pdfs: 1,
        videos: 3,
        purchases: 5,
      },
    },
  ]

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsAppointmentDetailsModalOpen(true)
    setIsAllAppointmentsModalOpen(false)
  }

  const AppointmentCard = ({ id, username, time, date, avatar }: Appointment) => (
    <div className="flex items-center justify-between bg-zinc-900/50 rounded-lg p-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Image src={avatar || "/placeholder.svg"} alt={username} width={40} height={40} className="rounded-full" />
        <span className="text-white">{username}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-zinc-400">
          <Calendar className="inline-block w-4 h-4 mr-1" />
          {date} {time}
        </div>
        <Button
          type="link"
          className="text-lime-400 hover:text-lime-500 p-0"
          onClick={() => {
            const appointment = appointments.find((a) => a.id === id)
            if (appointment) {
              handleAppointmentClick(appointment)
            }
          }}
        >
          Details
        </Button>
      </div>
    </div>
  )

  const ToolCard = ({ tool }: { tool: Tool }) => (
    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6">
      <div className="flex items-start gap-4">
        <Image
          src={tool.image || "/placeholder.svg"}
          alt={tool.title}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
          <p className="text-sm text-zinc-400 mb-4">{tool.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-zinc-400" />
                <span className="text-xs text-zinc-400">{tool.stats.pdfs} PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-zinc-400" />
                <span className="text-xs text-zinc-400">{tool.stats.videos} Videos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-lime-400">{tool.stats.purchases} Purchases</span>
              </div>
            </div>
            <span className="text-lime-400 font-medium">{tool.price}</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <DashboardLayout links={navigationLinks}>
      <div className="min-h-screen bg-black">
        {/* Banner Image */}
        <div className="relative h-48 w-full">
          <Image src="/assets/images/banner.png" alt="Profile Banner" fill className="object-cover" priority />
        </div>

        {/* Profile Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div className="flex items-end gap-6">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Profile"
                  width={160}
                  height={160}
                  className="rounded-full border-4 border-black bg-yellow-400"
                />
              </div>
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-white">Cristiano Ronaldo</h1>
              </div>
            </div>
            <div className="flex gap-3">
              {/* <Button
                type="default"
                className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-sm border-zinc-700 text-white hover:text-white"
              >
                <Edit2 className="w-4 h-4" />
                Edit profile
              </Button>
              <Button
                type="default"
                className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-sm border-zinc-700 text-white hover:text-white"
              >
                <Share2 className="w-4 h-4" />
                Share profile
              </Button> */}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-zinc-400">Total earnings</p>
              <p className="text-2xl font-bold text-white">0 USDT</p>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">0</p>
                  <p className="text-sm text-zinc-400">Buyers</p>
                </div>
                <TrendingUp className="text-lime-400" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-transparent text-zinc-400 border-none text-sm focus:outline-none"
                >
                  <option value="7d">Past 7 Days</option>
                  <option value="30d">Past 30 Days</option>
                  <option value="90d">Past 90 Days</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                type="primary"
                className="flex items-center gap-2 bg-lime-400 border-lime-400 text-black hover:bg-lime-500 hover:border-lime-500 flex-1"
                onClick={() => setIsAddToolModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Tool
              </Button>
              <Button
                type="default"
                className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-sm border-zinc-700 text-white hover:text-white flex-1"
                onClick={() => setIsSetAvailabilityModalOpen(true)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Set Availability
              </Button>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs
            defaultActiveKey="overview"
            items={[
              {
                key: "overview",
                label: "Overview",
                children: (
                  <div className="pt-6">
                    <p className="text-zinc-400">
                      ⚽ Football Legend | 🏆 5x Ballon d&apos;Or Winner | ⚽ Record-Breaker
                      <br />
                      Global icon with an unstoppable passion for football and excellence. Proud father, entrepreneur,
                      and philanthropist. Sharing moments from my journey on and off the pitch. 💪✨
                    </p>
                    <div className="flex gap-3 mt-4">
                      <a
                        href="#"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900/50 backdrop-blur-sm text-zinc-400 hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900/50 backdrop-blur-sm text-zinc-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                ),
              },
              {
                key: "reviews",
                label: "Reviews",
                children: (
                  <div className="pt-6">
                    <div className="text-center text-zinc-400">No reviews yet</div>
                  </div>
                ),
              },
            ]}
            className="w-full [&_.ant-tabs-nav]:border-b [&_.ant-tabs-nav]:border-zinc-800 [&_.ant-tabs-tab]:text-zinc-400 [&_.ant-tabs-tab-active]:text-white [&_.ant-tabs-ink-bar]:bg-lime-400"
          />

          {/* Appointments and Tools Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
            {/* Appointments Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-white">Upcoming Appointments</h2>
                  <span className="text-xs bg-zinc-800/50 backdrop-blur-sm px-2 py-1 rounded-full text-lime-400">
                    15
                  </span>
                </div>
                <Button
                  type="link"
                  className="text-lime-400 hover:text-lime-500 p-0"
                  onClick={() => setIsAllAppointmentsModalOpen(true)}
                >
                  View All
                </Button>
              </div>
              <div className="space-y-2">
                {appointments
                  .filter((a) => a.status === "upcoming")
                  .slice(0, 4)
                  .map((appointment) => (
                    <AppointmentCard key={appointment.id} {...appointment} />
                  ))}
              </div>
            </div>

            {/* Tools Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Recent Tools</h2>
                <Button
                  type="link"
                  className="text-lime-400 hover:text-lime-500 p-0"
                  onClick={() => setIsAllToolsModalOpen(true)}
                >
                  View All Tools
                </Button>
              </div>
              <div className="space-y-4">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddToolModal isOpen={isAddToolModalOpen} onClose={() => setIsAddToolModalOpen(false)} />
      <SetAvailabilityModal isOpen={isSetAvailabilityModalOpen} onClose={() => setIsSetAvailabilityModalOpen(false)} />
      <AllAppointmentsModal
        isOpen={isAllAppointmentsModalOpen}
        onClose={() => setIsAllAppointmentsModalOpen(false)}
        appointments={appointments}
        onAppointmentClick={handleAppointmentClick}
      />
      {selectedAppointment && (
        <AppointmentDetailsModal
          isOpen={isAppointmentDetailsModalOpen}
          onClose={() => setIsAppointmentDetailsModalOpen(false)}
          appointment={selectedAppointment}
        />
      )}
      <AllToolsModal isOpen={isAllToolsModalOpen} onClose={() => setIsAllToolsModalOpen(false)} tools={tools} />
    </DashboardLayout>
  )
}


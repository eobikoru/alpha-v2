"use client"

import { useState } from "react"
import { Pencil, Share2, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { Form, Input } from "antd"
import { HomeOutlined, DollarCircleOutlined, UserOutlined } from "@ant-design/icons"
import DashboardLayout from "@/src/components/layout/dashboard-layout"
const { TextArea } = Input
export interface Profile {
  name: string
  sessionRate: string
  bio: string
  github?: string
  twitter?: string
  image: string
}

const profileData = {
  name: "Cristiano Ronaldo",
  sessionRate: "",
  bio: "⭐ Football Legend | 🏆 5x Ballon d'Or Winner | ⚽ Record-Breaker\nGlobal icon with an unstoppable passion for football and excellence. Proud father, entrepreneur, and philanthropist.\nSharing moments from my journey on and off the pitch. 💪✨",
  website: "",
  twitter: "",
  image:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-23%20at%2008.35.24-rIw67upZVRt4wBqFoguplpzaeFYk56.png",
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm<Profile>()
  const navigationLinks = [
    { href: "/dashboard/creator", label: "Dashboard", icon: <HomeOutlined className="w-5 h-5 text-white" /> },
    {
      href: "/dashboard/creator/profile",
      label: "Profile",
      icon: <UserOutlined className="w-5 h-5 text-white" />,
    },
    { href: "#", label: "Earnings", icon: <DollarCircleOutlined className="w-5 h-5 text-white" /> },
  ]
  const onFinish = (values: Profile) => {
    console.log("Success:", values)
    setIsEditing(false)
  }

  return (
    <DashboardLayout links={navigationLinks}>
     
  
     <div className="relative h-48 w-full">
          <Image src="/assets/images/banner.png" alt="Profile Banner" fill className="object-cover" priority />
        </div>
      

      <div className="px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          {isEditing && (
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <Image
            src={profileData.image || "/placeholder.svg"}
            alt="Profile picture"
            width={56}
            height={56}
            className="rounded-full"
          />
          <div>
            <h1 className="text-2xl font-semibold">{profileData.name}</h1>
            <p className="text-gray-400">Set up your Alpha Experience</p>
          </div>
        </div>

        {/* Main Profile Section */}
        <div className="space-y-12  w-full">
          <div className="flex justify-center">
            <Image
              src={profileData.image || "/placeholder.svg"}
              alt="Large profile picture"
              width={160}
              height={100}
              className="rounded-full h-[11rem]"
            />
          </div>

          {!isEditing ? (
            <>
              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                >
                  <Pencil size={20} />
                  Edit profile
                </button>
                <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                  <Share2 size={20} />
                  Share profile
                </button>
              </div>

              {/* Profile Information */}
              <div className="space-y-8 mx-auto  w-[50%]">
                <div>
                  <h2 className="text-gray-400 mb-2">Name</h2>
                  <p className="text-lg">{profileData.name}</p>
                </div>

                <div>
                  <h2 className="text-gray-400 mb-2">Session time per hour</h2>
                  <p className="text-lg text-gray-400">Set a price for your session time</p>
                </div>

                <div>
                  <h2 className="text-gray-400 mb-2">Bio</h2>
                  <p className="text-lg whitespace-pre-line">{profileData.bio}</p>
                </div>

                <div>
                  <h2 className="text-gray-400 mb-2">Github</h2>
                  <p className="text-lg">{profileData.website || "-"}</p>
                </div>

                <div>
                  <h2 className="text-gray-400 mb-2">Twitter</h2>
                  <p className="text-lg">{profileData.twitter || "-"}</p>
                </div>
              </div>
            </>
          ) : (
            < div className="w-[50%] mx-auto">
              <button className="w-full py-2 px-4 mb-10 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                Upload New Picture
              </button>

              <Form form={form} initialValues={profileData} onFinish={onFinish} layout="vertical" className="space-y-6">
                <Form.Item label={<span className="text-white text-base font-normal">Name</span>} name="name">
                  <Input className="bg-[#111] border-none text-white px-4 py-3 rounded-lg text-base" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-white text-base font-normal">Session time per hour</span>}
                  name="sessionRate"
                >
                  <Input
                    className="bg-[#111] border-none text-white px-4 py-3 rounded-lg text-base"
                    placeholder="Enter price (e.g., 0.01 KAIA)"
                  />
                </Form.Item>

                <Form.Item label={<span className="text-white text-base font-normal">Bio</span>} name="bio">
                  <TextArea
                    className="bg-[#111] border-none text-white px-4 py-3 rounded-lg text-base min-h-[160px]"
                    rows={6}
                  />
                </Form.Item>

                <Form.Item label={<span className="text-white text-base font-normal">Website</span>} name="website">
                  <Input className="bg-[#111] border-none text-white px-4 py-3 rounded-lg text-base" />
                </Form.Item>

                <Form.Item label={<span className="text-white text-base font-normal">Twitter</span>} name="twitter">
                  <Input className="bg-[#111] border-none text-white px-4 py-3 rounded-lg text-base" />
                </Form.Item>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#C1F0C1] hover:bg-[#A1E0A1] text-black font-medium transition-colors"
                >
                  Save Profile
                </button>
              </Form>
            </div>
          )}
        </div>
      </div>

    </DashboardLayout>
  )
}


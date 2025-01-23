"use client";
import React from "react";
import { ArrowLeftOutlined, BulbOutlined, ShoppingOutlined, UploadOutlined, TwitterOutlined, GithubOutlined } from "@ant-design/icons";
import { Upload, Button } from "antd";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { Navbar } from "@/src/components/navbar";

export default function OnboardingFlow() {
    const router = useRouter()
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<"creator" | "buyer" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    profilePicture: null as File | null,
    twitterHandle: "",
    githubHandle: "",
  });

  const handleNext = () => {
    if (selectedRole === "creator") {
      setStep(2)
    } else if (selectedRole === "buyer") {
      // Route to buyer dashboard
      router.push("/dashboard/buyer")
    }
  }

  const handleGoToDashboard = () => {
    // Route based on selected role
    if (selectedRole === "creator") {
      router.push("/dashboard/creator")
    } else {
      router.push("/dashboard/buyer")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: e.target.files![0],
      }))
    }
  }

  const handleBack = () => {
    setStep(1);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen mt-[4rem] bg-black text-white p-6">
      <div className="mb-12">
    
      </div>

      <div className="max-w-2xl mx-auto bg-zinc-900 rounded-3xl p-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-sm bg-zinc-800 px-4 py-2 rounded-full mb-8"
        >
          <ArrowLeftOutlined className="w-4 h-4" />
          Back
        </button>

        {step === 1 ? (
          <>
            <h1 className="text-2xl font-semibold mb-12">Welcome, Just a few more stuff</h1>

            <div className="space-y-6">
              <h2 className="text-xl font-medium mb-4">Choose Your Role</h2>

              <button
                onClick={() => setSelectedRole("creator")}
                className={`w-full text-left p-6 rounded-xl transition-colors ${
                  selectedRole === "creator" ? "bg-zinc-800 ring-2 ring-lime-300" : "bg-zinc-950 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <BulbOutlined className="w-6 h-6 text-yellow-400" />
                  <span className="font-medium">I&apos;m a Creator</span>
                </div>
                <p className="text-sm text-zinc-400 pl-9">
                  Start sharing your expertise, offering tools, and monetizing your knowledge.
                </p>
              </button>

              <button
                onClick={() => setSelectedRole("buyer")}
                className={`w-full text-left p-6 rounded-xl transition-colors ${
                  selectedRole === "buyer" ? "bg-zinc-800 ring-2 ring-lime-300" : "bg-zinc-950 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <ShoppingOutlined className="w-6 h-6 text-zinc-200" />
                  <span className="font-medium">I&apos;m a Buyer</span>
                </div>
                <p className="text-sm text-zinc-400 pl-9">
                  Explore tools and book consultations to boost your Web3 journey
                </p>
              </button>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-lime-300 text-black font-medium py-4 rounded-full mt-12 hover:bg-lime-400 transition-colors"
            >
              Next
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-12">Welcome, Just a few more stuff</h1>

            <div className="space-y-8">
            <div className="space-y-2">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="What name do you want to be called?"
                  className="w-full bg-zinc-950 border-0 rounded-lg p-4 text-white placeholder:text-zinc-600"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium">Upload a profile picture</label>
                <div className="border-2 border-dashed border-zinc-800 rounded-lg p-8">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Upload className="w-8 h-8 text-lime-300 mb-2" />
                    <button className="text-lime-300">Choose File</button>
                    <p className="text-xs text-zinc-500 mt-1">Max size: 5MB</p>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Twitter Handle</label>
                <div className="relative">
                  <TwitterOutlined className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-600" />
                  <input
                    type="text"
                    placeholder="Enter your Twitter handle"
                    className="w-full bg-zinc-950 border-0 rounded-lg p-4 pl-12 text-white placeholder:text-zinc-600"
                    value={formData.twitterHandle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, twitterHandle: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Github Handle</label>
                <div className="relative">
                  <GithubOutlined className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-600" />
                  <input
                    type="text"
                    placeholder="Enter your Github handle"
                    className="w-full bg-zinc-950 border-0 rounded-lg p-4 pl-12 text-white placeholder:text-zinc-600"
                    value={formData.githubHandle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, githubHandle: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            <button   onClick={handleGoToDashboard} className="w-full bg-lime-300 text-black font-medium py-4 rounded-full mt-12 hover:bg-lime-400 transition-colors">
              Go to Dashboard
            </button>
          </>
        )}
      </div>
      <div className="flex justify-center items-center mt-8">
          <div className="w-32 h-1 bg-zinc-800 rounded-full">
            <div
              className={`h-full bg-lime-300 rounded-full transition-all duration-300 ${
                step === 1 ? "w-1/2" : "w-full"
              }`}
            />
          </div>
          <span className="text-xs text-zinc-500 ml-4">{step}/2</span>
        </div>
      </div>
    
</>
  );
}

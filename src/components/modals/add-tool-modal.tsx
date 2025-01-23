"use client"

import { Modal, Input, Upload, Button } from "antd"
import { ArrowLeft, UploadIcon } from "lucide-react"
import { useState } from "react"
import type { RcFile } from "antd/es/upload/interface"
import { SuccessModal } from "./success-modal"

const { TextArea } = Input

interface AddToolModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddToolModal({ isOpen, onClose }: AddToolModalProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", form)
    // Close the add tool modal and show success modal
    setShowSuccess(true)
    onClose()
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
  }

  const beforeUpload = (file: RcFile) => {
    const isValidFormat = file.type === "application/pdf" || file.type === "image/png"
    const isValidSize = file.size / 1024 / 1024 < 50 // 50MB

    if (!isValidFormat) {
      console.error("Only PDF and PNG files are allowed!")
      return false
    }

    if (!isValidSize) {
      console.error("File must be smaller than 50MB!")
      return false
    }

    return true
  }

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={600}
        className="[&_.ant-modal-content]:bg-zinc-900 [&_.ant-modal-content]:p-0"
        closable={false}
      >
        <div className="p-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm bg-zinc-800 px-4 py-2 rounded-full mb-6 text-white hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <h2 className="text-xl font-semibold text-white mb-2">Tools Set Up</h2>
          <p className="text-zinc-400 mb-8">
            Add tools that showcase your skills and value to your audience. You can upload templates, guides, videos,
            and more.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Tool name(s)</label>
              <Input
                placeholder="Enter the name of your tool(vs)"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-black border-zinc-800 text-white placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Tool Description</label>
              <TextArea
                placeholder="Provide a brief description of your tool(s), max 250 characters"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                maxLength={250}
                rows={4}
                className="bg-black border-zinc-800 text-white placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Upload guide for the tools</label>
              <Upload.Dragger
                beforeUpload={beforeUpload}
                className=" border-zinc-800 hover:bg-zinc-900 px-8 py-12"
              >
                <div className="text-center">
                  <UploadIcon className="w-8 h-8 text-lime-400 mx-auto mb-2" />
                  <p className="text-zinc-400 text-sm">
                    Supported formats: PDF, PNG
                    <br />
                    Max size: 50MB
                  </p>
                </div>
              </Upload.Dragger>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Price (in Kaia)</label>
              <Input
                placeholder="Enter price (e.g., 0.01 KAIA)"
                value={form.price}
                onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                className="bg-black border-zinc-800 text-white placeholder:text-zinc-600"
              />
            </div>

            <Button
              type="primary"
              onClick={handleSubmit}
              className="w-full bg-lime-400 border-lime-400 text-black hover:bg-lime-500 hover:border-lime-500 h-12 text-base font-medium"
            >
              Save And Continue
            </Button>
          </div>
        </div>
      </Modal>
      <SuccessModal isOpen={showSuccess} onClose={handleSuccessClose} />
    </>
  )
}


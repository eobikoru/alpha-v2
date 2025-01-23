"use client"

import { Modal } from "antd"
import { ArrowLeft, Calendar, Clock, DollarSign, MessageSquare } from "lucide-react"
import Image from "next/image"
export interface Appointment {
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
  
  

interface AppointmentDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: Appointment
}

export function AppointmentDetailsModal({ isOpen, onClose, appointment }: AppointmentDetailsModalProps) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={480}
      className="[&_.ant-modal-content]:bg-zinc-900 [&_.ant-modal-content]:p-0"
      closable={false}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-xl font-semibold text-white">Appointment Details</h2>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4 mb-8">
          <Image
            src={appointment.avatar || "/placeholder.svg"}
            alt={appointment.username}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h3 className="text-lg font-medium text-white">{appointment.username}</h3>
            <span
              className={`
              inline-block px-2 py-1 rounded-full text-xs
              ${
                appointment.status === "upcoming"
                  ? "bg-lime-400/20 text-lime-400"
                  : appointment.status === "completed"
                    ? "bg-blue-400/20 text-blue-400"
                    : "bg-red-400/20 text-red-400"
              }
            `}
            >
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-zinc-400">
            <Calendar className="w-5 h-5" />
            <span>{appointment.date}</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400">
            <Clock className="w-5 h-5" />
            <span>
              {appointment.time} ({appointment.duration})
            </span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400">
            <DollarSign className="w-5 h-5" />
            <span>{appointment.price}</span>
          </div>

          {appointment.notes && (
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-zinc-400">
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium text-white">Notes</span>
              </div>
              <p className="text-zinc-400 pl-8">{appointment.notes}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          {appointment.status === "upcoming" && (
            <>
              <button className="flex-1 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                Cancel Appointment
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg bg-lime-400 text-black hover:bg-lime-500 transition-colors">
                Reschedule
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}


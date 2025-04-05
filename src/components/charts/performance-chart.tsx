"use client"

import { useEffect, useRef } from "react"

interface PerformanceChartProps {
  data?: number[]
  months?: string[]
  title?: string
}

export default function PerformanceChart({
  data = [30, 15, 25, 35, 22, 30, 40, 25, 35, 55, 45, 25, 15, 35, 25, 35, 30, 40, 35, 30],
  months = ["March", "April", "May", "June"],
  title = "Best Performing Tool",
}: PerformanceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharpness
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Reset canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw the line chart
    const padding = { top: 20, right: 20, bottom: 40, left: 20 }
    const chartWidth = rect.width - padding.left - padding.right
    const chartHeight = rect.height - padding.top - padding.bottom

    // Calculate points
    const points = data.map((value, index) => {
      const x = padding.left + (index / (data.length - 1)) * chartWidth
      // Normalize the data to fit in the chart height
      const max = Math.max(...data)
      const min = Math.min(...data)
      const range = max - min
      const normalizedValue = range === 0 ? 0.5 : (value - min) / range
      const y = padding.top + chartHeight - normalizedValue * chartHeight
      return { x, y }
    })

    // Draw the line
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }

    ctx.strokeStyle = "#a3e635" // lime-400 color
    ctx.lineWidth = 2
    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(points[points.length - 1].x, padding.top + chartHeight)
    ctx.lineTo(points[0].x, padding.top + chartHeight)
    ctx.closePath()

    const gradient = ctx.createLinearGradient(0, 0, 0, chartHeight)
    gradient.addColorStop(0, "rgba(163, 230, 53, 0.3)") // lime-400 with opacity
    gradient.addColorStop(1, "rgba(163, 230, 53, 0.05)")
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw month labels
    ctx.fillStyle = "#a1a1aa" // zinc-400
    ctx.font = "14px sans-serif"
    ctx.textAlign = "center"

    const monthPositions = months.map((_, i) => padding.left + (i / (months.length - 1)) * chartWidth)

    months.forEach((month, i) => {
      ctx.fillText(month, monthPositions[i], rect.height - 10)
    })
  }, [data, months])

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-4 w-full">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="relative w-full" style={{ height: "240px" }}>
        <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
      </div>
    </div>
  )
}


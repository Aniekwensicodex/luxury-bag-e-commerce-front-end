"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useAuth } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"
import { cn } from "@/lib/utils"

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: null },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-800", icon: null },
  shipped: { label: "Shipped", color: "bg-purple-100 text-purple-800", icon: null },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800", icon: null },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: null },
}

export default function OrdersPage() {
  const { user } = useAuth()
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <Package className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-light mb-4">Sign In Required</h1>
            <p className="text-muted-foreground mb-8">
              Please sign in to view your order history
            </p>
            <Link href="/login">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Sign In
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="text-foreground">/</span>
            <Link href="/account" className="hover:text-foreground transition-colors">Account</Link>
            <span className="text-foreground">/</span>
            <span className="text-foreground">Orders</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-12">Order History</h1>

          <div className="text-center py-20 bg-card border border-border rounded-lg">
            <Package className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl font-light mb-4">Order History Coming Soon</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Your order history and detailed tracking will be available here.
            </p>
            <Link href="/shop">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

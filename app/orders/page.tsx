"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartSidebar } from "@/components/layout/cart-sidebar"
import { SearchDialog } from "@/components/layout/search-dialog"
import { useStore } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, ChevronRight, Eye, Truck, CheckCircle, Clock, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-800", icon: Package },
  shipped: { label: "Shipped", color: "bg-purple-100 text-purple-800", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle },
}

export default function OrdersPage() {
  const { user, orders } = useStore()
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const userOrders = orders.filter(order => order.userId === user?.id)

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartSidebar />
        <SearchDialog />
        
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
      <CartSidebar />
      <SearchDialog />
      
      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/account" className="hover:text-foreground transition-colors">Account</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Orders</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-12">Order History</h1>

          {userOrders.length === 0 ? (
            <div className="text-center py-20 bg-card border border-border rounded-lg">
              <Package className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
              <h2 className="text-2xl font-light mb-4">No Orders Yet</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                You haven&apos;t placed any orders yet. Start exploring our collection.
              </p>
              <Link href="/shop">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Shop Now
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {userOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon
                const isExpanded = selectedOrder === order.id

                return (
                  <div
                    key={order.id}
                    className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300"
                  >
                    {/* Order Header */}
                    <div
                      className="p-6 cursor-pointer hover:bg-muted/30 transition-colors"
                      onClick={() => setSelectedOrder(isExpanded ? null : order.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <StatusIcon className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <Badge className={cn("px-3 py-1", statusConfig[order.status].color)}>
                            {statusConfig[order.status].label}
                          </Badge>
                          <p className="font-medium text-lg">
                            ${order.total.toLocaleString()}
                          </p>
                          <ChevronRight
                            className={cn(
                              "w-5 h-5 transition-transform duration-300",
                              isExpanded && "rotate-90"
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    {isExpanded && (
                      <div className="border-t border-border p-6 animate-fade-in">
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Order Items */}
                          <div>
                            <h3 className="font-medium mb-4">Items</h3>
                            <div className="space-y-4">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                  <div className="relative w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {item.color} • Qty: {item.quantity}
                                    </p>
                                    <p className="text-sm font-medium mt-1">
                                      ${(item.price * item.quantity).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Shipping & Payment */}
                          <div className="space-y-6">
                            <div>
                              <h3 className="font-medium mb-2">Shipping Address</h3>
                              <p className="text-sm text-muted-foreground">
                                {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                                {order.shippingAddress.address}<br />
                                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                                {order.shippingAddress.country}
                              </p>
                            </div>

                            <div>
                              <h3 className="font-medium mb-2">Order Summary</h3>
                              <div className="text-sm space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Subtotal</span>
                                  <span>${order.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Shipping</span>
                                  <span>{order.shipping === 0 ? "Free" : `$${order.shipping}`}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Tax</span>
                                  <span>${order.tax.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-medium pt-2 border-t border-border">
                                  <span>Total</span>
                                  <span>${order.total.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <Link href={`/product/${order.items[0]?.slug || ""}`} className="flex-1">
                                <Button variant="outline" className="w-full">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Product
                                </Button>
                              </Link>
                              <Button variant="outline" className="flex-1">
                                Track Order
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

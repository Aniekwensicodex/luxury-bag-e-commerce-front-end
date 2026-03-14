"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useAuth } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Package, Eye, ChevronDown, ChevronUp } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import type { Order } from "@/lib/types"

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-800" },
  shipped: { label: "Shipped", color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
}

export default function AdminOrdersPage() {
  const { token } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [newStatus, setNewStatus] = useState<string>("pending")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) return

    const fetchOrders = async () => {
      try {
        const response = await fetch('https://e-commerce-api-gzg0.onrender.com/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          setOrders(Array.isArray(data) ? data : [])
        } else {
          setOrders([])
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
        setOrders([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [token])

  const filteredOrders = Array.isArray(orders) ? orders.filter((order: any) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.shippingAddress.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.shippingAddress.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.shippingAddress.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  }) : []

  const handleStatusUpdate = async () => {
    if (selectedOrder) {
      try {
        const response = await fetch(`https://e-commerce-api-gzg0.onrender.com/api/orders/${selectedOrder.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status: newStatus })
        })
        
        if (response.ok) {
          setOrders(orders.map((order: any) => 
            order.id === selectedOrder.id ? { ...order, status: newStatus } : order
          ))
          setUpdateDialogOpen(false)
          setSelectedOrder(null)
        }
      } catch (error) {
        console.error('Error updating order:', error)
      }
    }
  }

  const openUpdateDialog = (order: Order) => {
    setSelectedOrder(order)
    setNewStatus(order.status)
    setUpdateDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light tracking-tight">Orders</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track customer orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {(["all", "pending", "processing", "shipped", "delivered"] as const).map((status) => {
          const count = status === "all" 
            ? orders.length 
            : orders.filter(o => o.status === status).length
          return (
            <Card
              key={status}
              className={cn(
                "cursor-pointer transition-colors",
                statusFilter === status && "ring-2 ring-primary"
              )}
              onClick={() => setStatusFilter(status)}
            >
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground capitalize">{status}</p>
                <p className="text-2xl font-semibold mt-1">{count}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID, customer name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            All Orders ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No orders found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const isExpanded = expandedOrder === order.id

                return (
                  <div
                    key={order.id}
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    {/* Order Header */}
                    <div
                      className="p-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">
                              Order #{order.id.slice(0, 8).toUpperCase()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.shippingAddress.firstName} {order.shippingAddress.lastName} • {order.shippingAddress.email}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(order.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <Badge className={cn("px-3 py-1", statusConfig[order.status].color)}>
                            {statusConfig[order.status].label}
                          </Badge>
                          <p className="font-medium">${order.total.toLocaleString()}</p>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    {isExpanded && (
                      <div className="p-4 border-t border-border animate-fade-in">
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Items */}
                          <div className="md:col-span-2">
                            <h4 className="font-medium mb-4">Items ({order.items.length})</h4>
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                  <div className="relative w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">
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

                          {/* Shipping & Summary */}
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-medium mb-2">Shipping Address</h4>
                              <p className="text-sm text-muted-foreground">
                                {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                                {order.shippingAddress.address}<br />
                                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                                {order.shippingAddress.country}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Order Summary</h4>
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

                            <Button
                              className="w-full"
                              onClick={(e) => {
                                e.stopPropagation()
                                openUpdateDialog(order)
                              }}
                            >
                              Update Status
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Update Status Dialog */}
      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status for order #{selectedOrder?.id.slice(0, 8).toUpperCase()}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Select value={newStatus} onValueChange={(value) => setNewStatus(value as Order["status"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(statusConfig).map(([value, { label }]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStatusUpdate}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

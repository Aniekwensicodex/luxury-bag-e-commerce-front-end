"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Users, Mail, Calendar, ShoppingBag } from "lucide-react"

// Mock customers data - in production, this would come from a database
const mockCustomers = [
  {
    id: "c1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    createdAt: "2024-01-15",
    totalOrders: 5,
    totalSpent: 12500,
    lastOrder: "2024-03-01",
  },
  {
    id: "c2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    createdAt: "2024-02-20",
    totalOrders: 3,
    totalSpent: 7800,
    lastOrder: "2024-02-28",
  },
  {
    id: "c3",
    name: "Emma Williams",
    email: "emma.w@email.com",
    createdAt: "2023-11-10",
    totalOrders: 8,
    totalSpent: 24300,
    lastOrder: "2024-03-05",
  },
  {
    id: "c4",
    name: "James Miller",
    email: "j.miller@email.com",
    createdAt: "2024-01-25",
    totalOrders: 2,
    totalSpent: 4200,
    lastOrder: "2024-02-14",
  },
  {
    id: "c5",
    name: "Olivia Brown",
    email: "olivia.b@email.com",
    createdAt: "2023-12-01",
    totalOrders: 6,
    totalSpent: 15600,
    lastOrder: "2024-03-08",
  },
]

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [customers] = useState(mockCustomers)

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const totalCustomers = customers.length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)
  const avgOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light tracking-tight">Customers</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your customer base
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-3xl font-semibold mt-1">{totalCustomers}</p>
              </div>
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-semibold mt-1">${totalRevenue.toLocaleString()}</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                <p className="text-3xl font-semibold mt-1">${avgOrderValue.toFixed(0)}</p>
              </div>
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            All Customers ({filteredCustomers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No customers found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground hidden md:table-cell">Joined</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Orders</th>
                    <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground hidden lg:table-cell">Last Order</th>
                    <th className="text-right py-3 px-4 font-medium text-sm text-muted-foreground">Total Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {customer.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {customer.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {new Date(customer.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="secondary">
                          {customer.totalOrders} orders
                        </Badge>
                      </td>
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {new Date(customer.lastOrder).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-medium">${customer.totalSpent.toLocaleString()}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

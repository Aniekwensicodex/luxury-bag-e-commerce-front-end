"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/store-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {
  const { user, token } = useAuth()
  const [products, setProducts] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) return

    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch('https://e-commerce-api-gzg0.onrender.com/api/products', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (productsResponse.ok) {
          const productsData = await productsResponse.json()
          console.log('Products data:', productsData) // Debug
          setProducts(Array.isArray(productsData) ? productsData : [])
        } else {
          console.log('Products response status:', productsResponse.status)
          setProducts([])
        }

        // Fetch orders
        const ordersResponse = await fetch('https://e-commerce-api-gzg0.onrender.com/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json()
          console.log('Orders data:', ordersData) // Debug
          setOrders(Array.isArray(ordersData) ? ordersData : [])
        } else {
          console.log('Orders response status:', ordersResponse.status)
          setOrders([])
        }
      } catch (error) {
        console.error('Error fetching admin data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [token])

  // Calculate stats
  const totalRevenue = Array.isArray(orders) ? orders.reduce((sum, order) => sum + (order.total || 0), 0) : 0
  const totalOrders = Array.isArray(orders) ? orders.length : 0
  const totalProducts = Array.isArray(products) ? products.length : 0
  const pendingOrders = Array.isArray(orders) ? orders.filter(o => o.status === "pending" || o.status === "processing").length : 0

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    )
  }

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Products",
      value: totalProducts.toString(),
      change: "+2",
      trend: "up",
      icon: Package,
    },
    {
      title: "Pending Orders",
      value: pendingOrders.toString(),
      change: pendingOrders > 0 ? "Action needed" : "All clear",
      trend: pendingOrders > 0 ? "down" : "up",
      icon: Users,
    },
  ]

  const recentOrders = orders.slice(0, 5)
  const topProducts = [...products]
    .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
    .slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your store performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="flex items-center text-xs mt-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Recent Orders</CardTitle>
            <Link 
              href="/admin/orders" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No orders yet
              </p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          Order #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.items.length} items • {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">${order.total.toLocaleString()}</p>
                      <Badge
                        variant="secondary"
                        className={
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Top Products</CardTitle>
            <Link 
              href="/admin/products" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-muted-foreground w-6">
                      #{index + 1}
                    </span>
                    <div className="relative w-12 h-12 bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${product.price.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.reviews || 0} reviews
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/admin/products/new"
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Package className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">Add Product</span>
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">View Orders</span>
            </Link>
            <Link
              href="/admin/customers"
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Users className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">Manage Customers</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">View Store</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

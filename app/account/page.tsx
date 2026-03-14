'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AuthGuard } from '@/components/auth-guard';
import { useAuth, useCart } from '@/lib/store-context';
import { toast } from 'sonner';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  LogOut,
  ChevronRight,
  ShoppingBag
} from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, updateUser } = useAuth();
  const { clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Debug: Log user data to see what we're working with
  // console.log('User data in account page:', user);
  // console.log('User firstName:', user?.firstName);
  // console.log('User email:', user?.email);
  const [orders] = useState<any[]>([]);
  const [wishlist] = useState<any[]>([]);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Update user data using the updateUser function from auth context
      const updatedUser = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
      };
      
      // This will update both the backend and local state
      await updateUser(updatedUser);
      
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AuthGuard>
      <main className="min-h-screen bg-background">
        <Header />

      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif mb-2">
                Welcome, {user?.firstName || 'User'}
              </h1>
              <p className="text-muted-foreground font-sans">
                Manage your account, orders, and preferences
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="mt-4 md:mt-0 font-sans gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="overview" className="font-sans gap-2">
                <User className="h-4 w-4 hidden sm:inline" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="orders" className="font-sans gap-2">
                <Package className="h-4 w-4 hidden sm:inline" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="font-sans gap-2">
                <Heart className="h-4 w-4 hidden sm:inline" />
                Wishlist
              </TabsTrigger>
              <TabsTrigger value="settings" className="font-sans gap-2">
                <Settings className="h-4 w-4 hidden sm:inline" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-sans text-muted-foreground">
                      Total Orders
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-serif">{orders.length}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-sans text-muted-foreground">
                      Wishlist Items
                    </CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-serif">{wishlist.length}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-sans text-muted-foreground">
                      Member Since
                    </CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-serif">
                      {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-serif">Recent Orders</CardTitle>
                    <Link href="#" className="text-sm text-gold font-sans hover:underline">
                      View All
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                      <p className="text-muted-foreground font-sans mb-4">
                        You haven't placed any orders yet.
                      </p>
                      <Button asChild className="font-sans">
                        <Link href="/shop">Start Shopping</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 bg-muted rounded-sm"
                        >
                          <div>
                            <p className="font-serif">{order.id}</p>
                            <p className="text-sm text-muted-foreground font-sans">
                              {formatDate(order.createdAt)} · {order.items.length} items
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                            <p className="font-serif">{formatPrice(order.total)}</p>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Order History</CardTitle>
                  <CardDescription className="font-sans">
                    View and track all your orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                      <h3 className="font-serif text-lg mb-2">No orders yet</h3>
                      <p className="text-muted-foreground font-sans mb-6">
                        When you place your first order, it will appear here.
                      </p>
                      <Button asChild className="font-sans">
                        <Link href="/shop">Explore Collection</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-border rounded-sm p-6"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <div>
                              <p className="font-serif text-lg">{order.id}</p>
                              <p className="text-sm text-muted-foreground font-sans">
                                Placed on {formatDate(order.createdAt)}
                              </p>
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <Separator className="my-4" />
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div
                                key={`${item.product.id}-${item.selectedColor}`}
                                className="flex justify-between font-sans text-sm"
                              >
                                <span>
                                  {item.product.name} x {item.quantity}
                                </span>
                                <span>{formatPrice(item.product.price * item.quantity)}</span>
                              </div>
                            ))}
                          </div>
                          <Separator className="my-4" />
                          <div className="flex justify-between items-center">
                            <span className="font-sans">Total</span>
                            <span className="font-serif text-lg">{formatPrice(order.total)}</span>
                          </div>
                          {order.trackingNumber && (
                            <p className="text-sm text-muted-foreground font-sans mt-4">
                              Tracking: {order.trackingNumber}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">My Wishlist</CardTitle>
                  <CardDescription className="font-sans">
                    Items you've saved for later
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {wishlist.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                      <h3 className="font-serif text-lg mb-2">Your wishlist is empty</h3>
                      <p className="text-muted-foreground font-sans mb-6">
                        Save items you love by clicking the heart icon.
                      </p>
                      <Button asChild className="font-sans">
                        <Link href="/shop">Browse Collection</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlist.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          className="group"
                        >
                          <div className="aspect-[3/4] relative overflow-hidden rounded-sm bg-muted mb-3">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h3 className="font-serif group-hover:text-gold transition-colors">
                            {product.name}
                          </h3>
                          <p className="font-sans text-muted-foreground">
                            {formatPrice(product.price)}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Profile Settings</CardTitle>
                  <CardDescription className="font-sans">
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-sans">First Name</Label>
                        <Input
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                          disabled={!isEditing}
                          className="font-sans"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-sans">Last Name</Label>
                        <Input
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                          disabled={!isEditing}
                          className="font-sans"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-sans">Email</Label>
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                        className="font-sans"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-sans">Phone</Label>
                      <Input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="font-sans"
                        placeholder="Add phone number"
                      />
                    </div>
                    <div className="flex gap-3">
                      {isEditing ? (
                        <>
                          <Button onClick={handleSaveProfile} className="font-sans">
                            Save Changes
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                            className="font-sans"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => setIsEditing(true)} className="font-sans">
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Saved Addresses</CardTitle>
                  <CardDescription className="font-sans">
                    Manage your shipping and billing addresses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user?.addresses?.length === 0 ? (
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                      <p className="text-muted-foreground font-sans mb-4">
                        No saved addresses yet.
                      </p>
                      <Button variant="outline" className="font-sans">
                        Add Address
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {user?.addresses?.map((address: any) => (
                        <div
                          key={address.id}
                          className="p-4 border border-border rounded-sm"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-serif">
                                {address.firstName} {address.lastName}
                              </p>
                              <p className="text-sm text-muted-foreground font-sans">
                                {address.street}, {address.city}, {address.state} {address.zipCode}
                              </p>
                            </div>
                            {address.isDefault && (
                              <Badge variant="secondary" className="font-sans">
                                Default
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
      </main>
    </AuthGuard>
  );
}

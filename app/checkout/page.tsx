'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart, useAuth } from '@/lib/store-context';
import { toast } from 'sonner';
import { ShoppingBag, CreditCard, Lock, Truck, ChevronRight, Check } from 'lucide-react';

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'France',
  'Germany',
  'Italy',
  'Spain',
  'Australia',
  'Japan',
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const cartTotal = getCartTotal();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const shippingCost = shippingMethod === 'express' ? 35 : cartTotal >= 500 ? 0 : 25;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingCost + tax;

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-24 px-4 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/50 mb-6" />
          <h1 className="text-3xl font-serif mb-4">Your Bag is Empty</h1>
          <p className="text-muted-foreground font-sans mb-8">
            Add some items to your bag before checking out.
          </p>
          <Button asChild size="lg" className="font-sans tracking-wider">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const order = {
      id: `ORD-${Date.now()}`,
      userId: user?.id || 'guest',
      items: cart,
      subtotal: cartTotal,
      shipping: shippingCost,
      tax,
      total,
      status: 'processing' as const,
      shippingAddress: {
        id: '1',
        type: 'shipping' as const,
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        street: shippingInfo.street,
        apartment: shippingInfo.apartment,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zipCode: shippingInfo.zipCode,
        country: shippingInfo.country,
        isDefault: false,
      },
      billingAddress: {
        id: '2',
        type: 'billing' as const,
        firstName: sameAsBilling ? shippingInfo.firstName : billingInfo.firstName,
        lastName: sameAsBilling ? shippingInfo.lastName : billingInfo.lastName,
        street: sameAsBilling ? shippingInfo.street : billingInfo.street,
        apartment: sameAsBilling ? shippingInfo.apartment : billingInfo.apartment,
        city: sameAsBilling ? shippingInfo.city : billingInfo.city,
        state: sameAsBilling ? shippingInfo.state : billingInfo.state,
        zipCode: sameAsBilling ? shippingInfo.zipCode : billingInfo.zipCode,
        country: sameAsBilling ? shippingInfo.country : billingInfo.country,
        isDefault: false,
      },
      paymentMethod: paymentMethod === 'card' ? `Card ending in ${cardInfo.number.slice(-4)}` : 'PayPal',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addOrder(order);
    clearCart();
    setIsProcessing(false);
    
    toast.success('Order placed successfully!');
    router.push(`/order-confirmation?orderId=${order.id}`);
  };

  return (
    <main className="min-h-screen bg-muted">
      <Header />

      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {['Shipping', 'Payment', 'Review'].map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div className={`flex items-center gap-2 ${index + 1 <= step ? 'text-foreground' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans ${
                    index + 1 < step 
                      ? 'bg-gold text-charcoal' 
                      : index + 1 === step 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted-foreground/30'
                  }`}>
                    {index + 1 < step ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className="hidden sm:inline font-sans">{stepName}</span>
                </div>
                {index < 2 && (
                  <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-xl flex items-center gap-2">
                      <Truck className="h-5 w-5 text-gold" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="font-sans">First Name</Label>
                        <Input
                          id="firstName"
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                          className="font-sans"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="font-sans">Last Name</Label>
                        <Input
                          id="lastName"
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                          className="font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-sans">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                          className="font-sans"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-sans">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                          className="font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="street" className="font-sans">Street Address</Label>
                      <Input
                        id="street"
                        value={shippingInfo.street}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, street: e.target.value })}
                        className="font-sans"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="apartment" className="font-sans">Apartment, Suite, etc. (optional)</Label>
                      <Input
                        id="apartment"
                        value={shippingInfo.apartment}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, apartment: e.target.value })}
                        className="font-sans"
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="font-sans">City</Label>
                        <Input
                          id="city"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                          className="font-sans"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className="font-sans">State</Label>
                        <Input
                          id="state"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                          className="font-sans"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode" className="font-sans">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                          className="font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-sans">Country</Label>
                      <Select
                        value={shippingInfo.country}
                        onValueChange={(value) => setShippingInfo({ ...shippingInfo, country: value })}
                      >
                        <SelectTrigger className="font-sans">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country} className="font-sans">
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-serif text-lg mb-4">Shipping Method</h3>
                      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                        <label className="flex items-center justify-between p-4 border border-border rounded-sm cursor-pointer hover:bg-muted transition-colors">
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="standard" id="standard" />
                            <div>
                              <p className="font-sans font-medium">Standard Shipping</p>
                              <p className="text-sm text-muted-foreground font-sans">5-7 business days</p>
                            </div>
                          </div>
                          <span className="font-sans">
                            {cartTotal >= 500 ? 'Free' : formatPrice(25)}
                          </span>
                        </label>
                        <label className="flex items-center justify-between p-4 border border-border rounded-sm cursor-pointer hover:bg-muted transition-colors mt-2">
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="express" id="express" />
                            <div>
                              <p className="font-sans font-medium">Express Shipping</p>
                              <p className="text-sm text-muted-foreground font-sans">2-3 business days</p>
                            </div>
                          </div>
                          <span className="font-sans">{formatPrice(35)}</span>
                        </label>
                      </RadioGroup>
                    </div>

                    <Button
                      onClick={() => setStep(2)}
                      className="w-full font-sans tracking-wider"
                      size="lg"
                    >
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-xl flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-gold" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <label className="flex items-center gap-3 p-4 border border-border rounded-sm cursor-pointer hover:bg-muted transition-colors">
                        <RadioGroupItem value="card" id="card" />
                        <span className="font-sans">Credit / Debit Card</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-border rounded-sm cursor-pointer hover:bg-muted transition-colors mt-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <span className="font-sans">PayPal</span>
                      </label>
                    </RadioGroup>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber" className="font-sans">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardInfo.number}
                            onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                            className="font-sans"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName" className="font-sans">Name on Card</Label>
                          <Input
                            id="cardName"
                            value={cardInfo.name}
                            onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                            className="font-sans"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry" className="font-sans">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={cardInfo.expiry}
                              onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                              className="font-sans"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv" className="font-sans">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cardInfo.cvv}
                              onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                              className="font-sans"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Checkbox
                          id="sameAsBilling"
                          checked={sameAsBilling}
                          onCheckedChange={(checked) => setSameAsBilling(checked as boolean)}
                        />
                        <label htmlFor="sameAsBilling" className="font-sans text-sm cursor-pointer">
                          Billing address same as shipping
                        </label>
                      </div>

                      {!sameAsBilling && (
                        <div className="space-y-4 p-4 bg-muted rounded-sm">
                          <h4 className="font-serif">Billing Address</h4>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <Input
                              placeholder="First Name"
                              value={billingInfo.firstName}
                              onChange={(e) => setBillingInfo({ ...billingInfo, firstName: e.target.value })}
                              className="font-sans"
                            />
                            <Input
                              placeholder="Last Name"
                              value={billingInfo.lastName}
                              onChange={(e) => setBillingInfo({ ...billingInfo, lastName: e.target.value })}
                              className="font-sans"
                            />
                          </div>
                          <Input
                            placeholder="Street Address"
                            value={billingInfo.street}
                            onChange={(e) => setBillingInfo({ ...billingInfo, street: e.target.value })}
                            className="font-sans"
                          />
                          <div className="grid grid-cols-3 gap-4">
                            <Input
                              placeholder="City"
                              value={billingInfo.city}
                              onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                              className="font-sans"
                            />
                            <Input
                              placeholder="State"
                              value={billingInfo.state}
                              onChange={(e) => setBillingInfo({ ...billingInfo, state: e.target.value })}
                              className="font-sans"
                            />
                            <Input
                              placeholder="ZIP Code"
                              value={billingInfo.zipCode}
                              onChange={(e) => setBillingInfo({ ...billingInfo, zipCode: e.target.value })}
                              className="font-sans"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={() => setStep(1)}
                        variant="outline"
                        className="flex-1 font-sans"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => setStep(3)}
                        className="flex-1 font-sans tracking-wider"
                      >
                        Review Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-xl flex items-center gap-2">
                      <Check className="h-5 w-5 text-gold" />
                      Review Your Order
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Items */}
                    <div>
                      <h3 className="font-serif text-lg mb-4">Items ({cart.length})</h3>
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={`${item.product.id}-${item.selectedColor}`} className="flex gap-4">
                            <div className="relative w-20 h-24 rounded-sm overflow-hidden shrink-0">
                              <Image
                                src={item.product.images[0]}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-serif">{item.product.name}</p>
                              <p className="text-sm text-muted-foreground font-sans">
                                {item.selectedColor} · Qty: {item.quantity}
                              </p>
                              <p className="font-sans mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Shipping address */}
                    <div>
                      <h3 className="font-serif text-lg mb-2">Shipping Address</h3>
                      <p className="text-muted-foreground font-sans">
                        {shippingInfo.firstName} {shippingInfo.lastName}<br />
                        {shippingInfo.street}
                        {shippingInfo.apartment && `, ${shippingInfo.apartment}`}<br />
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                        {shippingInfo.country}
                      </p>
                    </div>

                    <Separator />

                    {/* Payment method */}
                    <div>
                      <h3 className="font-serif text-lg mb-2">Payment Method</h3>
                      <p className="text-muted-foreground font-sans">
                        {paymentMethod === 'card'
                          ? `Card ending in ${cardInfo.number.slice(-4) || '****'}`
                          : 'PayPal'}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={() => setStep(2)}
                        variant="outline"
                        className="flex-1 font-sans"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="flex-1 font-sans tracking-wider bg-gold hover:bg-gold/90 text-charcoal"
                        size="lg"
                      >
                        {isProcessing ? (
                          'Processing...'
                        ) : (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Place Order
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-32">
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Mini cart items */}
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={`${item.product.id}-${item.selectedColor}`} className="flex gap-3">
                        <div className="relative w-14 h-16 rounded-sm overflow-hidden shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-sans">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-sm line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground font-sans">{item.selectedColor}</p>
                        </div>
                        <p className="font-sans text-sm shrink-0">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2 font-sans text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="font-serif text-lg">Total</span>
                    <span className="font-serif text-xl">{formatPrice(total)}</span>
                  </div>

                  <p className="text-xs text-muted-foreground font-sans text-center flex items-center justify-center gap-1">
                    <Lock className="h-3 w-3" />
                    Secure checkout powered by Stripe
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

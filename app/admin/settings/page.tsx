"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Store, CreditCard, Truck, Mail, Globe, Shield } from "lucide-react"

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const [storeSettings, setStoreSettings] = useState({
    storeName: "MAISON ÉLÉGANCE",
    storeEmail: "contact@maisonelegance.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Fashion Avenue, New York, NY 10001",
    currency: "USD",
    taxRate: "8.5",
  })

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: "500",
    standardShippingRate: "15",
    expressShippingRate: "35",
    internationalShipping: true,
  })

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    paystackEnabled: false,
    stripePublicKey: "",
    paystackPublicKey: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    shippingUpdates: true,
    marketingEmails: false,
    lowStockAlerts: true,
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success("Settings saved successfully")
    setIsSaving(false)
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-light tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your store settings
        </p>
      </div>

      {/* Store Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Store className="w-5 h-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-lg">Store Information</CardTitle>
              <CardDescription>Basic details about your store</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                value={storeSettings.storeName}
                onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeEmail">Contact Email</Label>
              <Input
                id="storeEmail"
                type="email"
                value={storeSettings.storeEmail}
                onChange={(e) => setStoreSettings({ ...storeSettings, storeEmail: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storePhone">Phone Number</Label>
              <Input
                id="storePhone"
                value={storeSettings.storePhone}
                onChange={(e) => setStoreSettings({ ...storeSettings, storePhone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <select
                id="currency"
                value={storeSettings.currency}
                onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="NGN">NGN (₦)</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeAddress">Store Address</Label>
            <Textarea
              id="storeAddress"
              value={storeSettings.storeAddress}
              onChange={(e) => setStoreSettings({ ...storeSettings, storeAddress: e.target.value })}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxRate">Tax Rate (%)</Label>
            <Input
              id="taxRate"
              type="number"
              value={storeSettings.taxRate}
              onChange={(e) => setStoreSettings({ ...storeSettings, taxRate: e.target.value })}
              className="max-w-[200px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Shipping Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-lg">Shipping</CardTitle>
              <CardDescription>Configure shipping rates and options</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
              <Input
                id="freeShippingThreshold"
                type="number"
                value={shippingSettings.freeShippingThreshold}
                onChange={(e) => setShippingSettings({ ...shippingSettings, freeShippingThreshold: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Orders above this amount qualify for free shipping</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="standardShippingRate">Standard Shipping Rate ($)</Label>
              <Input
                id="standardShippingRate"
                type="number"
                value={shippingSettings.standardShippingRate}
                onChange={(e) => setShippingSettings({ ...shippingSettings, standardShippingRate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expressShippingRate">Express Shipping Rate ($)</Label>
              <Input
                id="expressShippingRate"
                type="number"
                value={shippingSettings.expressShippingRate}
                onChange={(e) => setShippingSettings({ ...shippingSettings, expressShippingRate: e.target.value })}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <Label htmlFor="internationalShipping">International Shipping</Label>
              <p className="text-sm text-muted-foreground">Enable shipping to international destinations</p>
            </div>
            <Switch
              id="internationalShipping"
              checked={shippingSettings.internationalShipping}
              onCheckedChange={(checked) => setShippingSettings({ ...shippingSettings, internationalShipping: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-lg">Payment Providers</CardTitle>
              <CardDescription>Configure payment gateways</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stripe */}
          <div className="p-4 border border-border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#635BFF] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div>
                  <p className="font-medium">Stripe</p>
                  <p className="text-sm text-muted-foreground">Accept credit cards worldwide</p>
                </div>
              </div>
              <Switch
                checked={paymentSettings.stripeEnabled}
                onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, stripeEnabled: checked })}
              />
            </div>
            {paymentSettings.stripeEnabled && (
              <div className="space-y-2">
                <Label htmlFor="stripePublicKey">Stripe Public Key</Label>
                <Input
                  id="stripePublicKey"
                  value={paymentSettings.stripePublicKey}
                  onChange={(e) => setPaymentSettings({ ...paymentSettings, stripePublicKey: e.target.value })}
                  placeholder="pk_live_..."
                />
              </div>
            )}
          </div>

          {/* Paystack */}
          <div className="p-4 border border-border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#00C3F7] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <div>
                  <p className="font-medium">Paystack</p>
                  <p className="text-sm text-muted-foreground">Accept payments in Africa</p>
                </div>
              </div>
              <Switch
                checked={paymentSettings.paystackEnabled}
                onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, paystackEnabled: checked })}
              />
            </div>
            {paymentSettings.paystackEnabled && (
              <div className="space-y-2">
                <Label htmlFor="paystackPublicKey">Paystack Public Key</Label>
                <Input
                  id="paystackPublicKey"
                  value={paymentSettings.paystackPublicKey}
                  onChange={(e) => setPaymentSettings({ ...paymentSettings, paystackPublicKey: e.target.value })}
                  placeholder="pk_live_..."
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-lg">Notifications</CardTitle>
              <CardDescription>Configure email notifications</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <Label>Order Confirmation</Label>
              <p className="text-sm text-muted-foreground">Send confirmation emails to customers</p>
            </div>
            <Switch
              checked={notificationSettings.orderConfirmation}
              onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, orderConfirmation: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <Label>Shipping Updates</Label>
              <p className="text-sm text-muted-foreground">Notify customers about shipping status</p>
            </div>
            <Switch
              checked={notificationSettings.shippingUpdates}
              onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, shippingUpdates: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">Send promotional emails to subscribers</p>
            </div>
            <Switch
              checked={notificationSettings.marketingEmails}
              onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, marketingEmails: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <Label>Low Stock Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified when products are running low</p>
            </div>
            <Switch
              checked={notificationSettings.lowStockAlerts}
              onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, lowStockAlerts: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  )
}

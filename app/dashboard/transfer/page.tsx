"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check, CreditCard, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for accounts
const accounts = [
  {
    id: "1",
    name: "Main Account",
    type: "Checking",
    balance: 5840.25,
    number: "•••• 4582",
  },
  {
    id: "2",
    name: "Savings",
    type: "Savings",
    balance: 12250.0,
    number: "•••• 7890",
  },
]

// Mock data for recent recipients
const recentRecipients = [
  { id: "1", name: "Sarah Johnson", accountNumber: "•••• 1234", bank: "Chase" },
  { id: "2", name: "Michael Chen", accountNumber: "•••• 5678", bank: "Bank of America" },
  { id: "3", name: "Emma Williams", accountNumber: "•••• 9012", bank: "Wells Fargo" },
]

export default function TransferPage() {
  const [step, setStep] = useState(1)
  const [transferType, setTransferType] = useState("own")
  const [formData, setFormData] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
    description: "",
    recipientName: "",
    recipientAccount: "",
    recipientBank: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      setStep(2)
      return
    }

    // Simulate API call for transfer
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)
    }, 2000)
  }

  const handleResetForm = () => {
    setStep(1)
    setIsComplete(false)
    setFormData({
      fromAccount: "",
      toAccount: "",
      amount: "",
      description: "",
      recipientName: "",
      recipientAccount: "",
      recipientBank: "",
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Transfer Money</h1>
        <p className="text-muted-foreground">Send money to your accounts or other people</p>
      </div>

      {!isComplete ? (
        <Card>
          <CardHeader>
            <CardTitle>New Transfer</CardTitle>
            <CardDescription>Fill in the details to make a transfer</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <Label>Transfer Type</Label>
                    <RadioGroup
                      defaultValue={transferType}
                      onValueChange={(value) => setTransferType(value)}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="own" id="own" className="peer sr-only" />
                        <Label
                          htmlFor="own"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <CreditCard className="mb-3 h-6 w-6" />
                          Between My Accounts
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="someone" id="someone" className="peer sr-only" />
                        <Label
                          htmlFor="someone"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowRight className="mb-3 h-6 w-6" />
                          To Someone Else
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fromAccount">From Account</Label>
                      <Select
                        value={formData.fromAccount}
                        onValueChange={(value) => handleSelectChange("fromAccount", value)}
                        required
                      >
                        <SelectTrigger id="fromAccount">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.name} ({account.number}) - ${account.balance.toLocaleString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {transferType === "own" ? (
                      <div className="space-y-2">
                        <Label htmlFor="toAccount">To Account</Label>
                        <Select
                          value={formData.toAccount}
                          onValueChange={(value) => handleSelectChange("toAccount", value)}
                          required
                        >
                          <SelectTrigger id="toAccount">
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            {accounts.map((account) => (
                              <SelectItem
                                key={account.id}
                                value={account.id}
                                disabled={account.id === formData.fromAccount}
                              >
                                {account.name} ({account.number})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="recipient">Recent Recipients</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-5 w-5">
                                    <HelpCircle className="h-4 w-4" />
                                    <span className="sr-only">Help</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Select a recent recipient or enter new details below</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Select
                            onValueChange={(value) => {
                              const recipient = recentRecipients.find((r) => r.id === value)
                              if (recipient) {
                                setFormData((prev) => ({
                                  ...prev,
                                  recipientName: recipient.name,
                                  recipientAccount: recipient.accountNumber,
                                  recipientBank: recipient.bank,
                                }))
                              }
                            }}
                          >
                            <SelectTrigger id="recipient">
                              <SelectValue placeholder="Select recipient" />
                            </SelectTrigger>
                            <SelectContent>
                              {recentRecipients.map((recipient) => (
                                <SelectItem key={recipient.id} value={recipient.id}>
                                  {recipient.name} ({recipient.accountNumber})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="recipientName">Recipient Name</Label>
                          <Input
                            id="recipientName"
                            name="recipientName"
                            value={formData.recipientName}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="recipientAccount">Account Number</Label>
                          <Input
                            id="recipientAccount"
                            name="recipientAccount"
                            value={formData.recipientAccount}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="recipientBank">Bank Name</Label>
                          <Input
                            id="recipientBank"
                            name="recipientBank"
                            value={formData.recipientBank}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-muted-foreground">$</span>
                        </div>
                        <Input
                          id="amount"
                          name="amount"
                          type="number"
                          min="0.01"
                          step="0.01"
                          placeholder="0.00"
                          className="pl-8"
                          value={formData.amount}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="What's this transfer for?"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <h3 className="text-lg font-medium mb-4">Confirm Transfer Details</h3>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">From:</dt>
                        <dd className="font-medium">
                          {accounts.find((a) => a.id === formData.fromAccount)?.name || ""}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">To:</dt>
                        <dd className="font-medium">
                          {transferType === "own"
                            ? accounts.find((a) => a.id === formData.toAccount)?.name || ""
                            : formData.recipientName}
                        </dd>
                      </div>
                      {transferType === "someone" && (
                        <>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Account:</dt>
                            <dd className="font-medium">{formData.recipientAccount}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Bank:</dt>
                            <dd className="font-medium">{formData.recipientBank}</dd>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Amount:</dt>
                        <dd className="font-medium">${Number.parseFloat(formData.amount).toFixed(2)}</dd>
                      </div>
                      {formData.description && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Description:</dt>
                          <dd className="font-medium">{formData.description}</dd>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Date:</dt>
                        <dd className="font-medium">{new Date().toLocaleDateString()}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Fee:</dt>
                        <dd className="font-medium">$0.00</dd>
                      </div>
                      <div className="pt-3 border-t flex justify-between">
                        <dt className="font-medium">Total:</dt>
                        <dd className="font-bold">${Number.parseFloat(formData.amount).toFixed(2)}</dd>
                      </div>
                    </dl>
                  </div>
                </motion.div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2">
            {step === 1 ? (
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                Continue
              </Button>
            ) : (
              <>
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit" className="w-full sm:w-auto" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Confirm Transfer"}
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6 pb-4 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-emerald-100 p-3">
                  <Check className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Transfer Successful!</h2>
              <p className="text-muted-foreground mb-6">
                Your transfer of ${Number.parseFloat(formData.amount).toFixed(2)} has been processed successfully.
              </p>
              <div className="rounded-lg border bg-muted/50 p-4 text-left mb-6">
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Transaction ID:</dt>
                    <dd className="font-medium">TRX-{Math.random().toString(36).substring(2, 10).toUpperCase()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Date & Time:</dt>
                    <dd className="font-medium">{new Date().toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Status:</dt>
                    <dd className="font-medium text-emerald-600">Completed</dd>
                  </div>
                </dl>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="w-full sm:w-auto" onClick={handleResetForm}>
                New Transfer
              </Button>
              <Button className="w-full sm:w-auto">View Receipt</Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

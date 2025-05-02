"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown, CreditCard, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AccountCard } from "@/components/account-card"
import { TransactionItem } from "@/components/transaction-item"

// Mock data for accounts
const accounts = [
  {
    id: "1",
    name: "Main Account",
    type: "Checking",
    balance: 5840.25,
    number: "•••• 4582",
    currency: "USD",
  },
  {
    id: "2",
    name: "Savings",
    type: "Savings",
    balance: 12250.0,
    number: "•••• 7890",
    currency: "USD",
  },
  {
    id: "3",
    name: "Investment",
    type: "Investment",
    balance: 8640.75,
    number: "•••• 1234",
    currency: "USD",
  },
]

// Mock data for cards
const cards = [
  {
    id: "1",
    name: "D-Bank Visa Platinum",
    number: "•••• •••• •••• 4582",
    expiry: "05/28",
    type: "Visa",
    color: "bg-gradient-to-r from-violet-500 to-purple-500",
  },
  {
    id: "2",
    name: "D-Bank Mastercard Gold",
    number: "•••• •••• •••• 7890",
    expiry: "11/26",
    type: "Mastercard",
    color: "bg-gradient-to-r from-amber-500 to-orange-500",
  },
]

// Mock data for transactions
const transactions = [
  {
    id: "1",
    description: "Amazon",
    amount: -59.99,
    date: "Today, 2:34 PM",
    type: "purchase",
    category: "Shopping",
  },
  {
    id: "2",
    description: "Salary Deposit",
    amount: 2850.0,
    date: "Yesterday",
    type: "deposit",
    category: "Income",
  },
  {
    id: "3",
    description: "Uber",
    amount: -24.5,
    date: "Yesterday",
    type: "purchase",
    category: "Transportation",
  },
  {
    id: "4",
    description: "Starbucks",
    amount: -5.75,
    date: "May 10, 2023",
    type: "purchase",
    category: "Food & Drink",
  },
  {
    id: "5",
    description: "Transfer to Savings",
    amount: -500.0,
    date: "May 8, 2023",
    type: "transfer",
    category: "Transfer",
  },
]

export default function AccountsPage() {
  const [activeTab, setActiveTab] = useState("accounts")
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false)
  const [isAddCardOpen, setIsAddCardOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Accounts & Cards</h1>
          <p className="text-muted-foreground">Manage your accounts, cards, and view transactions.</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Account</DialogTitle>
                <DialogDescription>Create a new account to manage your finances.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="account-name">Account Name</Label>
                  <Input id="account-name" placeholder="e.g., Travel Savings" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="account-type">Account Type</Label>
                  <Select>
                    <SelectTrigger id="account-type">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Checking</SelectItem>
                      <SelectItem value="savings">Savings</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="credit">Credit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="initial-deposit">Initial Deposit (Optional)</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-muted-foreground">$</span>
                    </div>
                    <Input id="initial-deposit" type="number" min="0" step="0.01" placeholder="0.00" className="pl-8" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddAccountOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddAccountOpen(false)}>Create Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddCardOpen} onOpenChange={setIsAddCardOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                Add Card
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Card</DialogTitle>
                <DialogDescription>Apply for a new credit or debit card.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="card-type">Card Type</Label>
                  <Select>
                    <SelectTrigger id="card-type">
                      <SelectValue placeholder="Select card type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debit">Debit Card</SelectItem>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="prepaid">Prepaid Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="linked-account">Linked Account</Label>
                  <Select>
                    <SelectTrigger id="linked-account">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} ({account.number})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="card-design">Card Design</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger id="card-design">
                      <SelectValue placeholder="Select design" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="metal">Metal Card (Premium only)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCardOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddCardOpen(false)}>Apply for Card</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="accounts" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="accounts">Bank Accounts</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>All Transactions</DropdownMenuItem>
                  <DropdownMenuItem>Deposits</DropdownMenuItem>
                  <DropdownMenuItem>Withdrawals</DropdownMenuItem>
                  <DropdownMenuItem>Transfers</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/transactions">View All Transactions</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((card) => (
              <motion.div key={card.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="overflow-hidden">
                  <div className={`p-6 text-white ${card.color}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium opacity-80">{card.type}</p>
                        <h3 className="text-xl font-bold mt-1">{card.name}</h3>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white opacity-80 hover:opacity-100 hover:bg-white/10"
                          >
                            <ChevronDown className="h-5 w-5" />
                            <span className="sr-only">Card Menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Card Options</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Lock Card</DropdownMenuItem>
                          <DropdownMenuItem>Report Lost/Stolen</DropdownMenuItem>
                          <DropdownMenuItem>Request Replacement</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-6">
                      <p className="text-sm opacity-80">Card Number</p>
                      <p className="text-xl font-mono mt-1">{card.number}</p>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <div>
                        <p className="text-xs opacity-80">VALID THRU</p>
                        <p className="font-mono">{card.expiry}</p>
                      </div>
                      <div className="h-8 w-12">
                        {card.type === "Visa" ? (
                          <div className="text-white font-bold italic text-xl">VISA</div>
                        ) : (
                          <div className="text-white font-bold text-xl">MC</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardFooter className="flex justify-between p-4">
                    <Button variant="ghost" size="sm">
                      View Transactions
                    </Button>
                    <Button variant="outline" size="sm">
                      Manage Card
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Card Management</CardTitle>
              <CardDescription>Manage your cards and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-auto py-4">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">Change PIN</span>
                    <span className="text-xs text-muted-foreground">Update your card PIN</span>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">Set Spending Limits</span>
                    <span className="text-xs text-muted-foreground">Control your card usage</span>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">Enable/Disable Online Purchases</span>
                    <span className="text-xs text-muted-foreground">Control online transaction settings</span>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">Travel Notifications</span>
                    <span className="text-xs text-muted-foreground">Notify us about your travel plans</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

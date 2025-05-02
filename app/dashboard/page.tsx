import Link from "next/link"
import { ArrowDown, ArrowUp, ArrowUpRight, DollarSign, MoreHorizontal, Plus, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function Dashboard() {
  // Calculate total balance
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Here's an overview of your finances.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Money
          </Button>
          <Button variant="outline">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Send Money
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <ArrowUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,550.00</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <ArrowDown className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,150.00</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,250.00</div>
            <p className="text-xs text-muted-foreground">+4.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Accounts</h2>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Account
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      </div>

      {/* Transactions Section */}
      <div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View all transactions</DropdownMenuItem>
                  <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                  <DropdownMenuItem>Filter transactions</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription>Your recent transactions across all accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                <TabsTrigger value="transfers">Transfers</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                {transactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </TabsContent>
              <TabsContent value="income" className="space-y-4">
                {transactions
                  .filter((t) => t.amount > 0)
                  .map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  ))}
              </TabsContent>
              <TabsContent value="expenses" className="space-y-4">
                {transactions
                  .filter((t) => t.amount < 0 && t.type !== "transfer")
                  .map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  ))}
              </TabsContent>
              <TabsContent value="transfers" className="space-y-4">
                {transactions
                  .filter((t) => t.type === "transfer")
                  .map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/transactions">View All Transactions</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

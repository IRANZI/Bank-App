"use client"

import { useState } from "react"
import { ArrowDownUp, Calendar, ChevronDown, CreditCard, Download, Filter, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TransactionItem } from "@/components/transaction-item"

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
  {
    id: "3",
    name: "Investment",
    type: "Investment",
    balance: 8640.75,
    number: "•••• 1234",
  },
]

// Mock data for transactions
const allTransactions = [
  {
    id: "1",
    description: "Amazon",
    amount: -59.99,
    date: "Today, 2:34 PM",
    type: "purchase",
    category: "Shopping",
    account: "1",
  },
  {
    id: "2",
    description: "Salary Deposit",
    amount: 2850.0,
    date: "Yesterday",
    type: "deposit",
    category: "Income",
    account: "1",
  },
  {
    id: "3",
    description: "Uber",
    amount: -24.5,
    date: "Yesterday",
    type: "purchase",
    category: "Transportation",
    account: "1",
  },
  {
    id: "4",
    description: "Starbucks",
    amount: -5.75,
    date: "May 10, 2023",
    type: "purchase",
    category: "Food & Drink",
    account: "1",
  },
  {
    id: "5",
    description: "Transfer to Savings",
    amount: -500.0,
    date: "May 8, 2023",
    type: "transfer",
    category: "Transfer",
    account: "1",
  },
  {
    id: "6",
    description: "Transfer from Main Account",
    amount: 500.0,
    date: "May 8, 2023",
    type: "transfer",
    category: "Transfer",
    account: "2",
  },
  {
    id: "7",
    description: "Netflix Subscription",
    amount: -15.99,
    date: "May 7, 2023",
    type: "purchase",
    category: "Entertainment",
    account: "1",
  },
  {
    id: "8",
    description: "Grocery Store",
    amount: -78.35,
    date: "May 5, 2023",
    type: "purchase",
    category: "Groceries",
    account: "1",
  },
  {
    id: "9",
    description: "Gas Station",
    amount: -45.2,
    date: "May 3, 2023",
    type: "purchase",
    category: "Transportation",
    account: "1",
  },
  {
    id: "10",
    description: "Interest Payment",
    amount: 12.5,
    date: "May 1, 2023",
    type: "deposit",
    category: "Income",
    account: "2",
  },
  {
    id: "11",
    description: "Gym Membership",
    amount: -35.0,
    date: "May 1, 2023",
    type: "purchase",
    category: "Health & Fitness",
    account: "1",
  },
  {
    id: "12",
    description: "Dividend Payment",
    amount: 27.32,
    date: "April 28, 2023",
    type: "deposit",
    category: "Income",
    account: "3",
  },
  {
    id: "13",
    description: "Electric Bill",
    amount: -95.4,
    date: "April 25, 2023",
    type: "purchase",
    category: "Utilities",
    account: "1",
  },
  {
    id: "14",
    description: "Phone Bill",
    amount: -85.0,
    date: "April 22, 2023",
    type: "purchase",
    category: "Utilities",
    account: "1",
  },
  {
    id: "15",
    description: "Restaurant",
    amount: -67.8,
    date: "April 20, 2023",
    type: "purchase",
    category: "Food & Drink",
    account: "1",
  },
]

// Categories for filtering
const categories = [
  "Shopping",
  "Income",
  "Transportation",
  "Food & Drink",
  "Transfer",
  "Entertainment",
  "Groceries",
  "Health & Fitness",
  "Utilities",
]

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("all")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [transactionType, setTransactionType] = useState("all")
  const [dateRange, setDateRange] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")

  // Filter transactions based on current filters
  const filteredTransactions = allTransactions.filter((transaction) => {
    // Filter by search query
    if (searchQuery && !transaction.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by account
    if (selectedAccount !== "all" && transaction.account !== selectedAccount) {
      return false
    }

    // Filter by categories
    if (selectedCategories.length > 0 && !selectedCategories.includes(transaction.category)) {
      return false
    }

    // Filter by transaction type
    if (transactionType === "income" && transaction.amount <= 0) {
      return false
    }
    if (transactionType === "expense" && transaction.amount >= 0) {
      return false
    }

    // Filter by date range (simplified for demo)
    // In a real app, you would compare actual dates
    if (dateRange === "thisMonth") {
      if (!transaction.date.includes("May")) {
        return false
      }
    } else if (dateRange === "lastMonth") {
      if (!transaction.date.includes("April")) {
        return false
      }
    }

    return true
  })

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortOrder === "newest") {
      // This is a simplified sort for demo purposes
      // In a real app, you would compare actual dates
      return -1
    } else if (sortOrder === "oldest") {
      return 1
    } else if (sortOrder === "highestAmount") {
      return b.amount - a.amount
    } else if (sortOrder === "lowestAmount") {
      return a.amount - b.amount
    }
    return 0
  })

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedAccount("all")
    setSelectedCategories([])
    setTransactionType("all")
    setDateRange("all")
    setSortOrder("newest")
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View and manage your transaction history.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <ArrowDownUp className="mr-2 h-4 w-4" />
                Sort
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortOrder("newest")}>Newest first</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("oldest")}>Oldest first</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("highestAmount")}>Highest amount</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("lowestAmount")}>Lowest amount</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={selectedAccount} onValueChange={setSelectedAccount}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Accounts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto gap-1">
                  <Calendar className="h-4 w-4" />
                  {dateRange === "all"
                    ? "All Time"
                    : dateRange === "thisMonth"
                      ? "This Month"
                      : dateRange === "lastMonth"
                        ? "Last Month"
                        : "Custom Range"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="end">
                <div className="p-2">
                  <div className="grid gap-1">
                    <Button variant="ghost" className="justify-start font-normal" onClick={() => setDateRange("all")}>
                      All Time
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                      onClick={() => setDateRange("thisMonth")}
                    >
                      This Month
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                      onClick={() => setDateRange("lastMonth")}
                    >
                      Last Month
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                      onClick={() => setDateRange("custom")}
                    >
                      Custom Range
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto gap-1">
                  <Filter className="h-4 w-4" />
                  Filters
                  {(selectedCategories.length > 0 || transactionType !== "all") && (
                    <Badge variant="secondary" className="ml-1">
                      {selectedCategories.lengthh + (transactionType !== "all" ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filter Transactions</SheetTitle>
                  <SheetDescription>Refine your transaction list with these filters.</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Transaction Type</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={transactionType === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTransactionType("all")}
                      >
                        All
                      </Button>
                      <Button
                        variant={transactionType === "income" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTransactionType("income")}
                      >
                        Income
                      </Button>
                      <Button
                        variant={transactionType === "expense" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTransactionType("expense")}
                      >
                        Expenses
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Categories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
                          />
                          <Label htmlFor={`category-${category}`}>{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline" onClick={clearFilters}>
                      Reset Filters
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button>Apply Filters</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          {/* Active filters */}
          {(selectedCategories.length > 0 ||
            transactionType !== "all" ||
            selectedAccount !== "all" ||
            dateRange !== "all" ||
            searchQuery) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setSearchQuery("")}>
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {selectedAccount !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Account: {accounts.find((a) => a.id === selectedAccount)?.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setSelectedAccount("all")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {transactionType !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Type: {transactionType === "income" ? "Income" : "Expenses"}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setTransactionType("all")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {dateRange !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Date: {dateRange === "thisMonth" ? "This Month" : dateRange === "lastMonth" ? "Last Month" : "Custom"}
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setDateRange("all")}>
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="gap-1">
                  {category}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => handleCategoryToggle(category)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>{filteredTransactions.length} transactions found</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="transfers">Transfers</TabsTrigger>
            </TabsList>

            <div className="space-y-6">
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))
              ) : (
                <div className="text-center py-10">
                  <CreditCard className="mx-auto h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No transactions found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or search query.</p>
                  <Button variant="outline" className="mt-4" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

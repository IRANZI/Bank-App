"use client"

import { motion } from "framer-motion"
import { CreditCard, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AccountCardProps {
  account: {
    id: string
    name: string
    type: string
    balance: number
    number: string
    currency: string
  }
}

export function AccountCard({ account }: AccountCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium opacity-80">{account.type}</p>
              <h3 className="text-xl font-bold mt-1">{account.name}</h3>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground opacity-80 hover:opacity-100 hover:bg-primary/20"
                >
                  <MoreHorizontal className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Account Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>View Statements</DropdownMenuItem>
                <DropdownMenuItem>Edit Account</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-6">
            <p className="text-sm opacity-80">Current Balance</p>
            <p className="text-2xl font-bold mt-1">
              {account.currency}{" "}
              {account.balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="mt-6 flex items-center">
            <CreditCard className="h-5 w-5 mr-2 opacity-80" />
            <span>{account.number}</span>
          </div>
        </div>
        <CardFooter className="flex justify-between p-4">
          <Button variant="ghost" size="sm">
            Transfer
          </Button>
          <Button variant="outline" size="sm">
            View Transactions
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

import { ArrowDown, ArrowUp, CreditCard } from "lucide-react"

interface TransactionItemProps {
  transaction: {
    id: string
    description: string
    amount: number
    date: string
    type: string
    category: string
  }
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isNegative = transaction.amount < 0

  // Determine icon based on transaction type
  const getIcon = () => {
    switch (transaction.type) {
      case "deposit":
        return <ArrowDown className="h-4 w-4 text-emerald-500" />
      case "purchase":
        return <CreditCard className="h-4 w-4 text-rose-500" />
      case "transfer":
        return <ArrowUp className="h-4 w-4 text-amber-500" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">{getIcon()}</div>
        <div>
          <p className="text-sm font-medium">{transaction.description}</p>
          <p className="text-xs text-muted-foreground">
            {transaction.date} • {transaction.category}
          </p>
        </div>
      </div>
      <div className={`text-sm font-medium ${isNegative ? "text-rose-500" : "text-emerald-500"}`}>
        {isNegative ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
      </div>
    </div>
  )
}

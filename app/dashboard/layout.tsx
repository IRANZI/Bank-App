"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bell,
  ChevronDown,
  CreditCard,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  PieChart,
  Search,
  Settings,
  User,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import { Suspense } from "react"

// Navigation items for sidebar
const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Accounts", href: "/dashboard/accounts", icon: PieChart },
  { name: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
  { name: "Transfer", href: "/dashboard/transfer", icon: MessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false)
    } else {
      setIsSidebarOpen(true)
    }
  }, [isMobile])

  // Navigation item component
  const NavItem = ({ item }: { item: (typeof navItems)[0] }) => {
    const isActive = pathname === item.href

    return (
      <Link
        href={item.href}
        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
          isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"
        }`}
      >
        <item.icon className="h-5 w-5" />
        <span className={isSidebarOpen ? "opacity-100 transition-opacity" : "opacity-0 w-0 h-0 hidden"}>
          {item.name}
        </span>
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Sidebar */}
      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 font-bold text-xl">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    D
                  </div>
                  D-Bank
                </div>
              </div>
              <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                  <NavItem key={item.name} item={item} />
                ))}
              </nav>
              <div className="p-4 border-t">
                <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <motion.aside
          initial={false}
          animate={{
            width: isSidebarOpen ? 240 : 72,
            transition: { duration: 0.2 },
          }}
          className="fixed inset-y-0 left-0 z-10 flex flex-col border-r bg-background"
        >
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <div className="flex items-center gap-2 font-bold">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                D
              </div>
              {isSidebarOpen && <span>D-Bank</span>}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:flex"
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${isSidebarOpen ? "" : "rotate-90"}`} />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </div>
          <nav className="flex-1 space-y-2 p-4">
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className={`${isSidebarOpen ? "w-full justify-start" : "w-full justify-center"} text-muted-foreground`}
            >
              <LogOut className={`${isSidebarOpen ? "mr-2" : ""} h-4 w-4`} />
              {isSidebarOpen && "Log out"}
            </Button>
          </div>
        </motion.aside>
      )}

      {/* Main Content */}
      <div
        className={`${
          !isMobile && isSidebarOpen ? "md:ml-60" : !isMobile ? "md:ml-[72px]" : ""
        } min-h-screen flex flex-col transition-all duration-200`}
      >
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="flex flex-1 items-center gap-4">
            {/* Search */}
            <div className="relative md:w-64 lg:w-80">
              {isSearchOpen || !isMobile ? (
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search..." className="w-full bg-background pl-8 md:w-64 lg:w-80" />
                  {isMobile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close search</span>
                    </Button>
                  )}
                </div>
              ) : (
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setIsSearchOpen(true)}>
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          <Suspense fallback={<div>Loading...</div>}>
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </main>
      </div>
    </div>
  )
}

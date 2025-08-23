"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useEffect, useState } from "react"
import { fetchCategories } from "@/lib/api/fetch-categories"
import { ICategoryData } from "@/types/categories.type"
import { cn } from "@/lib/utils"

export default function NavbarMenu() {
  const [categories, setCategories] = useState<string[]>([])
  
  useEffect(() => {
    async function loadArticles() {
      const res = await fetchCategories()
      const cats = res?.data?.map((category: ICategoryData) => category.name) ?? []
      const uniqueCats = Array.from(new Set(cats))
      setCategories(uniqueCats)
    }

    loadArticles()
  }, [])

  return (
    <NavigationMenu className="relative hidden md:flex z-50">
      <NavigationMenuList className="flex items-center gap-1">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent hover:bg-rose-100/50 focus:bg-rose-100/70 text-gray-700 hover:text-rose-700 focus:text-rose-800 font-medium transition-colors"
          )}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-rose-100/50 focus:bg-rose-100/70 text-gray-700 hover:text-rose-700 focus:text-rose-800 data-[state=open]:bg-rose-100/70 data-[state=open]:text-rose-700 font-medium transition-colors">
            Category
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 w-[400px] md:w-[500px] lg:w-[600px]">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Article Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="group rounded-lg p-3 bg-gradient-to-r from-rose-50 to-orange-50 hover:from-rose-100 hover:to-orange-100 transition-all cursor-pointer border border-transparent hover:border-rose-200"
                  >
                    <div className="text-sm font-medium text focus:bg-rose-100/70-gray-800 group-hover:text-rose-700 focus:text-rose-800 transition-colors">
                      {category}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      Explore articles about {category.toLowerCase()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent hover:bg-rose-100/50 focus:bg-rose-100/70 text-gray-700 hover:text-rose-700 focus:text-rose-800 font-medium transition-colors"
          )}>
            <Link href="#">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent hover:bg-rose-100/50 focus:bg-rose-100/70 text-gray-700 hover:text-rose-700 focus:text-rose-800 font-medium transition-colors"
          )}>
            <Link href="#">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
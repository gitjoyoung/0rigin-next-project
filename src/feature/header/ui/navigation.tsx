"use client";

import Link from "next/link";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/shared/shadcn/ui/menubar";

import { HEADER_NAV_LIST } from "../constant/header-menu";

export default function Navigation() {
  return (
    <nav className="hidden md:flex gap-2">
      <Menubar className="border-none bg-transparent p-0 shadow-none">
        {HEADER_NAV_LIST.map((item) => (
          <MenubarMenu key={item.id}>
            {item.submenuItems ? (
              <>
                <MenubarTrigger className="m-0 rounded-none w-[80px] flex justify-center hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                  <p className="text-white">{item.title}</p>
                </MenubarTrigger>

                <MenubarContent>
                  {item.submenuItems.map((subItem) => (
                    <MenubarItem asChild key={subItem.id} onClick={() => {}}>
                      <Link
                        href={subItem.url || "#"}
                        className="text-sm flex items-center gap-2 px-1 py-2"
                      >
                        <subItem.icon className="h-4 w-4" />
                        <span>{subItem.title}</span>
                      </Link>
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </>
            ) : (
              item.url && (
                <MenubarItem asChild>
                  <Link
                    className="text-md focus:bg-transparent hover:bg-transparent text-white"
                    href={item.url}
                  >
                    {item.title}
                  </Link>
                </MenubarItem>
              )
            )}
          </MenubarMenu>
        ))}
      </Menubar>
    </nav>
  );
}

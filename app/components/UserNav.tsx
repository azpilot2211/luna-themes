import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuLabel, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Settings, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface iAppProps{
    email: string;
    name: string;
    userImage: string | undefined;
}

export function UserNav({ email, name, userImage}: iAppProps){
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                    <AvatarImage src={userImage} alt="avatar" />
                    <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/sell"><ShoppingCart className="pr-2" />Sell Your product</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/settings"><Settings className="pr-2" />Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Test Item</DropdownMenuItem>
                    <DropdownMenuItem>Test Item</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <LogoutLink>Log Out</LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
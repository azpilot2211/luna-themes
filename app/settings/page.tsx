import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { use } from "react";
import { SettingsForm } from "../components/SettingsForm";
import prisma from "../lib/db";

async function getData(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId, 
        },
        select: {
            firstName: true,
            lastName: true,
            email: true,
        },
    });

    return data;
}

export default async function Settings() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user){
        throw new Error("User not authorized");
    }

    const data = await getData(user.id);

    return (
        <div>
            <section className="max-w-7xl mx-auto px-4 md:px-8">
                <Card>
                    <SettingsForm firstName={data?.firstName as string} lastName={data?.lastName as string} email={data?.email as string} />
                </Card>

            </section>
        </div>
    )
}
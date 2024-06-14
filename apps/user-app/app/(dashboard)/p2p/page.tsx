import { getServerSession } from "next-auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/Person2Person";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        },
        include: {
            fromUser: {
                select: {
                    name: true
                },
            },
            toUser: {
                select: {
                    name: true
                }
            }
        }
    })
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        from: {
            id: t.fromUserId,
            name: t.fromUser.name || "",
        },
        to: {
            id: t.toUserId,
            name: t.toUser.name || ""
        }
    }))
}

export default async function CenteredCards() {
    const transactions = await getOnRampTransactions();

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <SendCard />
                </div>
                <div >
                    <OnRampTransactions transactions={transactions}></OnRampTransactions>
                </div>
            </div>
        </div>
    );
}
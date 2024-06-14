import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        from: { id: number, name: string },
        to: { id: number, name: string }
    }[]
}) => {
    if (!transactions.length) {
        return (
            <Card title="Recent Transactions">
                <div className="text-center pb-8 pt-8">
                    No Recent transactions
                </div>
            </Card>
        );
    }
    return (
        <Card title="Recent Transactions">
            <div className="pt-2">
                {transactions.map(t => (
                    <div className="flex justify-between" key={t.time.toISOString()}>
                        <div>
                            <div className="text-sm">
                                Successfully Sent to {t.to.name}
                            </div>
                            <div className="text-slate-600 text-xs">
                                {t.time.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            + Rs {t.amount / 100}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
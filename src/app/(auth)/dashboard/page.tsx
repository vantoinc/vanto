import { DollarSign, ShoppingCart, Users } from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/card";

export default function Dashboard(): JSX.Element {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader className="fle flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Number of orders
            </CardTitle>
            <ShoppingCart size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">+30</p>
            <small className="text-xs text-muted-foreground">20.1%</small>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="fle flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Active clients
            </CardTitle>
            <Users size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">+367</p>
            <small className="text-xs text-muted-foreground">20.1%</small>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="fle flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Total income</CardTitle>
            <DollarSign size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(17834.93)}</p>
            <small className="text-xs text-muted-foreground">20.1%</small>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

import { DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import { BarMixed } from "@/ui/charts/bar-mixed";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/card";

export default function Analytics(): JSX.Element {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Analytics</h1>

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader className="fle flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <TrendingUp size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(17834.93)}</p>
            <small className="text-xs text-muted-foreground">20.1%</small>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="fle flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Cart Abandonment Rate
            </CardTitle>
            <ShoppingCart size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(17834.93)}</p>
            <small className="text-xs text-muted-foreground">20.1%</small>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="fle flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
            <DollarSign size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(17834.93)}</p>
            <small className="text-xs text-muted-foreground">20.1%</small>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="mb-4 text-muted-foreground">
            Browsers used by visitors
          </p>
          <BarMixed />
        </div>
      </div>
    </>
  );
}

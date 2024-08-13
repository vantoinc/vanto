import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/shadcn/tabs";
import { Cards } from "@/ui/common/cards";

export default async function DashboardSettings(): Promise<JSX.Element | void> {
  return (
    <>
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="mt-4">
        <Tabs defaultValue="payment">
          <TabsList>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="taxes">Taxes</TabsTrigger>
          </TabsList>

          <TabsContent value="payment">
            <Cards
              title="Payment Methods"
              description="Manage your accepted payment methods"
            />
          </TabsContent>

          <TabsContent value="taxes">
            <Cards title="Taxes" description="Configure your tax settings" />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/shadcn/tabs";
import { Cards } from "@/ui/common/cards";
import { FormPayment } from "@/ui/form/form-payment";
import { getMethodPayment } from "./data";

export default async function Settings(): Promise<JSX.Element> {
  const methodPayment = await getMethodPayment();

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
            >
              <FormPayment data={methodPayment} />
            </Cards>
          </TabsContent>

          <TabsContent value="taxes">
            <Cards title="Taxes" description="Configure your tax settings" />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

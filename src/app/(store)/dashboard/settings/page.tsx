import { getSettings } from "./action";
import { FormStore } from "@/ui/form/form-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/shadcn/tabs";
import { Cards } from "@/ui/common/cards";

export default async function DashboardSettings() {
  const settings = await getSettings();
  if (!settings) {
    return;
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="mt-4">
        <Tabs defaultValue="basic">
          <TabsList>
            <TabsTrigger value="basic">Store Profile</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="taxes">Taxes</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <Cards
              title="Store Profile"
              description="Manage your store basic information."
            >
              <FormStore
                name={settings.name}
                description={settings.description}
              />
            </Cards>
          </TabsContent>

          <TabsContent value="payment">
            <Cards
              title="Payment Methods"
              description="Manage your accepted payment methods"
            />
          </TabsContent>

          <TabsContent value="shipping">
            <Cards
              title="Shipping"
              description="Configure your shipping options"
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

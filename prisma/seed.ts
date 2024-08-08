import { prisma } from "@/utils/libs/prisma";

async function main() {
  await prisma.setting.create({
    data: {
      name: "Store",
      description: "My Store description",
      Payment: {
        create: [
          {
            name: "Paypal",
            description: "pay with Paypal",
            api_key: "",
            private_key: "",
          },
          {
            name: "Stripe",
            description: "pay with Stripe",
            api_key: "",
            private_key: "",
          },
        ],
      },
      Shipping: {
        create: [
          {
            name: "Free shipping",
            country: "all",
            zone: "all",
            cost: 0,
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect;
  });

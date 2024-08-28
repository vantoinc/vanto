import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shadcn/table";

export default function Orders(): JSX.Element {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Orders</h1>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">#1234</TableCell>
              <TableCell>Juan Pérez</TableCell>
              <TableCell>2023-06-15</TableCell>
              <TableCell>
                <span className="rounded-full bg-green-100 px-2 py-1 font-semibold leading-tight text-green-700 dark:bg-green-700 dark:text-green-100">
                  Filled
                </span>
              </TableCell>
              <TableCell className="text-right">$120.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">#1235</TableCell>
              <TableCell>María García</TableCell>
              <TableCell>2023-06-14</TableCell>
              <TableCell>
                <span className="rounded-full bg-orange-100 px-2 py-1 font-semibold leading-tight text-orange-700 dark:bg-orange-600 dark:text-orange-100">
                  Pending
                </span>
              </TableCell>
              <TableCell className="text-right">$75.50</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">#1236</TableCell>
              <TableCell>Carlos Rodríguez</TableCell>
              <TableCell>2023-06-13</TableCell>
              <TableCell>
                <span className="rounded-full bg-blue-100 px-2 py-1 font-semibold leading-tight text-blue-700 dark:bg-blue-700 dark:text-blue-100">
                  In progress
                </span>
              </TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

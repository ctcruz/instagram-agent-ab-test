import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  // type ColumnDef,
} from "@tanstack/react-table";
import { Filters } from "./filters";
import { useMemo, useState } from "react";
import { Pagination } from "./pagination";
import { columns, type ContentHistory } from "./columns";
import { Card, CardContent } from "@/components/ui/card";

interface DataTableProps {
  data: ContentHistory[];
}

function DataTable({ data }: DataTableProps) {
  const [typeFilter, setTypeFilter] = useState<"ALL" | "POST" | "STORY">("ALL");

  const filteredData = useMemo(() => {
    if (typeFilter === "ALL") return data;
    return data.filter((row) => row.type === typeFilter);
  }, [data, typeFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <Filters
          setTypeFilter={setTypeFilter}
          table={table}
          typeFilter={typeFilter}
        />
        <div className="overflow-auto border rounded">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination table={table} />
      </CardContent>
    </Card>
  );
}

export { DataTable };

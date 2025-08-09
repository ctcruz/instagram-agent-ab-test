import React, { useMemo, useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import type { Content } from "@/types/content";

interface Props {
  data: Content[] | undefined;
}

const fallbackData: Content[] = [];

export const ContentHistoryTable: React.FC<Props> = ({ data }) => {
  const columns = useMemo<ColumnDef<Content>[]>(
    () => [
      {
        header: "Type",
        accessorKey: "type",
        cell: ({ getValue }) => {
          const v = getValue() as "POST" | "STORY";
          return (
            <Badge
              className={cn(
                "rounded-full px-2 py-0.5 text-xs border-0",
                v === "POST"
                  ? "bg-gradient-to-r from-[#FF6EA9] via-[#FF4E88] to-[#FD8A44] text-white"
                  : "bg-gradient-to-r from-[#833AB4] via-[#C13584] to-[#FD8A44] text-white"
              )}
            >
              {v}
            </Badge>
          );
        },
      },
      {
        header: "Prompt",
        accessorKey: "prompt",
        cell: ({ getValue }) => (
          <span className="line-clamp-2 text-sm text-zinc-900 dark:text-zinc-100">
            {getValue() as string}
          </span>
        ),
      },
      {
        header: "Caption",
        accessorFn: (row) =>
          row.selectedOption === "A"
            ? row.optionA.caption
            : row.optionB.caption,
        cell: ({ getValue }) => <TruncatedText text={getValue() as string} />,
      },
      {
        header: "Created at",
        accessorFn: (row) => new Date(row.createdAt).toLocaleString(),
        cell: ({ getValue }) => (
          <span className="text-xs text-zinc-500">{getValue() as string}</span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: data ?? fallbackData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FF6EA9] via-[#FF4E88] to-[#FD8A44]">
          Content History
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
          <Table>
            <TableHeader className="bg-gradient-to-r from-[#FF6EA9]/10 via-[#FF4E88]/10 to-[#FD8A44]/10">
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-xs font-medium text-zinc-600 dark:text-zinc-300"
                    >
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
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="align-top">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-sm text-muted-foreground"
                  >
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

const TruncatedText: React.FC<{ text: string }> = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;

  const short = text.length > 35 ? text.slice(0, 35) + "…" : text;

  return (
    <span className="text-sm text-justify">
      {expanded ? text : short}
      {text.length > 35 && (
        <button
          type="button"
          onClick={() => setExpanded((s) => !s)}
          className="cursor-pointer ml-1 text-xs bg-clip-text text-transparent bg-gradient-to-r from-[#FF6EA9] via-[#FF4E88] to-[#FD8A44]"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </span>
  );
};

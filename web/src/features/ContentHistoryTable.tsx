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

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type ContentHistory = {
  id: string;
  prompt: string;
  type: "POST" | "STORY";
  selectedOption: "A" | "B" | null;
  optionA: { caption: string; hashtags: string[] };
  optionB: { caption: string; hashtags: string[] };
  createdAt: string;
};

interface Props {
  data: ContentHistory[];
}

export const ContentHistoryTable: React.FC<Props> = ({ data }) => {
  const [typeFilter, setTypeFilter] = useState<"ALL" | "POST" | "STORY">("ALL");
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const filteredData = useMemo(() => {
    if (typeFilter === "ALL") return data;
    return data.filter((row) => row.type === typeFilter);
  }, [data, typeFilter]);

  const columns = useMemo<ColumnDef<ContentHistory>[]>(
    () => [
      {
        header: "Prompt",
        accessorKey: "prompt",
      },
      {
        header: "Type",
        accessorKey: "type",
      },
      {
        header: "Selected",
        accessorKey: "selectedOption",
        cell: (info) => info.getValue() || "—",
      },
      {
        header: "Caption A",
        accessorFn: (row) => row.optionA.caption,
        cell: (info) => <TruncatedText text={info.getValue() as string} />,
      },
      {
        header: "Caption B",
        accessorFn: (row) => row.optionB.caption,
        cell: (info) => <TruncatedText text={info.getValue() as string} />,
      },
      {
        header: "Created At",
        accessorFn: (row) => new Date(row.createdAt).toLocaleString(),
      },
      {
        header: "Hashtags",
        cell: ({ row }) => {
          const isExpanded = expandedRows[row.id];
          const content = row.original;

          return (
            <div className="text-xs">
              {isExpanded ? (
                <>
                  <strong>A:</strong> {content.optionA.hashtags.join(", ")}
                  <br />
                  <strong>B:</strong> {content.optionB.hashtags.join(", ")}
                </>
              ) : (
                <span className="text-muted-foreground">Oculto</span>
              )}
              <Button
                variant="link"
                size="sm"
                className="text-xs ml-2 px-1"
                onClick={() =>
                  setExpandedRows((prev) => ({
                    ...prev,
                    [row.id]: !prev[row.id],
                  }))
                }
              >
                {isExpanded ? "Ocultar" : "Ver"}
              </Button>
            </div>
          );
        },
      },
    ],
    [expandedRows]
  );

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label className="text-sm">Filtrar por tipo:</Label>
            <Select
              value={typeFilter}
              onValueChange={(value) => setTypeFilter(value as any)}
            >
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos</SelectItem>
                <SelectItem value="POST">Post</SelectItem>
                <SelectItem value="STORY">Story</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className="text-sm text-muted-foreground">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </span>
        </div>

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

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const TruncatedText: React.FC<{ text: string }> = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  if (text.length <= 80) return <span>{text}</span>;

  return (
    <span>
      {expanded ? text : text.slice(0, 80) + "..."}
      <Button
        variant="link"
        size="sm"
        className="text-xs ml-1 px-1"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Ver menos" : "Ver mais"}
      </Button>
    </span>
  );
};

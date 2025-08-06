import type { ColumnDef } from "@tanstack/react-table";

export type ContentHistory = {
  id: string;
  prompt: string;
  type: "POST" | "STORY";
  selectedOption: "A" | "B" | null;
  optionA: { caption: string; hashtags: string[] };
  optionB: { caption: string; hashtags: string[] };
  createdAt: string;
};

export const columns: ColumnDef<ContentHistory>[] = [
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
    cell: (info) => info.getValue(),
  },
  {
    header: "Caption B",
    accessorFn: (row) => row.optionB.caption,
    cell: (info) => info.getValue(),
  },
  {
    header: "Created At",
    accessorFn: (row) => new Date(row.createdAt).toLocaleString(),
  },
];

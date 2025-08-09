// import { Button } from "@/components/ui/button";
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
    cell: (info) => `${(info.getValue() as string).substring(0, 30)}...`,
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  // {
  //   header: "Hashtags",
  //   cell: ({ row }) => {
  //     const isExpanded = expandedRows[row.id];
  //     const content = row.original;

  //     return (
  //       <div className="text-xs">
  //         {isExpanded ? (
  //           <>
  //             <strong>A:</strong> {content.optionA.hashtags.join(", ")}
  //             <br />
  //             <strong>B:</strong> {content.optionB.hashtags.join(", ")}
  //           </>
  //         ) : (
  //           <span className="text-muted-foreground">Oculto</span>
  //         )}
  //         <Button
  //           variant="link"
  //           size="sm"
  //           className="text-xs ml-2 px-1"
  //           onClick={() =>
  //             setExpandedRows((prev) => ({
  //               ...prev,
  //               [row.id]: !prev[row.id],
  //             }))
  //           }
  //         >
  //           {isExpanded ? "Ocultar" : "Ver"}
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
  {
    header: "Caption",
    accessorFn: (row) =>
      row.selectedOption === "A" ? row.optionA.caption : row.optionB.caption,
    size: 13,
    cell: (info) => `${(info.getValue() as string).substring(0, 30)}...`,
  },
  {
    header: "Created At",
    accessorFn: (row) => new Date(row.createdAt).toLocaleString(),
  },
];

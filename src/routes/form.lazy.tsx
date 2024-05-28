import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ContentLayout } from "@/layout/content";
import { createLazyFileRoute } from "@tanstack/react-router";
import {
  CellContext,
  RowData,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useFormik } from "formik";
import { Archive, CircleX } from "lucide-react";
import { capitalize } from "radash";
import { useCallback, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

export const Route = createLazyFileRoute("/form")({
  component: () => <TableForm />,
});

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type Products = {
  data: Array<Product>;
};

type InputVariant = "text" | "currency" | "number";

function TableForm() {
  const formik = useFormik<Products>({
    initialValues: {
      data: [],
    },
    onSubmit: (value) => {
      console.log(value);
    },
  });

  const columnHelper = createColumnHelper<Product>();

  const columns = [
    {
      id: "name",
      headerStyle: "text-left",
      content: TableCellInput,
      width: 180,
      type: "text",
    },
    {
      id: "price",
      headerStyle: "text-center",
      content: TableCellInput,
      width: 180,
      type: "currency",
    },
    {
      id: "quantity",
      headerStyle: "text-center",
      content: TableCellInput,
      width: 180,
      type: "number",
    },
    {
      id: "id",
      headerStyle: "text-center",
      content: (info: CellContext<Product, string | number>) => (
        <CircleX
          size={14}
          onClick={() => handleDeleteProduct(info.row.original.id)}
        />
      ),
      width: 50,
    },
  ].map((column) =>
    columnHelper.accessor(column.id as keyof Product, {
      header: (info) => (
        <div className={clsx("w-full", column?.headerStyle)}>
          {info.header.id == "id" ? "" : capitalize(info.header.id)}
        </div>
      ),
      cell: column.content,
      enableResizing: false,
      size: column.width,
      meta: {
        type: column?.type as InputVariant,
      },
    })
  );

  const handleNewProduct = () => {
    formik.setValues((prev) => ({
      data: [
        ...prev.data,
        { id: +new Date(), name: "", price: 0, quantity: 0 },
      ],
    }));
  };

  const handleDeleteProduct = (id: number) => {
    formik.setValues((prev) => ({
      data: [...prev.data.filter((product) => product.id !== id)],
    }));
  };

  const handleUpdateData = useCallback(
    ({ row: rowIndex, column: columnId, value }: UpdateDataProps) => {
      formik.setFieldValue(
        `data[${rowIndex}].${columnId}`,
        columnId != "name" ? +value : value
      );
    },
    []
  );

  const table = useReactTable({
    data: formik.values.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: handleUpdateData,
    },
  });

  return (
    <ContentLayout>
      <div className="flex justify-end">
        <Button type="button" size="sm" onClick={handleNewProduct}>
          Add Product
        </Button>
      </div>
      <table>
        <thead className="border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  style={{ width: `${header.getSize()}px` }}
                  className="px-5 py-3 text-xs font-semibold leading-3"
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="[&>*:nth-child(odd)]:bg-blue-50">
          {table.getRowModel().rows.map((row) => (
            <tr className="hover:cursor-pointer" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  style={{ width: `${cell.getContext().column.getSize()}px` }}
                  className="leading-3 text-sm px-5 py-3 text-slate-600 "
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className={clsx("h-[200px] flex justify-center items-center", {
          hidden: formik.values.data.length > 0,
        })}
      >
        <div className="[.&>*]:text-center text-slate-400">
          <Archive size={42} className="mx-auto" />
          <p className="tracking-wider my-1">No Record</p>
        </div>
      </div>
      <pre
        className={clsx("text-xs text-slate-500 my-4", {
          hidden: formik.values.data.length == 0,
        })}
      >
        {JSON.stringify(formik.values.data, undefined, 2)}
      </pre>
    </ContentLayout>
  );
}

interface UpdateDataProps {
  row: number;
  column: string;
  value: string | number;
}

declare module "@tanstack/table-core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: ({ row, column, value }: UpdateDataProps) => void;
  }
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    type: InputVariant;
  }
}

const TableCellInput = ({
  column,
  row,
  getValue,
  table,
}: CellContext<Product, string | number>) => {
  const [value, setValue] = useState(getValue());
  const componentType = column.columnDef.meta?.type || "text";

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  const field = {
    text: (
      <Input
        key={`${row.original.id}-${row.index}-${column.id}`}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          table.options.meta?.updateData({
            row: row.index,
            column: column.id,
            value,
          });
        }}
      />
    ),
    currency: (
      <NumericFormat
        key={`${row.original.id}-${row.index}-${column.id}`}
        id={`${column.id}[${row.index}]`}
        className="text-sm"
        value={+value}
        onValueChange={(e) => setValue(e.value)}
        onBlur={() =>
          table.options.meta?.updateData({
            row: row.index,
            column: column.id,
            value,
          })
        }
        customInput={Input}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={0}
      />
    ),
    number: (
      <NumericFormat
        key={`${row.original.id}-${row.index}-${column.id}`}
        id={`${column.id}[${row.index}]`}
        className="text-sm"
        value={+value}
        onValueChange={(e) => setValue(e.value)}
        onBlur={() =>
          table.options.meta?.updateData({
            row: row.index,
            column: column.id,
            value,
          })
        }
        customInput={Input}
      />
    ),
  };

  return componentType ? field[componentType as InputVariant] : null;
};

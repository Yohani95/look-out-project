import { format } from "date-fns";
import * as Yup from "yup";

class LogEntry {
  id: number | null;
  timestamp: Date | null;
  level: string | null;
  sourceContext: string | null;
  message: string | null;
  exception: string | null;

  constructor(data?: any) {
    this.id = data?.id || null;
    this.timestamp = data?.timestamp ? new Date(data.timestamp) : null;
    this.level = data?.level || "";
    this.sourceContext = data?.sourceContext || "";
    this.message = data?.message || "";
    this.exception = data?.exception || "";
  }

  static getValidationSchema(t: any) {
    return Yup.object().shape({
      timestamp: Yup.date().nullable().required(t.ValidationMessages.required),
      level: Yup.string()
        .nullable()
        .required(t.ValidationMessages.required)
        .max(50, t.ValidationMessages.maxLength),
      sourceContext: Yup.string()
        .nullable()
        .required(t.ValidationMessages.required)
        .max(255, t.ValidationMessages.maxLength),
      message: Yup.string()
        .nullable()
        .required(t.ValidationMessages.required)
        .max(255, t.ValidationMessages.maxLength),
      exception: Yup.string().nullable().max(1000, t.ValidationMessages.maxLength),
    });
  }

  static createColumns(t: any) {
    return [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "timestamp",
        header: "Timestamp",
        size: 150,
      },
      {
        accessorKey: "level",
        header: "Level",
        size: 100,
      },
      {
        accessorKey: "sourceContext",
        header: "Source Context",
        size: 200,
      },
      {
        accessorKey: "message",
        header: "Message",
        size: 300,
      },
      {
        accessorKey: "exception",
        header: "Exception",
        size: 400,
      },
      // {
      //   accessorKey: "actions",
      //   header: t.Common.actions,
      //   size: 100,
      // },
    ];
  }
  getFechaString(): string | null {
    return this.timestamp ? format(new Date(this.timestamp), 'dd/MM/yyyy HH:mm:ss') : "N/A";
  }
}

export default LogEntry;

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportCustomersToExcel = (customers) => {

    const worksheet = XLSX.utils.json_to_sheet(customers);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
    });

    const data = new Blob(
        [excelBuffer],
        {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        }
    );

    saveAs(data, "customers.xlsx");
};
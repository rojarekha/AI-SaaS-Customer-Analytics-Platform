import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportCustomersToPDF = (customers) => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Customer Analytics Report", 14, 20);

    const tableData = customers.map((customer) => [

        customer.id,
        customer.name,
        customer.email,
        customer.city,
        customer.totalSpending,
        customer.ordersCount

    ]);

    autoTable(doc, {
        head: [[
            "ID",
            "Name",
            "Email",
            "City",
            "Spending",
            "Orders"
        ]],
        body: tableData,
        startY: 30
    });

    doc.save("customers.pdf");

};
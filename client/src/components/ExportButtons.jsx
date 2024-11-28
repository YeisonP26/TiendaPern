import { Button } from "@windmill/react-ui";
import { Download } from "react-feather";
import { formatCurrency } from "helpers/formatCurrency";
import { useTranslation } from "react-i18next";

const ExportButtons = ({ products }) => {
  const { t } = useTranslation();

  const exportToPDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text("Lista de Productos", 14, 15);
    
    const tableColumn = ["Nombre", "Precio"];
    const tableRows = [];

    products.forEach(product => {
      const productData = [
        product.name,
        formatCurrency(product.price)
      ];
      tableRows.push(productData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: {
        fontSize: 12,
        cellPadding: 3,
        halign: 'center'
      },
    });

    doc.save("productos.pdf");
  };

  const exportToExcel = () => {
    const XLSX = window.XLSX;
    const workbook = XLSX.utils.book_new();
    
    const worksheet = XLSX.utils.json_to_sheet(products.map(product => ({
      Nombre: product.name,
      Precio: formatCurrency(product.price),
      "URL de Imagen": product.image_url
    })));

    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
    XLSX.writeFile(workbook, "productos.xlsx");
  };

  return (
    <div className="flex space-x-4 mb-4">
      <Button onClick={exportToPDF}>
        <Download className="mr-2" />
        {t('products.exportPDF')}
      </Button>
      <Button onClick={exportToExcel}>
        <Download className="mr-2" />
        {t('products.exportExcel')}
      </Button>
    </div>
  );
};

export default ExportButtons; 
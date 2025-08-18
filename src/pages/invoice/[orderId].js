import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Use the correct router import for Next.js
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { apiGet } from '@/api/apiMethods';
import InvoiceTemplate from '@/Components/Product/Invoice';
import Header from '@/Layout/Header';

export default function InvoicePage() {
  const router = useRouter();
  const { orderId } = router.query; // Get the orderId from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure this is client-side rendering
  }, []);

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [orderId]);

  const fetchOrder = async (orderId) => {
    try {
      const response = await apiGet(`api/order/orders/${orderId}`);
      setOrder(response.data.order);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async () => {
    if (!isClient) return; // Check if it's client-side before running html2canvas

    const element = document.getElementById('invoice');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice-${orderId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div>
      <Header/>
      <div className="max-w-[800px] mx-auto">
        <button onClick={generatePDF} className="mb-4 btn-primary" style={{ color: '#fff', backgroundColor:'#dc3545',padding: '10px', borderRadius: '2em' }}>
          Download PDF
        </button>
      </div>

      <div id="invoice">
        <InvoiceTemplate order={order} />
      </div>
    </div>
  );
}

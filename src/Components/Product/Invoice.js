
import { format } from 'date-fns';

// Function to generate a random 4-character alphanumeric string (numbers and letters)
function generateRandomINVNo() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default function InvoiceTemplate({ order }) {

  const invoiceNo = generateRandomINVNo();

  return (
    <>
     
      <div >
        <div className="max-w-[800px] mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-300">
          <div className="flex justify-between items-start mb-4 pt-2 pb-2">
            <div className="row">
              <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <h3 className="text-2xl font-bold text-black-800">
                  Agpdienen Private Limited.
                </h3>
                <h4 className="text-lg text-gray-600 mt-1">Receipt / Tax Invoice</h4>
              </div>
              <div className="col-6 text-sm text-black-500 mt-2">
                <p><strong>GST</strong>: 08ABOCS1177N1ZL</p>
                <p><strong>Address</strong>: Office number 38, second floor, Omaxe Celebration Mall, Badshahpur Sohna Rd Hwy, Central Park II, Sector 48, Gurugram, Haryana 122001</p>
                <p><strong>Email</strong>: agpdienenprivatelimited@gmail.com</p>
                <p><strong>Contact</strong>: +91-7296988927</p>
              </div>
              <div className="col-6 text-right">
                <p className="text-sm text-black-500"><strong>INV No</strong>: {invoiceNo}</p>
              
                <p className="text-sm text-black-500 mt-2"><strong>Date</strong>: {format(new Date(), 'yyyy-MM-dd')}</p>
               
              </div>
            </div>
          </div>
          <div className="border border-gray-300 p-3 rounded-lg mb-4 bg-gray-50">
            <h4 className=" text-gray-800 mb-3 text-xl font-bold ">Customer Details</h4>
            {/* <p><strong>To:</strong> {order.userDetail.email}</p> */}
            <p><strong>To:</strong> {order.customer.email}</p>
            <p><strong>Name:</strong>{order.customer.firstName} {order.customer.lastName}</p>
            <p>
              <strong>Address:</strong>{order?.shippingAddress?.address}, {order?.shippingAddress?.state}, {order?.shippingAddress?.country} - {order?.shippingAddress?.pinCode}
            </p>
            <p><strong>Phone : </strong>{order.customer.mobile}</p>
          </div>
          <div className="border border-gray-300 p-3 rounded-lg mb-4 bg-gray-50">
            <h4 className="text-gray-800 mb-3 text-xl font-bold">Order Details</h4>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Order Date:</strong> {format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm:ss')}</p>
          </div>
          <table className="w-full mb-4 border border-gray-300 bg-gray-50 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 text-gray-700">
                <th className="text-left px-2 py-2 border border-gray-300">S.NO</th>
                <th className="text-left px-2 py-2 border border-gray-300">Description</th>
                <th className="text-center px-2 py-2 border border-gray-300">QTY</th>
                <th className="text-center px-2 py-2 border border-gray-300">SAC</th>
                <th className="text-right px-2 py-2 border border-gray-300">Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product, index) => {
                
                return (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="px-2 py-2 border border-gray-300">{index + 1}</td>
                    <td className="px-2 py-2 border border-gray-300">{product.product.productName}</td>
                    <td className="text-center px-2 py-2 border border-gray-300">{product.quantity}</td>
                    <td className="text-center px-2 py-2 border border-gray-300">{order._id}</td>
                    <td className="text-right px-2 py-2 border border-gray-300">Rs.₹{product.price.toFixed(2)}</td>
                  </tr>
                );
              })}
              <tr className="font-bold">
                <td colSpan={4} className="text-right px-2 py-2 border border-gray-300">Total:</td>
                <td className="text-right px-2 py-2 border border-gray-300">Rs.₹{order.totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-xs mb-4">
            <h3 className="text-gray-800 mb-3 text-xl font-bold">Terms and Conditions</h3>
            <ul className="list-disc pl-4 text-gray-600">
              <li>Payment will be on immediate basis.</li>
              <li>All the services from this app are non-refundable.</li>
              <li>This invoice includes GST.</li>
              <li>This is an electronically generated invoice and does not require a signature.</li>
            </ul>
          </div>
          <div className="text-center font-bold mb-2 text-base" style={{ color: 'red' }}>
            PAYMENT TERMS: IMMEDIATE
          </div>
          <div className="text-center text-xs text-black-500">
            <h5 className="mb-2"><strong>Agpdienen Private Limited.</strong></h5>
            <p>GroundFloor 85, Shiv Nagar,Bindayaka jaipur Rajathan Pincode - 302012</p>
            <p>CIN: U70200RJ2024PTC096656 | <a href="https://Agpdienen.com" className="text-blue-600 underline"> https://Agpdienen.com</a></p>
          </div>
        </div>
      </div>
    </>
  );
}




// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// // Define the styles for the invoice
// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//     fontFamily: 'Helvetica',
//   },
//   section: {
//     marginBottom: 10,
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   subHeading: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   text: {
//     fontSize: 12,
//     marginBottom: 5,
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
//   table: {
//     display: 'table',
//     width: '100%',
//     borderBottom: '1px solid #ddd',
//     marginBottom: 10,
//   },
//   tableRow: {
//     display: 'flex',
//     flexDirection: 'row',
//     borderBottom: '1px solid #ddd',
//   },
//   tableCol: {
//     width: '50%',
//     padding: 5,
//   },
//   tableCell: {
//     fontSize: 12,
//     padding: 5,
//   },
//   totalAmount: {
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
// });

// // Invoice component
// const Invoice = ({ order }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text style={styles.heading}>Invoice</Text>
//         <Text style={styles.text}>Order ID: {order._id}</Text>
//         <Text style={styles.text}>
//           Date: {new Date(order.createdAt).toLocaleDateString()}
//         </Text>
//       </View>
      
//       <View style={styles.section}>
//         <Text style={styles.subHeading}>Customer Information</Text>
//         <Text style={styles.text}>
//           Name: {order.customer.firstName} {order.customer.lastName}
//         </Text>
//         <Text style={styles.text}>Email: {order.customer.email}</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.subHeading}>Shipping Address</Text>
//         <Text style={styles.text}>{order?.shippingAddress?.address}</Text>
//         <Text style={styles.text}>
//           {order?.shippingAddress?.state}, {order?.shippingAddress?.country} - {order?.shippingAddress?.pinCode}
//         </Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.subHeading}>Order Details</Text>
//         <View style={styles.table}>
//           <View style={styles.tableRow}>
//             <Text style={[styles.tableCol, styles.tableCell]}>Product</Text>
//             <Text style={[styles.tableCol, styles.tableCell]}>Price</Text>
//             <Text style={[styles.tableCol, styles.tableCell]}>Quantity</Text>
//             <Text style={[styles.tableCol, styles.tableCell]}>Total</Text>
//           </View>
//           {order.products.map((product, index) => (
//             <View key={index} style={styles.tableRow}>
//               <Text style={[styles.tableCol, styles.tableCell]}>
//                 {product.product.productName}
//               </Text>
//               <Text style={[styles.tableCol, styles.tableCell]}>
//                 ₹{product.price.toFixed(2)}
//               </Text>
//               <Text style={[styles.tableCol, styles.tableCell]}>
//                 {product.quantity}
//               </Text>
//               <Text style={[styles.tableCol, styles.tableCell]}>
//                 ₹{product.total.toFixed(2)}
//               </Text>
//             </View>
//           ))}
//         </View>
//         <Text style={styles.totalAmount}>
//           Total Amount: ₹{order.totalAmount.toFixed(2)}
//         </Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.subHeading}>Payment Status</Text>
//         <Text style={styles.text}>{order.paymentStatus}</Text>
//       </View>
//     </Page>
//   </Document>
// );

// export default Invoice;

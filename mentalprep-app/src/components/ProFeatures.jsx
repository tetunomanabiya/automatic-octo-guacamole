import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from '../api/create-checkout-session.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

export default function ProFeatures() {
  const handleCheckout = async () => {
    const sessionId = await createCheckoutSession();
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId });
  };

  const handleExport = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Metric', 'Value']],
      body: [
        ['Focus', ''],
        ['Anxiety', ''],
        ['Mood', ''],
        ['Sleep', ''],
      ],
    });
    doc.save('report.pdf');
  };

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-2">Pro Features</h2>
      <button
        onClick={handleCheckout}
        className="px-4 py-2 bg-purple-500 text-white rounded mr-2"
      >
        Subscribe (¥500/mo)
      </button>
      <button
        onClick={handleExport}
        className="px-4 py-2 bg-gray-500 text-white rounded"
      >
        Export PDF
      </button>
    </div>
  );
}

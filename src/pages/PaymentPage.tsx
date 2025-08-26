import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCartStore } from '../store/cartStore';

// Load Stripe.js with your publishable key.
// Replace with your actual key from the Stripe dashboard.
const stripePromise = loadStripe('pk_test_51RxUcuD6DOBfl6Wm8iIylvRO5xQGKpI40I8tPUNhgllRxiI0LX2d15e3pPdVm0rau45vV2GNn5egj9cbcskRN0tm00BT1WwrFm');

// Payment Form Component
const PaymentForm = ({ clientSecret, totalAmount }: { clientSecret: string, totalAmount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCartStore();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Return URL after payment is complete. Change to your confirmation page.
        return_url: `${window.location.origin}/confirmation`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message || 'An unexpected error occurred.');
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const buttonText = isLoading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`;

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      <button disabled={isLoading || !stripe || !elements} id="submit"
        className="w-full bg-brand-primary text-white py-3 px-8 rounded-full flex items-center justify-center text-lg font-semibold hover:bg-brand-primary/90 transition-colors mt-8">
        <span id="button-text">
          {buttonText}
        </span>
      </button>
      {/* Show any error or success message */}
      {message && <div id="payment-message" className="mt-4 text-center text-red-500">{message}</div>}
    </form>
  );
};

// Main Payment Page
export const PaymentPage = () => {
  const location = useLocation();
  const totalAmountBdt = location.state?.totalAmount;

  const [clientSecret, setClientSecret] = useState('');
  const [isPaymentReady, setIsPaymentReady] = useState(false);
  const [totalAmountUsd, setTotalAmountUsd] = useState(0);

  useEffect(() => {
    if (!totalAmountBdt) {
      console.error("No amount found in location state.");
      return;
    }

    const fetchClientSecret = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'https://aurene.onrender.com/api'}/payment/create-payment/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount_bdt: totalAmountBdt }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        setTotalAmountUsd(data.amount_usd);
        setIsPaymentReady(true);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchClientSecret();
  }, [totalAmountBdt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold mb-2">Complete Your Purchase</h1>
        <p className="text-gray-600 dark:text-gray-400">Your total amount is: BDT {totalAmountBdt?.toFixed(2)}</p>
      </div>
      <div className="mt-10 bg-white dark:bg-dark-surface p-8 rounded-xl shadow-lg">
        {isPaymentReady && clientSecret ? (
          <Elements options={{ clientSecret }} stripe={stripePromise}>
            <PaymentForm clientSecret={clientSecret} totalAmount={totalAmountUsd} />
          </Elements>
        ) : (
          <div className="text-center mt-8">Loading payment options...</div>
        )}
      </div>
    </motion.div>
  );
};

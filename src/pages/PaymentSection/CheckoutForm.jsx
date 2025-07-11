import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const CheckoutForm = ({ packageData }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const { data: clientSecretData } = await axiosSecure.post("/create-payment-intent", {
        price: packageData.price,
      });

      const card = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecretData.clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

      if (error) {
        console.error(error);
        Swal.fire("Payment Failed", error.message, "error");
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          email: user.email,
          name: user.displayName,
          amount: packageData.price,
          transactionId: paymentIntent.id,
          date: new Date().toISOString(),
          badge: packageData.badge,
          packageTitle: packageData.title,
        };

        await axiosSecure.post("/payments", paymentInfo);
        await axiosSecure.patch(`/users/badge/${user.email}`, {
          badge: packageData.badge,
        });

        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `You have been upgraded to ${packageData.badge} badge.`,
        });

        navigate('/')

      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong during payment", "error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border p-4 rounded" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-primary w-full"
      >
        {processing ? "Processing..." : `Pay $${packageData.price}`}
      </button>
    </form>
  );
};

export default CheckoutForm


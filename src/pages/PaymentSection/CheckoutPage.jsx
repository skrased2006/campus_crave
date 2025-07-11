import { useLocation, useParams } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const CheckoutPage = () => {

  const location = useLocation();
  const { packageId } = useParams();

  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    if (location.state) {
      setPackageData({
        price: location.state.price,
        badge: location.state.badge,
        title: location.state.title,
      });
    } else {
      const packages = {
        silver: { price: 10, badge: "Silver", title: "Silver Package" },
        platinum: { price: 35, badge: "Platinum", title: "Platinum Package" },
        // add more packages as needed
      };

      if (packageId && packages[packageId.toLowerCase()]) {
        setPackageData(packages[packageId.toLowerCase()]);
      }
    }
  }, [location.state, packageId]);

  if (!packageData) {
    return <p className="text-center py-10">Loading package data...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded shadow mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">Checkout</h2>

      <div className="bg-white shadow rounded p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-2">{packageData.title}</h3>
        <p className="text-gray-700 mb-4">
          You are upgrading to <span className="font-bold">{packageData.badge}</span> membership.
        </p>
        <p className="text-primary font-extrabold text-2xl">${packageData.price}</p>
      </div>

      <Elements stripe={stripePromise}>
        <CheckoutForm packageData={packageData} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;


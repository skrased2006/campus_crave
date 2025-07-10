import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Silver",
    price: 10,
    gradient: "from-gray-100 to-white",
    border: "border-gray-400",
    text: "text-gray-700",
    features: [
      "View meals & reviews",
      "3 meal requests/month",
      "Can leave reviews",
      "Basic review visibility",
    ],
  },
  {
    name: "Gold",
    price: 20,
    gradient: "from-yellow-100 to-white",
    border: "border-yellow-500",
    text: "text-yellow-700",
    features: [
      "All Silver features",
      "6 meal requests/month",
      "Priority review visibility",
      "Can like upcoming meals",
      "Early access to upcoming menu",
    ],
  },
  {
    name: "Platinum",
    price: 35,
    gradient: "from-purple-100 to-white",
    border: "border-purple-600",
    text: "text-purple-700",
    features: [
      "All Gold features",
      "Unlimited meal requests",
      "Top review priority",
      "Vote meal to be published",
      "Exclusive premium meals",
      "Special support access",
    ],
  },
];


const MembershipSection = () => {
  const navigate = useNavigate();

  const handleCheckout = (plan) => {
    navigate(`/checkout/${plan.name.toLowerCase()}`, {
      state: {
        price: plan.price,
        badge: plan.name,
        title: `${plan.name} Package`,
      },
    });
  };


  return (
    <section className="py-20 px-4 bg-base-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-3">Upgrade to Premium</h2>
        <p className="text-gray-500 mb-12">
          Choose a package that best fits your meal lifestyle
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={`border-2 ${plan.border} rounded-2xl shadow-lg bg-gradient-to-br ${plan.gradient} p-6 relative overflow-hidden`}
            >
              {/* Ribbon */}
              <span className={`absolute top-0 right-0 bg-primary text-white text-sm font-semibold px-4 py-1 rounded-bl-xl`}>
                {plan.name}
              </span>

              <h3 className={`text-3xl font-extrabold mt-6 mb-2 ${plan.text}`}>${plan.price} <span className="text-base font-medium text-gray-500">/mo</span></h3>

              <ul className="text-left mt-6 mb-8 space-y-2 text-sm text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i}>✔️ {feature}</li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan)}
                className="btn btn-primary w-full capitalize tracking-wide"
              >
                Choose {plan.name}
              </button>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;

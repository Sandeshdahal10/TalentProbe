import React from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function Pricing() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = React.useState("free");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI-generated interview questions",
        "Basic feedback on answers",
        "Access to community forums",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "$9.99/month",
      credits: 150,
      description: "Ideal for users who need more features and credits.",
      features: [
        "150 AI-generated interview questions",
        "Detailed feedback on answers",
        "Access to community forums",
        "Enhanced History Tracking",
      ],
      default: false,
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "$19.99/month",
      credits: 650,
      description:
        "For advanced users who need the most comprehensive features.",
      features: [
        "300 AI-generated interview questions",
        "Advanced feedback on answers",
        "Access to exclusive community forums",
        "Full History Tracking",
      ],
      badge: "Most Popular",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-5 py-16 px-6">
      <div className="max-w-6xl mx-auto mb-14 flex items-start gap-4">
        <button
          onClick={() => navigate("/")}
          className="mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>
        <div className="text-center w-full">
          <h1 className="text-4xl font-bold text-gray-800">Choose Your Plan</h1>
          <p className="text-gray-500 mt-3 text-lg">
            Flexible pricing options to suit your needs. Whether you're a
            student, a professional, or an enterprise, we have a plan that's
            right for you.
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <motion.div
              key={plan.id}
              whileHover={!plan.default && { scale: 1.05 }}
              onClick={() => !plan.default && setSelectedPlan(plan.id)}
              className={`relative rounded-3xl p-8 transition-all duration-300 border
              ${
                isSelected
                  ? "border-emerald-600 shadow-2xl bg-white"
                  : "border-gray-200 bg-white shadow-md"
              }
              ${plan.default ? "cursor-default" : "cursor-pointer"}
              `}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-6 right-6 bg-emerald-600 text-white text-xs px-4 py-1 rounded-full shadow">
                  {plan.badge}
                </div>
              )}

              {/* Default Tag */}
              {plan.default && (
                <div className="absolute top-6 left-6 bg-gray-600 text-white text-xs px-4 py-1 rounded-full shadow">
                  Default
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>

              {/* Price */}

              <div className="mt-4">
                <span className="text-3xl font-bold text-emerald-600">
                  {plan.price}
                </span>
                <p className="text-gray-500 mt-1">{plan.credits} credits</p>
              </div>

              {/* Description */}
              <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                {plan.description}
              </p>

              {/* Features */}
              <div className="mt-6 space-y-3 text-left">
                {plan.features.map((features, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-emerald-600 text-sm" />
                    <span className="text-gray-700 text-sm">{features}</span>
                  </div>
                ))}
              </div>
              {!plan.default && (
                <button
                  className={`w-full mt-8 py-3 rounded-xl font-semibold transition
                  ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-lg hover:opacity-90"
                      : "bg-gray-100 text-gray-700 hover:bg-emerald-50"
                  }
                  `}
                >
                  {isSelected ? "Proceed to Pay" : "Select Plan"}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Pricing;

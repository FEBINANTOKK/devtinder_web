import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true },
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Dev Tinder",
      description: "Connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return !isUserPremium ? (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6 py-20">
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* FREE */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col justify-between transition hover:-translate-y-1 hover:border-neutral-600">
          <div>
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Free</h2>
            <p className="text-4xl font-bold mb-6">
              ₹0 <span className="text-base text-neutral-400">/ month</span>
            </p>

            <ul className="space-y-3 text-sm text-neutral-300">
              <li>10 Connection Requests / Day</li>
              <li>40 Chat Credits / Month</li>
              <li>Basic Profile Visibility</li>
              <li>Limited Search Access</li>
              <li>Standard Support</li>
              <li>View Public Profiles</li>
              <li>Community Access</li>
            </ul>
          </div>

          <button
            className="mt-8 bg-gray-700 text-gray-300 py-3 rounded-lg text-sm font-medium cursor-not-allowed"
            disabled
          >
            Current Plan
          </button>
        </div>

        {/* SILVER */}
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 flex flex-col justify-between shadow-lg transition hover:-translate-y-1 hover:border-neutral-500">
          <div>
            <h2 className="text-xl font-semibold text-neutral-300 mb-4">
              Silver
            </h2>
            <p className="text-4xl font-bold mb-6">
              ₹499 <span className="text-base text-neutral-400">/ month</span>
            </p>

            <ul className="space-y-3 text-sm text-neutral-300">
              <li>30 Connection Requests / Day</li>
              <li>100 Chat Credits / Month</li>
              <li>Priority Profile Visibility</li>
              <li>Advanced Search Filters</li>
              <li>Profile Insights</li>
              <li>Faster Support</li>
              <li>Remove Basic Ads</li>
            </ul>
          </div>

          <button
            onClick={() => handleBuyClick("silver")}
            className="mt-8 bg-neutral-400 hover:bg-neutral-300 text-black py-3 rounded-lg text-sm font-medium transition"
          >
            Buy Now
          </button>
        </div>

        {/* GOLD */}
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 flex flex-col justify-between shadow-xl transition hover:-translate-y-1 hover:border-neutral-400 relative">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-white">Gold</h2>
              <span className="text-xs bg-blue-600 px-2 py-1 rounded-md">
                Verified
              </span>
            </div>

            <p className="text-4xl font-bold mb-6">
              ₹999 <span className="text-base text-neutral-400">/ month</span>
            </p>

            <ul className="space-y-3 text-sm text-neutral-300">
              <li>150 Connection Requests / Day</li>
              <li>Unlimited Chat Credits</li>
              <li>Blue Tick Verification</li>
              <li>Top Profile Ranking</li>
              <li>Advanced Analytics Dashboard</li>
              <li>Dedicated Priority Support</li>
              <li>Ad-Free Experience</li>
            </ul>
          </div>

          <button
            onClick={() => handleBuyClick("gold")}
            className="mt-8 bg-white text-black hover:bg-neutral-200 py-3 rounded-lg text-sm font-medium transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  ) : (
    "You're are already a premium user"
  );
};

export default Premium;

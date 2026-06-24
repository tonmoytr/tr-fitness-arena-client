"use client";

import { useState } from "react";
import Link from "next/link";

export default function PricingPlans() {
  const [billingPeriod, setBillingPeriod] = useState("monthly"); // 'monthly' | 'yearly'

  const plans = {
    basic: {
      title: "Basic Plan",
      price: billingPeriod === "monthly" ? 50 : 42,
      subtext: "Free trial class for all new members",
      image:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
      features: [
        "Access to all gym equipment",
        "2 group classes per week",
        "Locker room access",
        "Standard arena baseline tracking",
      ],
    },
    premium: {
      title: "Premium Plan",
      price: billingPeriod === "monthly" ? 100 : 84,
      subtext: "Discounts for annual memberships",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
      features: [
        "Access to all gym equipment",
        "5 group classes per week",
        "Locker room access",
        "1-on-1 premium coach monitoring",
      ],
    },
  };

  return (
    <section className="w-full bg-[#171b20] py-24 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Block with Inline Billing Toggle Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-800/60 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#b8e940]" />
              <span className="text-[11px] font-black tracking-widest text-[#b8e940] uppercase font-mono">
                Our Pricing
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white font-heading leading-none">
              Exclusive Gym <br /> Packages
            </h2>
          </div>

          {/* Toggle Engine Wrapper */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
              Save 16%
            </span>
            <div className="bg-black/40 p-1.5 rounded-full border border-gray-800 flex items-center relative">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  billingPeriod === "monthly"
                    ? "bg-[#b8e940] text-black"
                    : "text-white hover:text-gray-300"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  billingPeriod === "yearly"
                    ? "bg-[#b8e940] text-black"
                    : "text-white hover:text-gray-300"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        {/* The Two-Column Landscape Split Layout Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card A: Basic Subscription Model Container */}
          <div className="bg-[#222831] border border-gray-800/40 rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch group hover:shadow-2xl hover:border-gray-700/50 transition-all duration-300">
            {/* Left Operational Details Block (Spans 7) */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#b8e940] font-mono block">
                  {plans.basic.title}
                </span>
                <div className="flex items-baseline text-white">
                  <span className="text-4xl md:text-5xl font-black font-heading">
                    ${plans.basic.price}
                  </span>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider ml-2 font-mono">
                    / month
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-normal">
                  {plans.basic.subtext}
                </p>
              </div>

              {/* Styled Interactive Button Component */}
              <Link
                href="/signUp"
                className="inline-flex items-center justify-between bg-black/40 border border-gray-700 hover:border-white w-full max-w-[240px] px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-widest text-white transition-all group-hover:scale-[1.02]"
              >
                Join Now
                <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-black font-bold text-[10px]">
                  &raquo;
                </span>
              </Link>

              {/* Functional Feature Array Checklists */}
              <div className="space-y-3 pt-4 border-t border-gray-800">
                <span className="text-[10px] font-black tracking-widest uppercase text-gray-500 block font-mono">
                  Features:
                </span>
                <ul className="space-y-2">
                  {plans.basic.features.map((feat, index) => (
                    <li
                      key={index}
                      className="text-xs text-gray-300 font-medium flex items-center gap-2"
                    >
                      <span className="text-[#b8e940] text-[10px]">&bull;</span>{" "}
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Side Portrait Graphic Leaf Block (Spans 5) */}
            <div className="md:col-span-5 rounded-2xl overflow-hidden aspect-[4/5] md:aspect-auto bg-gray-900 shadow-inner">
              <img
                src={plans.basic.image}
                alt="Basic Package Training Core"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
            </div>
          </div>

          {/* Card B: Premium/Neon High-Response Value Container */}
          <div className="bg-[#b8e940] rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch group hover:shadow-[0_20px_50px_rgba(184,233,64,0.15)] transition-all duration-300 border-4 border-transparent hover:border-[#b8e940]/40">
            {/* Left Operational Details Block (Spans 7) */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-8 text-black">
              <div className="space-y-4">
                <span className="text-[11px] font-black uppercase tracking-widest text-black/60 font-mono block">
                  {plans.premium.title}
                </span>
                <div className="flex items-baseline text-black">
                  <span className="text-4xl md:text-5xl font-black font-heading">
                    ${plans.premium.price}
                  </span>
                  <span className="text-xs text-black/60 font-bold uppercase tracking-wider ml-2 font-mono">
                    / month
                  </span>
                </div>
                <p className="text-xs text-black/70 font-semibold">
                  {plans.premium.subtext}
                </p>
              </div>

              {/* Styled Inverted Interactive Button Component */}
              <Link
                href="/signUp"
                className="inline-flex items-center justify-between bg-black text-white hover:bg-opacity-90 w-full max-w-[240px] px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-all group-hover:scale-[1.02]"
              >
                Join Now
                <span className="w-7 h-7 bg-[#b8e940] rounded-full flex items-center justify-center text-black font-bold text-[10px]">
                  &raquo;
                </span>
              </Link>

              {/* Functional Feature Array Checklists */}
              <div className="space-y-3 pt-4 border-t border-black/10">
                <span className="text-[10px] font-black tracking-widest uppercase text-black/40 block font-mono">
                  Features:
                </span>
                <ul className="space-y-2">
                  {plans.premium.features.map((feat, index) => (
                    <li
                      key={index}
                      className="text-xs text-black font-bold flex items-center gap-2"
                    >
                      <span className="text-black text-[10px]">&bull;</span>{" "}
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Side Portrait Graphic Leaf Block (Spans 5) */}
            <div className="md:col-span-5 rounded-2xl overflow-hidden aspect-[4/5] md:aspect-auto bg-black/10">
              <img
                src={plans.premium.image}
                alt="Premium Package Training Core"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

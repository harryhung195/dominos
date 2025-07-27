import React from "react";

const footerLinks = [
  {
    title: "Domino's Pizza",
    items: [
      "Order Online",
      "Our Menu",
      "Allergen & Nutritional Information",
      "Vouchers/Coupons",
      "Student Discounts",
      "InstaGift",
    ],
  },
  {
    title: "Account & More",
    items: [
      "Join the VIP Club",
      "Domino's App",
      "Contact Us",
      "Call 131 888",
      "Contact Details",
      "Feedback",
    ],
  },
  {
    title: "Corporate & Services",
    items: [
      "Feed The Knead Program",
      "Help",
      "Store Finder",
      "Site Map",
      "Zero Contact Delivery",
      "About Pricing",
      "FAQ",
      "Scam Alerts",
      "About Us",
      "Domino's Jobs",
      "Franchising",
      "Investors Site",
    ],
  },
];

const MenuFooter = () => (
  <footer className="bg-gradient-to-t from-gray-100 to-white border-t mt-10 pt-10 pb-6">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm">
      {footerLinks.map((section) => (
        <div key={section.title}>
          <h3 className="font-bold mb-3 text-gray-800 tracking-wide uppercase text-base border-b-2 border-red-500 pb-1">
            {section.title}
          </h3>
          <ul className="space-y-2">
            {section.items.map((item) => (
              <li
                key={item}
                className="hover:text-red-600 transition-colors cursor-pointer pl-2 border-l-2 border-transparent hover:border-red-500"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="text-center text-xs text-gray-400 mt-10">
      &copy; {new Date().getFullYear()} Domino's Pizza. All rights reserved.
    </div>
  </footer>
);

export default MenuFooter;

import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';

const Homescreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://www.dominos.com.au/media/2eybhfjf/au-010125-mega-family-deal_homepagehero-del_v1.jpg",
    "https://www.dominos.com.au/media/zx4hioaw/au-030225-3-to-9-feb-boost-week_homepage-hero_v2.jpg",
    "https://www.dominos.com.au/media/2eybhfjf/au-010125-mega-family-deal_homepagehero-del_v1.jpg"
  ];
 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white text-black py-4 px-6 flex justify-between items-center shadow-md">
        {/* Left - Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">Domino's</Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="flex space-x-6">
        <Link to="/menu" className="hover:text-red-600">Menu</Link>
          <Link to="/offers" className="hover:text-red-600">Offers</Link>
          <Link to="/stores" className="hover:text-red-600">Stores</Link>
          <Link to="/get-the-app" className="hover:text-red-600">Get the App</Link>
        </div>

        {/* Right - My Account */}
        <div>
          <Link to="/account" className="hover:text-red-600">My Account</Link>
         
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="relative h-96 bg-cover bg-center">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://www.dominos.com.au/media/kralp1i1/cookie-dough_au_dpa122402.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex justify-center items-center text-center text-white">
          <h1 className="text-4xl font-bold">Freshly Made, Delivered Fast</h1>
          <Link to="/menu" className="mt-4 bg-red-600 py-2 px-6 rounded text-white">Order Now</Link>
        </div>
      </section>

      {/* Slideshow and Image Section */}
      <section className="flex justify-between p-8">
        {/* Left Side - Slideshow */}
        <div className="w-2/3 mr-4">
          <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg">
            <img src={images[currentImageIndex]} alt="Slideshow" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right Side - Static Image */}
        <div className="w-1/3">
          <img 
            src="https://www.dominos.com.au/media/kyzcmr0e/au-120824_homepagebanercombotiles-update-900x900-2-2-v1.jpg" 
            alt="Combo Offer" 
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="p-8 text-center">
  <h2 className="text-3xl font-semibold mb-4">Featured Pizzas</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Featured Pizza 1 */}
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img
        src="https://www.dominos.com.au/media/xydj5x55/ftk2.png?width=500&height=500"
        alt="Featured Pizza 1"
        className="w-full h-48 object-cover rounded"
      />
      {/* "Find out more" button placed 10px below the image */}
      <Link to="/menu" className="mt-2.5 bg-red-600 py-2 px-6 rounded text-white">Find out more</Link>
    </div>

    {/* Featured Pizza 2 */}
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img
        src="https://www.dominos.com.au/media/lvakhdej/thumbnail_anz-290124_minds-meals_olo-homepage-til_option-1_v3.jpg?width=500&height=500"
        alt="Featured Pizza 2"
        className="w-full h-48 object-cover rounded"
      />
      {/* "Find out more" button placed 10px below the image */}
      <Link to="/menu" className="mt-6 bg-red-600 py-2 px-6 rounded text-white">Find out more</Link>
    </div>

    {/* Featured Pizza 3 */}
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img
        src="https://www.dominos.com.au/media/ls5g41sv/moretolove_tile_sauce.png?width=500&height=500"
        alt="Featured Pizza 3"
        className="w-full h-48 object-cover rounded"
      />
      {/* "Find out more" button placed 10px below the image */}
      <Link to="/menu" className="mt-2.5 bg-red-600 py-2 px-6 rounded text-white">Find out more</Link>
    </div>
  </div>
</section>

{/* Terms and Conditions */}
<section className="bg-blue-500 p-8 mt-8 text-white">
        <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
        <div className="space-y-4 text-sm">
          <p><strong>* 10% surcharge applies after 10pm in selected stores.</strong> 10% surcharge applies on Sundays. Surcharge of up to 20% applies on public holidays. Minimum delivery order up to $22.90 (excluding extended delivery, Sunday, and Public Holiday surcharges).</p>
          <p><strong>* Skip the Queue priority order service available for online orders only.</strong> Skip the Queue not available for pre-timed orders or UberEats, Menulog or DoorDash orders. $4 service fee applies to Skip the Queue delivery orders and $3 service fee applies to Skip the Queue pick up orders (subject to change).</p>
          <p><strong>^kJ information based on Pizza made on Classic Crust.</strong> The average adult daily energy intake is 8700kJ.</p>
          <p><strong>* The displayed prices are local prices at your selected store only.</strong> Customisation may incur further charges as displayed in order basket. Additional charges as displayed apply for extra toppings. Promotional pizzas are excluded from Buy One Get One Free and % Discount Offers Half ‘n’ Half not available for Vegan Cheese Pizzas, Gluten Free or with My Domino’s. $3.50 extra for Gluten Free Sourdough Crust. $3 extra for Vegan Cheese on Large Pizzas.</p>
          
          <h3 className="font-semibold">Ingredient & Allergen Information</h3>
          <p>Domino’s stores will endeavour to provide products that do not contain allergens if requested by you, but traces of allergens, including traces of gluten, may be unintentionally present in food due to cross-contact during store operations. We cannot guarantee that your order will not contain allergens or gluten. Subject to law, Domino’s will not be liable for any costs, fees, claims, damages, or charges whatsoever, including medical costs...</p>

          <h3 className="font-semibold">Vegan & Vegetarian Products</h3>
          <p>Our vegan and vegetarian menu items are formulated to be suitable for individuals who follow a vegan or vegetarian diet for ethical or lifestyle reasons. Our vegan and vegetarian menu items may not be suitable for people with a food allergy. Refer to our Domino’s Allergen & Nutritional Information listed for each product on the website...</p>

          <p className="text-center text-xs mt-4">* All offers not valid with any other coupon or offer.</p>
        </div>
      </section>
      
      
      <section className="bg-blue-100 text-dark p-8 mt-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {/* First line */}
    <div>
      <h4 className="font-semibold mb-2">Domino's Pizza</h4>
      <ul>
        <li><Link to="/order-online">Order Online</Link></li>
        <li><Link to="/menu">Our Menu</Link></li>
        <li><Link to="/allergen-nutritional-info">Allergen & Nutritional Information</Link></li>
        <li><Link to="/vouchers-coupons">Vouchers/Coupons</Link></li>
        <li><Link to="/student-discounts">Student Discounts</Link></li>
        <li><Link to="/instagift">InstaGift</Link></li>
      </ul>
    </div>

    {/* Second line */}
    <div>
      <h4 className="font-semibold mb-2">Account & More</h4>
      <ul>
        <li><Link to="/vip-club">Join the VIP Club</Link></li>
        <li><Link to="/dominos-app">Domino's App</Link></li>
        <li><Link to="/contact-us">Contact Us</Link></li>
        <li><Link to="/call-131-888">Call 131 888</Link></li>
        <li><Link to="/contact-details">Contact Details</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
      </ul>
    </div>

    {/* Third line */}
    <div>
      <h4 className="font-semibold mb-2">Corporate & Services</h4>
      <ul>
        <li><Link to="/feed-the-knead">Feed The Knead Program</Link></li>
        <li><Link to="/help">Help</Link></li>
        <li><Link to="/store-finder">Store Finder</Link></li>
        <li><Link to="/site-map">Site Map</Link></li>
        <li><Link to="/zero-contact-delivery">Zero Contact Delivery</Link></li>
        <li><Link to="/pricing">About Pricing</Link></li>
      </ul>
    </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
    {/* Additional items in second grid */}
    <div>
      <ul>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/scam-alerts">Scam Alerts</Link></li>
        <li><Link to="/corporate">Corporate</Link></li>
      </ul>
    </div>

    <div>
      <ul>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/dominos-jobs">Domino's Jobs</Link></li>
        <li><Link to="/franchising">Franchising</Link></li>
      </ul>
    </div>

    <div>
      <ul>
        <li><Link to="/investors-site">Investors Site</Link></li>
      </ul>
    </div>
  </div>
</section>

    </div>
  );
};

export default Homescreen;


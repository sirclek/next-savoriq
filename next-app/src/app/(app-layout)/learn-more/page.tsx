// src/app/(app-layout)/learn-more/page.tsx

import Image from 'next/image';
import logo from '/public/images/categories/logo.png';
import bottleTop from '/public/images/categories/oracle-bottle-top.png';
import bottle from '/public/images/categories/oracle-bottle.png';

const LearnMore = () => {
  return (
    <div className="flex flex-col items-center px-4 py-12">
      {/* Logo at the top */}
      <Image src={logo} alt="Savoriq Logo" className="mb-8" width={120} height={120} />
      
      {/* Main content section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-primary mb-6">Learn More</h1>
        <p className="text-lg mb-8">
          Welcome to the Learn More page. Here you can find additional information 
          about our services, products, and much more.
        </p>

        <div className="content-section mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-2">Why Choose Us?</h2>
          <p className="text-lg">
            Our services offer unparalleled quality and support. We ensure that 
            you get the best experience with our products.
          </p>
        </div>

        <div className="content-section mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-2">Our Vision</h2>
          <p className="text-lg">
            We aim to revolutionize the industry by focusing on innovation and 
            customer satisfaction.
          </p>
        </div>
      </div>

      {/* Bottle images section */}
      <div className="mt-12 flex flex-col items-center">
        <Image src={bottleTop} alt="Oracle Bottle Top" className="mb-4" width={400} height={400} />
        <Image src={bottle} alt="Oracle Bottle" width={500} height={500} />
      </div>
    </div>
  );
};

export default LearnMore;

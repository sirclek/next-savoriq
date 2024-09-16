import Image from 'next/image';
import logo from '/public/images/categories/logo.png';
import bottleTop from '/public/images/categories/oracle-bottle-top.png';
import bottle from '/public/images/categories/oracle-bottle.png';

const LearnMore = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 min-h-screen bg-background">
      {/* Logo */}
      <Image src={logo} alt="Savoriq Logo" className="mb-4" width={150} height={150} />

      {/* Main content section */}
      <div className="max-w-2xl mx-auto text-foreground">
        <h1 className="text-4xl font-bold text-primary mb-4">Learn More</h1>
        <p className="text-lg mb-8">
          Welcome to the Learn More page. Here you can find additional information about our services, products, and much more.
        </p>
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-primary mb-2">Why Choose Us?</h2>
          <p>
            Our services offer unparalleled quality and support. We ensure that you get the best experience with our products.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-primary mb-2">Our Vision</h2>
          <p>
            We aim to revolutionize the industry by focusing on innovation and customer satisfaction.
          </p>
        </div>
      </div>

      {/* Bottle images */}
      <div className="relative w-full max-w-lg">
        <Image src={bottle} alt="Oracle Bottle" className="relative z-10 w-full h-auto" />
        <Image
          src={bottleTop}
          alt="Oracle Bottle Top"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/4 h-auto"
        />
      </div>
    </div>
  );
};

export default LearnMore;

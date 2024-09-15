import Image from 'next/image';
import logo from '/public/images/categories/logo.png'; // Adjusted path
import bottleTop from '/public/images/categories/oracle-bottle-top.png'; // Adjusted path
import bottle from '/public/images/categories/oracle-bottle.png'; // Adjusted path

const LearnMore = () => {
  return (
    <div className="learn-more-container">
      {/* Logo */}
      <Image src={logo} alt="Savoriq Logo" className="savoriq-logo" width={100} height={100} />
      
      {/* Main content section */}
      <div className="main-content">
        <h1>Learn More</h1>
        <p>
          Welcome to the Learn More page. Here you can find additional information 
          about our services, products, and much more.
        </p>
        <div className="content-section">
          <h2>Why Choose Us?</h2>
          <p>
            Our services offer unparalleled quality and support. We ensure that 
            you get the best experience with our products.
          </p>
        </div>
        <div className="content-section">
          <h2>Our Vision</h2>
          <p>
            We aim to revolutionize the industry by focusing on innovation and 
            customer satisfaction.
          </p>
        </div>
      </div>

      {/* Bottle images */}
      <div className="bottle-images">
        <Image src={bottleTop} alt="Oracle Bottle Top" className="oracle-bottle-top" width={500} height={500} />
        <Image src={bottle} alt="Oracle Bottle" className="oracle-bottle" width={500} height={500} />
      </div>
    </div>
  );
};

export default LearnMore;

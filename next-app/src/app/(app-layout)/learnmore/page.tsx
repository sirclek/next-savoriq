import Link from 'next/link';
import Image from 'next/image';
import logo from '/public/images/logo/Logo.png';
import bottleTop from '/public/images/categories/oracle-bottle-top.png';
import bottle from '/public/images/categories/oracle-bottle.png';
import { getMetadata } from '@/seo/seo-utils';

export const metadata = getMetadata({
  title: 'Learn More',
  pathname: '/learnmore',
});

const LearnMore = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-60 min-h-screen bg-background">
      {/* Logo */}
      <div className="absolute top-16 right-4">
        <Image 
          src={logo} 
          alt="Savoriq Logo" 
          className="mb-4" 
          width={190} 
          height={50} 
          style={{
            backgroundColor: 'brightness(0) invert(1)', // Adjusts logo for dark mode
          }}
        />
      </div>

      {/* Main content section */}
      <div className="max-w-2xl mx-auto text-foreground">
        <h1 className="text-4xl font-bold text-primary mb-4">Learn More</h1>
        <p className="text-lg mb-8">
          Discover a new dimension of whisky exploration with SavorIQ — your gateway to an unparalleled understanding of whisky flavors. Our revolutionary platform goes beyond traditional tasting notes by offering a deep dive into the chemical compositions that define each whisky's unique profile.
        </p>

        {/* Home and Explore Buttons */}
        <div className="flex justify-center gap-4 mt-6 mb-8">
          <Link href="/" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">
            Home
          </Link>
          <Link href="/explore" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">
            Explore
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-primary mb-2">Why Choose Us?</h2>
          <p>
            Through our interactive radar chart, you can visualize and compare detailed flavor compounds, gaining insight into the specific elements that contribute to each whisky’s distinct character. Whether you’re a connoisseur seeking precise flavor profiles or a newcomer eager to explore, SavorIQ provides a user-friendly interface that makes complex data accessible and engaging.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-primary mb-2">Our Vision</h2>
          <p>
            Dive into a world where science meets sensory experience and elevate your whisky journey with The SavorIQ’s advanced search features and personalized recommendations. We aim to revolutionize how whisky is experienced, offering personalized insights for a more enriching journey.
          </p>
        </div>
      </div>

      {/* Bottle images */}
      <div className="relative w-full flex justify-center" style={{ marginTop: '-50px' }}>
        <div className="relative w-full flex justify-centre">
          <Image
        src={bottle}
        alt="Oracle Bottle"
        className="absolute top-[-200px] h-auto"
          />
          <Image
        src={bottleTop}
        alt="Oracle Bottle Top"
        className="absolute top-[-560px] left-[49.3%] transform -translate-x-1/2 w-[327px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default LearnMore;

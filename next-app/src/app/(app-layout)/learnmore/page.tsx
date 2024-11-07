import { getMetadata } from '@/seo/seo-utils';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/images/categories/logo.png';
import bottleTop from '/public/images/categories/oracle-bottle-top.png';
import bottle from '/public/images/categories/oracle-bottle.png';

export const metadata = getMetadata({
  title: 'Learn More',
  pathname: '/learnmore',
});

const LearnMore = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background text-center">
      {/* Logo */}
      <div className="absolute right-4 top-16">
        <Image
          src={logo}
          alt="Savoriq Logo"
          className="mb-4"
          width={190}
          height={50}
        />
      </div>

      {/* Main content section */}
      <div className="mx-auto max-w-2xl text-foreground">
        <h1 className="mb-4 text-4xl font-bold text-primary">Learn More</h1>
        <p className="mb-8 text-lg">
          Discover a new dimension of whisky exploration with The Oracle — your
          gateway to an unparalleled understanding of whisky flavors. Our
          revolutionary platform goes beyond traditional tasting notes by
          offering a deep dive into the chemical compositions that define each
          whisky's unique profile.
        </p>

        {/* Home and Explore Buttons */}
        <div className="mb-8 mt-6 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-hover"
          >
            Home
          </Link>
          <Link
            href="/search"
            className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-hover"
          >
            Explore
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-semibold text-primary">
            Why Choose Us?
          </h2>
          <p>
            Through our interactive circular bar plots, you can visualize and
            compare detailed flavor compounds, gaining insight into the specific
            elements that contribute to each whisky’s distinct character.
            Whether you’re a connoisseur seeking precise flavor profiles or a
            newcomer eager to explore, The Oracle provides a user-friendly
            interface that makes complex data accessible and engaging.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-semibold text-primary">
            Our Vision
          </h2>
          <p>
            Dive into a world where science meets sensory experience and elevate
            your whisky journey with The Oracle’s advanced search features and
            personalized recommendations. We aim to revolutionize how whisky is
            experienced, offering personalized insights for a more enriching
            journey.
          </p>
        </div>
      </div>

      {/* Bottle images */}
      <div
        className="relative flex w-full justify-center"
        style={{ marginTop: '-50px' }}
      >
        <div className="justify-centre relative flex w-full">
          <Image
            src={bottle}
            alt="Oracle Bottle"
            className="absolute top-[-20px] h-auto"
          />
          <Image
            src={bottleTop}
            alt="Oracle Bottle Top"
            className="absolute left-1/2 top-[-340px] h-auto w-[300px] -translate-x-1/2 transform"
          />
        </div>
      </div>
    </div>
  );
};

export default LearnMore;

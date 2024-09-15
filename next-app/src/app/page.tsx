import { Categories } from '@/categories/categories';
import { Container } from '@/common/container';
import { Hero } from '@/common/hero';
import { getMetadata } from '@/seo/seo-utils';
import Image from 'next/image';
export const metadata = getMetadata({ title: 'Home', pathname: '/' });
import mainpicture from '@/app/mainpic.png';

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Container maxWidth="xl" className="p-4">
       <div>
        <Image 
        src={mainpicture} alt='Description'
        width={1000}
        height ={300} />
       </div>
      </Container>
    </main>
  );
}

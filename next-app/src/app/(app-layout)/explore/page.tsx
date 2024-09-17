import { Container } from '@/common/container';
import {APP_DESCRIPTION,APP_TITLE,} from '@/common/common-utils';
import { routes } from '@/routing/routing-utils';
import { ButtonLink } from '@/common/button-link';
import { Divider } from '@/common/divider';
import { getMetadata } from '@/seo/seo-utils';
import Image from 'next/image';
import mainpicture from '@/app/mainpic.png';
import logo from '@/app/(app-layout)/explore/logo.png';

export const metadata = getMetadata({ title: 'Home', pathname: '/' });

export default function LandingPage() {
  return (
    <main>
      <Container maxWidth="xl" className="flex flex-col lg:flex-row items-end justify-end p-4">
        <Image 
          src={logo} 
          alt='SavorIQ Logo'
          width={300}
          height={300} 
        />
      </Container>
    </main>
  );
}


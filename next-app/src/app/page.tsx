// app/page.tsx
import LearnMore from './(app-layout)/learn-more/page';
import React from 'react';
import { Container } from '@/common/container';
import {APP_DESCRIPTION,APP_TITLE,} from '@/common/common-utils';
import { routes } from '@/routing/routing-utils';
import { ButtonLink } from '@/common/button-link';
import { Divider } from '@/common/divider';
import { getMetadata } from '@/seo/seo-utils';
import Image from 'next/image';
import mainpicture from '@/app/mainpic.png';
import underpicture from '@/app/underpicture.png';
import logo from '@/app/logo.png';
export const metadata = getMetadata({ title: 'Home', pathname: '/' });

export default function LandingPage() {
  return (
    <main>
      <LearnMore />
      <Container maxWidth="xl" className="flex flex-col lg:flex-row items-end justify-end p-1">
        <Image 
          src={logo} 
          alt='SavorIQ Logo'
          width={150}
          height={150} 
        />
      </Container>
      <Container maxWidth="xl" className="flex flex-col lg:flex-row items-center justify-center p-4">
        <Image 
          src={mainpicture} 
          alt='Whiskey collection'
          width={1000}
          height={300} 
        />
        
        <div className="flex flex-col items-center gap-4 px-4 py-12 text-center md:order-2">
          <h1 className="text-m5xl font-black text-primary sm:text-7xl lg:text-8xl">
            {APP_TITLE}
          </h1>
          <Divider />
          <p className="text-lg font-semibold text-muted-foreground sm:text-xl">
            {APP_DESCRIPTION}
          </p>
          <div className="flex gap-4">
            <ButtonLink variant="primary" href={routes.checkout()}>
              Learn More
            </ButtonLink>
            <ButtonLink variant="primary" href= {routes.explore()}>
              Explore
            </ButtonLink>
          </div>
        </div>
      </Container>
      <Container maxWidth="xl" className="flex flex-col lg:flex-row items-center justify-center p-4">
      <Image
          src={underpicture}
          alt='Whiskey Custome pic'
          width={2000}
          height={400}
          />
          </Container>
    </main>
  );
}


// app/page.tsx
import logo from '@/app/logo.png';
import mainpicture from '@/app/mainpic.png';
import underpicture from '@/app/underpicture.png';
import { ButtonLink } from '@/common/button-link';
import { APP_DESCRIPTION, APP_TITLE } from '@/common/common-utils';
import { Container } from '@/common/container';
import { Divider } from '@/common/divider';
import { routes } from '@/routing/routing-utils';
import { getMetadata } from '@/seo/seo-utils';
import Image from 'next/image';
import React from 'react';
export const metadata = getMetadata({ title: 'Home', pathname: '/' });

export default function LandingPage() {
  return (
    <main>
      <Container
        maxWidth="xl"
        className="flex flex-col items-end justify-end p-1 lg:flex-row"
      >
        <Image src={logo} alt="SavorIQ Logo" width={150} height={150} />
      </Container>
      <Container
        maxWidth="xl"
        className="flex flex-col items-center justify-center p-4 lg:flex-row"
      >
        <Image
          src={mainpicture}
          alt="Whiskey collection"
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
            <ButtonLink variant="primary" href={routes.learnmore()}>
              Learn More
            </ButtonLink>
            <ButtonLink variant="primary" href={routes.search()}>
              Explore
            </ButtonLink>
          </div>
        </div>
      </Container>
    </main>
  );
}

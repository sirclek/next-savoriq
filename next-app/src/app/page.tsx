import { Container } from '@/common/container';
import {APP_DESCRIPTION,APP_TITLE,} from '@/common/common-utils';
import { routes } from '@/routing/routing-utils';
import { ButtonLink } from '@/common/button-link';
import { Divider } from '@/common/divider';
import { getMetadata } from '@/seo/seo-utils';
import Image from 'next/image';
import mainpicture from '@/app/mainpic.png';

export const metadata = getMetadata({ title: 'Home', pathname: '/' });

export default function LandingPage() {
  return (
    <main>
      <div className="border-b">
        <div className="flex flex-col items-center gap-4 px-4 py-12 text-center">
          <h1 className="text-5xl font-black text-primary sm:text-7xl lg:text-8xl">
            {APP_TITLE}
          </h1>
          <Divider />
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-semibold text-muted-foreground sm:text-xl">
              {APP_DESCRIPTION}
            </p>
          </div>

          <div className="flex gap-4">
            <ButtonLink variant="primary" href={routes.search()}>
              Learn More
            </ButtonLink>
            <ButtonLink variant="primary" href={routes.search()}>
              Explore
            </ButtonLink>
          </div>
        </div>
      </div>

      <Container maxWidth="xl" className="p-4">
        <div>
          <Image 
            src={mainpicture} 
            alt='Description'
            width={1000}
            height={300} 
          />
        </div>
      </Container>
    </main>
  );
}


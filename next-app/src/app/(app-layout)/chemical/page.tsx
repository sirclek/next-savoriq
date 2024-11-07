import { Chemical } from '@/common/object-types';
import { Paper } from '@/common/paper';
import { Section } from '@/common/section';
import { getMetadata } from '@/seo/seo-utils';
import Image from 'next/image';

type WhiskeyDetailsProps = {
  chemical: Chemical;
};

export const metadata = getMetadata({ title: 'Home', pathname: '/' });

export default function LandingPage({ chemical }: WhiskeyDetailsProps) {
  return (
    <>
      <Section>
        <Paper>
          <div className="flex flex-col gap-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-lg">
                <Image
                  className="rounded bg-white object-contain"
                  src="/images/chemicals/1.jpg"
                  alt="Chemical Image"
                  priority
                  fill
                />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col gap-2 text-center">
                  <div className="text-3xl font-bold">
                    {<p>Chemical Name 1</p>}
                  </div>
                  <div className="text-2xl">{/* for text*/}</div>
                </div>
                <div className="text-sm">
                  <p>Chemical description 1 </p>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </Section>

      <Section>
        <Paper></Paper>
      </Section>
    </>
  );
}

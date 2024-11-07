import { Chemical } from '@/common/object-types';
import { Paper } from '@/common/paper';
import { Section } from '@/common/section';
import { getMetadata } from '@/seo/seo-utils';
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
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col gap-2 text-center">
                  <div className="text-3xl font-bold">{<p>Explore</p>}</div>
                  <div className="text-2xl">{/* for text*/}</div>
                </div>
                <div className="text-sm">
                  <p>Explore </p>
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

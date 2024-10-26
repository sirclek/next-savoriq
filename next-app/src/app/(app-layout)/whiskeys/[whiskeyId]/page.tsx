import { Id } from '@/common/common-types';
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { Section, SectionTitle } from '@/common/section';
import { getObjectById } from '@/db/db-utils';
import {
  RelatedProductType,
  RelatedProducts,
} from '@/whiskeys/related-whiskey';
import { WhiskeyDetails } from '@/whiskeys/whiskey-details';
import { notFound } from 'next/navigation';
import { Whiskey } from '@/common/object-types';

export type WhiskeyPageProps = {
  params: {
    whiskeyId: Id;
  };
};

export default async function WhiskeyPage({ params }: WhiskeyPageProps) {
  const whiskeyId = Number(params.whiskeyId);

  const whiskey = await getObjectById<Whiskey>(whiskeyId, 'whiskeys');

  if (!whiskey) notFound();
  console.log(whiskey);
  return (
    <div className="flex flex-col gap-4">
      <main>
        <PageTitle title={whiskey.name} />
        <Paper>
          <WhiskeyDetails whiskey={whiskey} />
        </Paper>
      </main>
      <Section as="aside">
        <SectionTitle as="h2">Related by Flavour</SectionTitle>
        <Paper>
          <RelatedProducts
            whiskeyId={whiskeyId}
            type={RelatedProductType.FLAVOUR}
          />
        </Paper>
      </Section>
      <Section as="aside">
        <SectionTitle as="h2">Related by Chemicals</SectionTitle>
        <Paper>
          <RelatedProducts
            whiskeyId={whiskeyId}
            type={RelatedProductType.CHEMICAL}
          />
        </Paper>
      </Section>
    </div>
  );
}

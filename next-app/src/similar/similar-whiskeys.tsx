'use client';

import type { MatchType, Whiskey } from '@/common/custom-types';
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { RelatedWhiskeyRow } from '@/whiskeys/whiskey-related-row-fetcher';
import { SimilarHoverProvider } from './similar-context';
import RadarCompareChart from '@/radar/radar-compare-chart';

export type SimilarPageProps = {
  compWhiskey: Whiskey;
  type: MatchType;
  keepfirst: boolean;
};

export default function SimilarPage({ compWhiskey, type, keepfirst }: SimilarPageProps) {
  return (
    <SimilarHoverProvider>
      <main className="flex flex-col" style={{ height: '90vh' }}>
        <PageTitle title={`Most Similar Whiskeys - by ${type.charAt(0).toUpperCase() + type.slice(1)}`} />
        <Paper className="flex-1 flex flex-col justify-center">
          <div className="flex items-center justify-center">
            <RelatedWhiskeyRow whiskey={compWhiskey} type={type} count={5} keepfirst={keepfirst} showSimilarity={true} />
          </div>
          <div className="flex justify-center mt-4">
        <RadarCompareChart whiskey={compWhiskey} />
          </div>
        </Paper>
      </main>
    </SimilarHoverProvider>
  );
}

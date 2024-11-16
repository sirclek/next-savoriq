import type { MatchType, Whiskey, WhiskeyWithSimilarity, ChartData } from '@/common/custom-types';
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import RadarCompareChart from '@/radar/radar-compare-chart';
import { RelatedWhiskeyLine } from '@/whiskeys/whiskey-related-line-fetcher';
import { SimilarHoverProvider, useHover } from './similar-context';
import { WhiskeyRow } from '@/whiskeys/whiskey-line';

export type SimilarPageProps = {
  masterWhiskey: Whiskey;
  compWhiskey: WhiskeyWithSimilarity[];
  type: MatchType;
  graphLabels: ChartData[];
};

function SimilarPageContent({ masterWhiskey, compWhiskey, type, graphLabels }: SimilarPageProps) {
  const hoverContext = useHover();
  let hoveredWhiskeyId = hoverContext.hoveredWhiskeyId;
  let lastHoveredWhiskeyId = hoverContext.lastHoveredWhiskeyId;

  return (
    <main className="flex flex-col" style={{ height: '90vh' }}>
      <PageTitle title={`Most Similar Whiskeys - by ${type.charAt(0).toUpperCase() + type.slice(1)}`} />
      <Paper className="max-v-height 100px flex flex-1 flex-row justify-center">
        <div className="flex items-center justify-center md:col-span-1">
          <WhiskeyRow whiskeys={compWhiskey} showSimilarity={true} orientation={'column'} />
        </div>
        <div className="mt-4 flex justify-center" style={{ width: '70%' }}>
          <RadarCompareChart masterWhiskey={masterWhiskey} compWhiskey={compWhiskey} graphLabels={graphLabels} />
        </div>
      </Paper>
    </main>
  );
}

export default function SimilarPage({ masterWhiskey, compWhiskey, type, graphLabels}: SimilarPageProps) {
  return (
    <SimilarHoverProvider>
      <SimilarPageContent masterWhiskey={masterWhiskey} compWhiskey={compWhiskey} type={type} graphLabels={graphLabels}/>
    </SimilarHoverProvider>
  );
}

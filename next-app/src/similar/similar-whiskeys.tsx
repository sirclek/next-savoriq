import type { MatchType, Whiskey } from '@/common/custom-types';
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { RelatedWhiskeyRow } from '@/whiskeys/whiskey-related-row';


export type SimilarPageProps = {
  compWhiskey: Whiskey;
  type: MatchType;
};

export default function SimilarPage({compWhiskey, type }: SimilarPageProps) {

  return (
    <div className="flex min-h-screen flex-col gap-0">
      <main className="min-h-full flex-1">
        <PageTitle title={`Most Similar Whiskeys - by ${type.charAt(0).toUpperCase() + type.slice(1)}`} />
            
            <Paper className="h-full">
              <div className="justify-center items-center">
              <RelatedWhiskeyRow whiskey={compWhiskey} type={type} count={5}/>
              </div>
            </Paper>
      </main>
    </div>
  );
}

import { Paper } from '@/common/paper';
import { WhiskeyGrid } from '@/whiskeys/whiskey-grid';
import type { WhiskeyFilterResponse } from './search-types';

type SearchResultsProps = {
  data: WhiskeyFilterResponse;
};

export function SearchResults({ data }: SearchResultsProps) {
  return (
    <Paper>
      <div className="page:hidden">
        <WhiskeyGrid whiskeys={data.whiskeys} />
      </div>
    </Paper>
  );
}

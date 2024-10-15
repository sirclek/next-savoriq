import { Paper } from '@/common/paper';
import { WhiskeyGrid, WhiskeyGridSkeleton } from '@/products/product-grid';
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

import { Paper } from '@/common/paper';
import { ProductGridSkeleton, WhiskeyGrid } from '@/products/product-grid';
import type { WhiskeyFilterResponse } from './search-types';

type SearchResultsProps = {
  data: WhiskeyFilterResponse;
};

export function SearchResults({ data }: SearchResultsProps) {
  return (
    <Paper>
      <div className="hidden group-has-[[data-pending]]/page:block">
        <ProductGridSkeleton itemCount={8} />
      </div>
      <div className="group-has-[[data-pending]]/page:hidden">
        <WhiskeyGrid whiskeys={data.whiskeys} />
      </div>
    </Paper>
  );
}

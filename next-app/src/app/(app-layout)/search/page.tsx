import { PageTitle } from '@/common/page-title';
import { Section, SectionTitle } from '@/common/section';
import { WhiskeyFilter } from '@/search/product-filter';
import { filterProducts } from '@/search/search-fetchers';
import { SearchResults } from '@/search/search-results';
import { SelectedFilters } from '@/search/selected-filters';
import { SelectedOptionsProvider } from '@/search/selected-options-context';
import { getMetadata } from '@/seo/seo-utils';
import { z } from 'zod';

export const metadata = getMetadata({
  title: 'Search Whiskeys',
  pathname: '/search',
});

const singleValueSchema = z
  .string()
  .or(z.array(z.string()).transform((value) => value[0]))
  .optional();

const multipleValuesSchema = z
  .string()
  .transform((value) => [value])
  .or(z.array(z.string()))
  .optional();

const searchParamsSchema = z.object({
  sortings: singleValueSchema,
  brands: multipleValuesSchema,
  ages: multipleValuesSchema,
  regions: multipleValuesSchema,
  types: multipleValuesSchema,
  abvs: multipleValuesSchema,
  cask_types: multipleValuesSchema,
  special_notes: multipleValuesSchema
});

type SearchPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // console.log("Main", searchParams);
  const data = await filterProducts(searchParamsSchema.parse(searchParams));
  // console.log("Selected", data.whiskeys);
  return (
    <main className="group/page">
      <PageTitle title="Search Whiskeys" srOnly />
      <SelectedOptionsProvider data={data}>
        <div className="grid gap-2 md:grid-cols-[theme(spacing.72)_1fr]">
          <Section className="sticky top-24 hidden max-h-[80vh] overflow-auto px-2 md:block">
            <SectionTitle as="h2" srOnly>
              Filter
            </SectionTitle>
            {/* filter pane */}
            <WhiskeyFilter data={data} />
          </Section>
          <Section>
            <SectionTitle as="h2" srOnly>
              Search Results
            </SectionTitle>
            <div className="flex flex-col gap-2">
              <SelectedFilters />
              <SearchResults data={data} />
            </div>
          </Section>
        </div>
      </SelectedOptionsProvider>
    </main>
  );
}

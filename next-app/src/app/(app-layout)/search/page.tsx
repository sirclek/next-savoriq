import { PageTitle } from '@/common/page-title';
import { Section, SectionTitle } from '@/common/section';
import { WhiskeyFilter } from '@/search/whiskey-filter';
import { filterProducts } from '@/search/search-fetchers';
import { SearchResults } from '@/search/search-results';
import { SelectedFilters } from '@/search/selected-filters';
import { SelectedOptionsProvider } from '@/search/selected-options-context';
import { getMetadata } from '@/seo/seo-utils';

export const metadata = getMetadata({
  title: 'Search Whiskeys',
  pathname: '/search',
});

type SearchPageProps = {
  searchParams: Record<string, string | string[]>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  console.log("Main", searchParams);
  const data = await filterProducts(searchParams);
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

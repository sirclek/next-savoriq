/* layout.tsx */
import { ButtonLink } from '@/common/button-link';
import { APP_TITLE } from '@/common/common-utils';
import { Container } from '@/common/container';
import { HomeIcon, SearchIcon } from '@/common/icons';
import { NextLink } from '@/routing/next-link';
import { ThemeToggle } from '@/styles/theme-toggle';

type LayoutProps = React.PropsWithChildren;

export function Layout({ children }: LayoutProps) {
  return (
    <div className="grid min-h-screen grid-rows-[1fr_auto]">
      <LayoutHeader />
      {children}
      <LayoutFooter />
    </div>
  );
}

export function LayoutHeader() {
  return (
    <header className="fixed z-10 h-app-header w-full border-b bg-background/75 backdrop-blur-md">
      <Container maxWidth="xl" className="flex h-full items-center justify-between px-4">
        <NextLink href="/" className="text-2xl font-bold text-primary">
          {/* Change next-shopper to SavourIQ */}
          SavorIQ
        </NextLink>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}

export function LayoutFooter() {
  return (
    <footer className="pb-16 md:pb-0">
      <Container
        maxWidth="xl"
        className="flex items-center justify-between px-4 py-6"
      >
        <p className="text-muted-foreground">
          {new Date().getFullYear()} © SavourIQ
        </p>
      </Container>
    </footer>
  );
}

import { ButtonLink } from '@/common/button-link';
import { ErrorPage } from '@/error-handling/error-page';
import { getMetadata } from '@/seo/seo-utils';
import { StatusCodes } from 'http-status-codes';
import Image from 'next/image';
import logo from '@/app/logo.png';

export const metadata = getMetadata({
  title: 'Not Found',
  description: 'The resource you are looking for is not found.',
});

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <Image src={logo} alt="Whiskey collection" width={300} height={300} />
      <ErrorPage statusCode={StatusCodes.NOT_FOUND} message="This page could not be found">
        <div className="flex flex-row items-center justify-center gap-4 p-4 w-full">
          <ButtonLink href="/" className="w-48 text-center py-2">
            Back to Home
          </ButtonLink>
          <ButtonLink href="javascript:history.back()" className="w-48 text-center py-2">
            Go Back
          </ButtonLink>
        </div>
      </ErrorPage>
    </div>
  );
}

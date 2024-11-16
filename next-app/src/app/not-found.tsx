import { ButtonLink } from '@/common/button-link';
import { ErrorPage } from '@/error-handling/error-page';
import { StatusCodes } from 'http-status-codes';
import Image from 'next/image';
import {APP_LOGO_PATH} from '@/common/common-utils';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <Image src={APP_LOGO_PATH} alt="Whiskey collection" width={300} height={300} />
      <ErrorPage statusCode={StatusCodes.NOT_FOUND} message="This page could not be found">
        <div className="flex w-full flex-row items-center justify-center gap-4 p-4">
          <ButtonLink href="/" className="w-48 py-2 text-center">
            Back to Home
          </ButtonLink>
          <ButtonLink href="javascript:history.back()" className="w-48 py-2 text-center">
            Go Back
          </ButtonLink>
        </div>
      </ErrorPage>
    </div>
  );
}

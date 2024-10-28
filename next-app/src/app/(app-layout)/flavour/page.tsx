import { Container } from '@/common/container';
import { APP_DESCRIPTION, APP_TITLE } from '@/common/common-utils';
import { routes } from '@/routing/routing-utils';
import { ButtonLink } from '@/common/button-link';
import { getMetadata } from '@/seo/seo-utils';
import Image from 'next/image';
import type { Flavour } from '@/common/object-types';
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { Section } from '@/common/section';

type WhiskeyDetailsProps = {
    flavour: Flavour;
};

export const metadata = getMetadata({ title: 'Home', pathname: '/' });

export default function LandingPage({ flavour }: WhiskeyDetailsProps) {
    return (
        <>
            <Section>
                <Paper>
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-lg">
                                <Image
                                    className="rounded bg-white object-contain"
                                    src="/images/flavours/taste/smoky.jpg"
                                    alt="Smoky Image"
                                    priority
                                    fill
                                />
                            </div>
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex flex-col gap-2 text-center">
                                    <div className="text-3xl font-bold">
                                        {<p>Flavour name</p>}
                                    </div>
                                    <div className="text-2xl">
                                        <p>Description here:</p>
                                    </div>
                                </div>
                                <div className="text-sm">
                                    <p>More description here:</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
            </Section>
        </>
    );
}

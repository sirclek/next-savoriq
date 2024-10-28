import { Id } from '@/common/common-types';
import { PageTitle } from '@/common/page-title';
import { Paper } from '@/common/paper';
import { Section } from '@/common/section';
import Image from 'next/image';
import { getOneWhiskeyById } from '@/whiskeys/whiskey-fetcher';
import { notFound } from 'next/navigation';

export type FlavourVisualizePageProps = {
    params: {
        whiskeyId: Id;
    };
};

export default async function ChemicalVisualizePage({ params }: FlavourVisualizePageProps) {
    const whiskeyId = Number(params.whiskeyId);
    const whiskey = await getOneWhiskeyById(whiskeyId);

    if (!whiskey) notFound();

    return (
        <div className="flex flex-col gap-4">
            <main>
                <PageTitle title={`Compound Visual - ${whiskey.name}`} />
                <Paper>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Whiskey Image */}
                        <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-lg">
                            <Image
                                className="rounded bg-white object-contain"
                                src={`/images/whiskeys/${whiskey.id}.png`}
                                alt={whiskey.name}
                                priority
                                fill
                            />
                        </div>

                        {/* Radar Chart Image */}
                        <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-lg">
                            <Image
                                className="rounded bg-white object-contain"
                                src={`/images/image_assets/example-radar.png`}
                                alt={`${whiskey.name} Chemical Radar Chart`}
                                priority
                                fill
                            />
                        </div>

                        {/* Whiskey Name */}
                        <div className="flex flex-col items-center justify-center gap-4">
                            <h2 className="text-3xl font-bold">{whiskey.name}</h2>
                        </div>

                    </div>
                </Paper>
            </main>
        </div>
    );
}
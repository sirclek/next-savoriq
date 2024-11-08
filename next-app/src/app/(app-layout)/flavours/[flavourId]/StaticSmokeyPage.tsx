'use client'; // Client-side rendering

import React from 'react';
import Image from 'next/image';
import { Container } from '@/common/container';
import logo from '/public/images/logo/SavourIQ Logo.png'; // Importing logo

export default function StaticSmokeyPage() {
  return (
    <div className="flex justify-center items-start min-h-screen bg-black text-white pt-4">
      <Container maxWidth="lg">
        {/* Header with logo aligned to the right */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex-grow"></div> {/* Spacer to push logo to the far right */}
          <Image src={logo} alt="SavourIQ Logo" width={120} height={60} /> {/* Logo only */}
        </div>

        {/* Smokey Flavor Profile */}
        <div className="p-4 rounded-lg shadow-md bg-black text-white">
          <h2 className="text-center text-2xl font-bold mb-4">Smoky</h2>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Flavor Image */}
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="/images/flavours/Taste/Smoky.jpg"
                alt="Smoky"
                width={500}
                height={300}
                className="rounded border border-gray-700"
              />
            </div>

            {/* Flavor Description and Details */}
            <div className="md:w-1/2">
              <p className="mb-4 leading-relaxed">
                The smoky flavor commonly found in whisky and other foods comes from compounds formed
                during processes like peat burning, wood charring, or smoking over open flames. These compounds impart a deep, rich, and sometimes slightly medicinal smokiness.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Guaiacol: 0.5-2% (primary smoky and medicinal notes)</li>
                <li>Phenols: 0.2-1% (adds antiseptic, charred flavors)</li>
                <li>Cresols: 0.1-0.5% (contributes to tar-like, earthy notes)</li>
                <li>Methoxyphenols: Trace amounts (provides sweet, smoky nuances)</li>
                <li>Acetic Acid: Trace amounts (enhances complexity with acidity)</li>
                <li>Sugars and Carbohydrates: Varies (balances the intense smoky flavors)</li>
                <li>Fatty Acids: Minor components (adds richness and mouthfeel)</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

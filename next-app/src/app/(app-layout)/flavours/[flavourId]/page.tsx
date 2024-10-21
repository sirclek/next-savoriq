'use client';  // Client-side rendering

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/common/container';
import logo from '/public/images/logo/Logo.png';  // Importing logo

// Define the structure for each flavor's data
type Flavour = {
  title: string;
  description: string;
  flavourImage: string;  // Flavor-related image
  relatedWhiskies: { name: string; img: string; }[];
};

// Define the full flavor data type
type FlavourData = {
  [key: string]: Flavour;  // Allows string indexing
};

// Flavour data for flavour profile page
const flavourData: FlavourData = {
  smoky: {
    title: 'Smokey',
    description: `A smoky whiskey flavor is rich, bold, and earthy, evoking the essence of charred wood and campfire embers. It brings forward notes of peat, often with a hint of leather, toasted oak, and sometimes even a touch of tobacco or dark chocolate.`,
    flavourImage: '/images/flavours/Taste/Smoky.jpg',  // This should be your smoky image path
    relatedWhiskies: [
      { name: 'Wolfburn No. 375', img: '/images/whiskeys/21.png' },
      { name: 'Crown Royale Vanilla', img: '/images/whiskeys/22.png' },
      { name: 'Australian Whisky 23', img: '/images/whiskeys/23.png' },
      { name: 'Chivas Regal', img: '/images/whiskeys/24.png' },
      { name: 'Jim Beam Vanilla', img: '/images/whiskeys/25.png' },
    ],
  },
  sweet: {
    title: 'Sweet',
    description: `Sweetness is primarily sensed through sugar molecules like glucose and fructose, but can also come from artificial sweeteners. Sweet flavors balance out intense or bitter tastes.`,
    flavourImage: '/images/flavours/Taste/Sweet.jpg',
    relatedWhiskies: [
      { name: 'Whiskey A', img: '/images/whiskeys/6.png' },
      { name: 'Whiskey B', img: '/images/whiskeys/7.png' },
      { name: 'Whiskey C', img: '/images/whiskeys/8.png' },
    ],
  },
  peaty: {
    title: 'Peaty',
    description: `Peat's distinctive flavour comes from phenolic compounds released during peat burning in whisky production. Guaiacol, cresols, and phenols contribute to a smoky, earthy character.`,
    flavourImage: '/images/flavours/Finish/Peaty.jpg',
    relatedWhiskies: [
      { name: 'Whiskey D', img: '/images/whiskeys/9.png' },
      { name: 'Whiskey E', img: '/images/whiskeys/10.png' },
      { name: 'Whiskey F', img: '/images/whiskeys/11.png' },
    ],
  },
  vanilla: {
    title: 'Vanilla',
    description: `Vanilla's distinctive flavor comes primarily from vanillin, a compound responsible for its sweet and aromatic taste.`,
    flavourImage: '/images/flavours/Aroma/Vanilla.jpg',
    relatedWhiskies: [
      { name: 'Wolfburn No. 375', img: '/images/whiskeys/6.png' },
      { name: 'Crown Royale Vanilla', img: '/images/whiskeys/7.png' },
      { name: 'Chivas Regal', img: '/images/whiskeys/8.png' },
    ],
  },
};

export default function FlavourPage() {
  const [selectedFlavour, setSelectedFlavour] = useState<string | null>(null);

  // If a flavour is selected, show the detailed flavour profile view
  if (selectedFlavour && flavourData[selectedFlavour]) {
    const flavour = flavourData[selectedFlavour];

    return (
      <div className="flex h-screen">
        {/* Main content without sidebar */}
        <div className="w-full p-8">
          <div className="flex justify-between items-start">
            {/* Page Title & Logo */}
            <div className="w-1/2">
              <h1 className="text-3xl font-bold mb-4">Explore - {flavour.title} Flavour Profile</h1>
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-gray-500 text-white rounded">Info</button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded">Flavour Profile</button>
              </div>
            </div>
            <div className="w-1/2 flex justify-end">
              <Image
                src={logo}
                alt="SavourIQ Logo"
                width={150}
                height={75}  // Increase logo size
              />
            </div>
          </div>

          <div className="flex mt-8">
            {/* Left Column: Flavour Image */}
            <div className="w-1/2 flex justify-center">
              <Image
                src={flavour.flavourImage}  // Show the flavour-related image (e.g. smokey image)
                alt={flavour.title}
                width={500}  // Adjust as needed
                height={300}  // Adjust as needed
                className="rounded border"
              />
            </div>

            {/* Right Column: Description */}
            <div className="w-1/2 pl-8">
              <p>{flavour.description}</p>
            </div>
          </div>

          {/* Related Whiskies */}
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4 text-center">Explore - {flavour.title} Apparent Whiskies</h2>
            <div className="flex justify-center gap-4">
              {flavour.relatedWhiskies.map((whiskey, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Image
                    src={whiskey.img}
                    alt={whiskey.name}
                    width={100}
                    height={150}
                    className="rounded border"
                  />
                  <p>{whiskey.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Flavour Selection Page without sidebar
  return (
    <main>
      <div className="w-full">
        {/* Header */}
        <Container maxWidth="xl" className="flex items-center justify-between p-4">
          <h1 className="text-3xl font-bold text-center mx-auto">Explore Flavours</h1>
          <Image src={logo} alt="SavourIQ Logo" width={100} height={50} />
        </Container>

        {/* Flavour Profile Section */}
        <Container maxWidth="xl" className="grid grid-cols-4 gap-4 p-4">
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setSelectedFlavour('smoky')}>
            <Image src="/images/flavours/Taste/Smoky.jpg" alt="Smoky" width={100} height={100} />
            <p>Smoky</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setSelectedFlavour('vanilla')}>
            <Image src="/images/flavours/Aroma/Vanilla.jpg" alt="Vanilla" width={100} height={100} />
            <p>Vanilla</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setSelectedFlavour('sweet')}>
            <Image src="/images/flavours/Taste/Sweet.jpg" alt="Sweet" width={100} height={100} />
            <p>Sweet</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setSelectedFlavour('peaty')}>
            <Image src="/images/flavours/Finish/Peaty.jpg" alt="Peaty" width={100} height={100} />
            <p>Peaty</p>
          </div>
        </Container>
      </div>
    </main>
  );
}

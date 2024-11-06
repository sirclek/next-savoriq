import { dataTypes, fetchData } from '@/db/db-utils';
import p5 from 'p5';
import React, { useEffect, useRef, useState } from 'react';
import { Flavour, Whiskey } from '../common/object-types';

type RadarChartProps = {
  whiskey: Whiskey;
};

type FlavourData = {
  id: number;
  name: string;
  subType: string;
  value: number;
};

type ChemicalData = {
  id: number;
  name: string;
  value: number;
};

const RadarChart: React.FC<RadarChartProps> = ({ whiskey }) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [dataType, setDataType] = useState<'chemicals' | 'flavours'>(
    'chemicals',
  );
  const [flavours, setFlavours] = useState<FlavourData[]>([]);
  const chemicals = whiskey.chemicals;

  useEffect(() => {
    const fetchFlavours = async () => {
      const flavours: FlavourData[] = [];
      const allFlavours = await fetchData<Flavour>(dataTypes.FLAVOURS);
      for (let i = 1; i <= whiskey.flavours.length; i++) {
        const flavour = allFlavours.find(
          (flavour) => flavour.id === i,
        ) as Flavour;
        flavours.push({
          id: flavour.id,
          name: flavour.name,
          subType: flavour.subType,
          value: whiskey.flavours[i - 1],
        });
      }
      setFlavours(flavours);
    };

    fetchFlavours();
  }, [whiskey.flavours]);

  useEffect(() => {
    const updateDimensions = () => {
      if (divRef.current) {
        setWidth(divRef.current.offsetWidth);
        setHeight(divRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => {
        if (divRef.current) {
          p.createCanvas(width, height).parent(divRef.current);
        }
        p.textSize(16);
      };

      p.draw = () => {
        const data = dataType === 'chemicals' ? chemicals : flavours;
        const numPoints = data.length;
        const radius = Math.min(width, height) / 2.5;
        const maxValue = Math.max(...data.map((d) => d.value));
        const centerX = p.width / 2;
        const centerY = p.height / 2;

        p.background(255);
        p.fill(0);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(14);
        p.text(
          `Radar Diagram - Whisky ${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`,
          centerX,
          30,
        );

        // Draw Radar Polygon
        p.stroke(180, 120, 60, 150);
        p.fill(180, 120, 60, 150);
        p.beginShape();
        for (let i = 0; i < numPoints; i++) {
          const angle = (p.TWO_PI / numPoints) * i;
          const x =
            centerX + p.cos(angle) * (data[i].value / maxValue) * radius;
          const y =
            centerY + p.sin(angle) * (data[i].value / maxValue) * radius;
          p.vertex(x, y);
        }
        p.endShape(p.CLOSE);

        // Draw lines and labels
        p.stroke(0);
        p.fill(0);
        for (let i = 0; i < numPoints; i++) {
          const angle = (p.TWO_PI / numPoints) * i;
          const x = centerX + p.cos(angle) * radius;
          const y = centerY + p.sin(angle) * radius;
          p.line(centerX, centerY, x, y);
          p.textAlign(p.CENTER, p.CENTER);
          p.textFont('sans-serif');
          p.textSize(16);
          p.text(data[i].name, x, y - 10);
        }

        // Draw border
        p.noFill();
        p.stroke(200);
        p.rect(0, 0, p.width - 1, p.height - 1);
      };
    };

    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, [width, height, chemicals, flavours, dataType]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          height: '10%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10%',
        }}
      >
        <button
          onClick={() => setDataType('chemicals')}
          className={`text-xl ${dataType === 'chemicals' ? 'bg-primary' : 'bg-primary-light'} ${dataType === 'chemicals' ? 'text-white' : 'text-gray-700'}`}
          style={{
            padding: '1% 10%',
            borderRadius: '10px',
          }}
        >
          Chemicals
        </button>
        <button
          onClick={() => setDataType('flavours')}
          className={`text-xl ${dataType === 'flavours' ? 'bg-primary' : 'bg-primary-light'} ${dataType === 'flavours' ? 'text-white' : 'text-gray-700'}`}
          style={{
            padding: '1% 10%',
            borderRadius: '10px',
          }}
        >
          Flavours
        </button>
      </div>
      <div ref={divRef} style={{ width: '100%', height: '95%' }}></div>
    </div>
  );
};

export default RadarChart;

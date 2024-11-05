import p5 from 'p5';
import React, { useEffect, useRef, useState } from 'react';
import { Whiskey, Flavour } from '../common/object-types';
import { fetchData, dataTypes } from '@/db/db-utils';

type RadarChartProps = {
  whiskey: Whiskey;
};

const RadarChart: React.FC<RadarChartProps> = ({ whiskey }) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(0);

  const chemicals = whiskey.chemicals;
  const flavours: Flavour[] = [];

  useEffect(() => {
    const fetchFlavours = async () => {
      const allFlavours = await fetchData<Flavour>(dataTypes.FLAVOURS);
      const flavourMap = new Map(allFlavours.map(flavour => [flavour.name, flavour.subType]));
      const flavours = whiskey.aroma.concat(whiskey.taste, whiskey.finish).map(flavour => ({
        ...flavour,
        subType: flavourMap.get(flavour.name)
      }));
      console.log(flavours, flavourMap);
    };

    fetchFlavours();
  }, [whiskey]);

  useEffect(() => {
    if (divRef.current) {
      setWidth(divRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (divRef.current) {
        setWidth(divRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const sketch = (p: p5) => {
      const numPoints = chemicals.length;
      const radius = width / 2.5; // Adjust to fit within canvas size
      const points: p5.Vector[] = [];
      let radarColor: p5.Color;

      p.setup = () => {
        if (divRef.current) {
          p.createCanvas(width, width).parent(divRef.current);
        }
        radarColor = p.color(180, 120, 60, 150);
        p.textSize(16);

        for (let j = 0; j < numPoints; j++) {
          let angle = (p.TWO_PI / numPoints) * j;
          let x =
            p.width / 2 + p.cos(angle) * (chemicals[j].value / 100) * radius;
          let y =
            p.height / 2 + p.sin(angle) * (chemicals[j].value / 100) * radius;
          points.push(p.createVector(x, y));
        }
      };

      p.draw = () => {
        p.background(255);
        p.fill(0);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(12);
        p.text('Radar Diagram - Whisky Chemicals', p.width / 2, 30);

        p.stroke(radarColor);
        p.fill(radarColor);
        p.beginShape();
        for (let j = 0; j < numPoints; j++) {
          p.vertex(points[j].x, points[j].y);
        }
        p.endShape(p.CLOSE);

        p.stroke(0);
        p.fill(0);
        for (let i = 0; i < numPoints; i++) {
          let angle = (p.TWO_PI / numPoints) * i;
          let x = p.width / 2 + p.cos(angle) * radius;
          let y = p.height / 2 + p.sin(angle) * radius;
          p.line(p.width / 2, p.height / 2, x, y);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(chemicals[i].name, x, y - 10);
        }

        // Add border to the chart
        p.noFill();
        p.stroke(200); // Set border color to light grey
        p.rect(0, 0, p.width - 1, p.height - 1);
      };
    };

    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, [width, chemicals]); // Include width as a dependency

  return <div ref={divRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default RadarChart;

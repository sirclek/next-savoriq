import { dataTypes, fetchData } from '@/db/db-utils';
import { routes } from '@/routing/routing-utils';
import p5 from 'p5';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Chemical, Flavour, Whiskey } from '../common/object-types';

type RadarChartProps = {
  whiskey: Whiskey;
};

type ChartData = {
  id: number;
  name: string;
  subType: string;
  value: number;
};

const RadarChart: React.FC<RadarChartProps> = ({ whiskey }) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [dataType, setDataType] = useState<'chemicals' | 'flavours'>(
    'chemicals',
  );
  const [flavours, setFlavours] = useState<ChartData[]>([]);
  const [chemicals, setChemicals] = useState<ChartData[]>([]);

  const fetchFlavours = useCallback(async () => {
    try {
      const allFlavours = await fetchData<Flavour>(dataTypes.FLAVOURS);
      const flavours = whiskey.flavours.map((value, i) => {
        const flavour = allFlavours.find(
          (flavour) => flavour.id === i,
        ) as Flavour;
        return {
          id: flavour.id,
          name: flavour.name,
          subType: flavour.subType,
          value,
        };
      });
      setFlavours(flavours);
    } catch (error) {
      console.error('Error fetching flavours:', error);
    }
  }, [whiskey.flavours]);

  const fetchChemicals = useCallback(async () => {
    try {
      const allChemicals = await fetchData<Chemical>(dataTypes.CHEMICALS);
      const chemicals = whiskey.chemicals.map((value, i) => {
        const chemical = allChemicals.find(
          (chemical) => chemical.id === i,
        ) as Chemical;
        return {
          id: chemical.id,
          name: chemical.name,
          subType: 'Chemical',
          value,
        };
      });
      setChemicals(chemicals);
    } catch (error) {
      console.error('Error fetching chemicals:', error);
    }
  }, [whiskey.chemicals]);

  useEffect(() => {
    fetchFlavours();
  }, [fetchFlavours]);

  useEffect(() => {
    fetchChemicals();
  }, [fetchChemicals]);

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

  const data = useMemo(
    () => (dataType === 'chemicals' ? chemicals : flavours),
    [dataType, chemicals, flavours],
  );

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => {
        if (divRef.current) {
          p.createCanvas(width, height).parent(divRef.current);
        }
        p.textSize(16);
      };

      p.draw = () => {
        const numPoints = data.length;
        const radius = Math.min(width, height) / 2.6;
        const maxValue = Math.max(...data.map((d) => d.value));
        const centerX = p.width / 2;
        const centerY = p.height / 2 + height * 0.03;

        p.background(255);
        p.fill(0);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(14);
        p.text(
          `Radar Diagram - Whisky ${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`,
          centerX,
          30,
        );

        if (dataType === 'flavours') {
          const subTypeColors: { [key: string]: [number, number, number] } = {
            aroma: [192, 159, 114],
            taste: [222, 190, 145],
            finish: [241, 227, 208],
          };
          for (let i = 0; i < numPoints; i++) {
            const angle = (p.TWO_PI / numPoints) * i;
            const x =
              centerX + p.cos(angle) * (data[i].value / maxValue) * radius;
            const y =
              centerY + p.sin(angle) * (data[i].value / maxValue) * radius;
            const nextIndex = (i + 1) % numPoints;
            const nextAngle = (p.TWO_PI / numPoints) * nextIndex;
            const nextX =
              centerX +
              p.cos(nextAngle) * (data[nextIndex].value / maxValue) * radius;
            const nextY =
              centerY +
              p.sin(nextAngle) * (data[nextIndex].value / maxValue) * radius;

            const color = subTypeColors[data[i].subType] || [180, 120, 60, 150];
            p.fill(...color);
            p.beginShape();
            p.vertex(centerX, centerY);
            p.vertex(x, y);
            if (data[i].subType === data[nextIndex].subType) {
              p.vertex(nextX, nextY);
            }
            p.endShape(p.CLOSE);
          }
        }

        p.stroke(0, 0, 0, 0);
        if (dataType === 'flavours') {
          p.noFill();
        } else {
          p.fill(180, 120, 60, 150);
        }
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

        p.stroke(0);
        p.fill(0);
        for (let i = 0; i < numPoints; i++) {
          const angle = (p.TWO_PI / numPoints) * i;
          const x = centerX + p.cos(angle) * radius * 1.1;
          const y = centerY + p.sin(angle) * radius * 1.1;
          p.stroke(128);
          p.line(centerX, centerY, x, y);
          p.textAlign(
            Math.abs(x - centerX) / radius < 0.03
              ? p.CENTER
              : x < centerX
                ? p.RIGHT
                : p.LEFT,
            Math.abs(y - centerY) / radius < 0.03
              ? p.CENTER
              : y < centerY
                ? p.BOTTOM
                : p.TOP,
          );

          p.textFont('sans-serif');
          p.textSize(16);
          p.text(
            data[i].name,
            x + (x == centerX ? 0 : x > centerX ? 5 : -5),
            y + (y == centerY ? 0 : y > centerY ? 5 : -5),
          );
          p.textAlign(p.CENTER, p.CENTER);

          if (i % (numPoints / 4) === 0) {
            for (
              let j = 0;
              j <= maxValue;
              dataType === 'chemicals' ? (j += 10) : j++
            ) {
              const scaleX = centerX + p.cos(angle) * (radius / maxValue) * j;
              const scaleY = centerY + p.sin(angle) * (radius / maxValue) * j;
              p.textSize(12);
              p.text(j, scaleX, scaleY);
            }
          }
        }

        p.noFill();
        p.stroke(200);
        p.rect(0, 0, p.width - 1, p.height - 1);
      };
    };

    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, [width, height, data, dataType]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          height: '8%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '5%',
        }}
      >
        <button
          onClick={() => setDataType('chemicals')}
          className={`text-xl ${dataType === 'chemicals' ? 'bg-primary' : 'bg-primary-light'} ${dataType === 'chemicals' ? 'text-white' : 'text-gray-700'}`}
          style={{
            width: '100%',
            padding: '1% 5%',
            borderRadius: '10px',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Chemicals
        </button>
        <button
          onClick={() => setDataType('flavours')}
          className={`text-xl ${dataType === 'flavours' ? 'bg-primary' : 'bg-primary-light'} ${dataType === 'flavours' ? 'text-white' : 'text-gray-700'}`}
          style={{
            width: '100%',
            padding: '1% 5%',
            borderRadius: '10px',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Flavours
        </button>
        <button
          onClick={() => routes.customise(whiskey.id)}
          className={`bg-primary-hover text-xl text-white`}
          style={{
            width: '100%',
            padding: '1% 5%',
            borderRadius: '10px',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Customise
        </button>
      </div>
      <div ref={divRef} style={{ width: '100%', height: '92%' }}></div>
    </div>
  );
};

export default RadarChart;

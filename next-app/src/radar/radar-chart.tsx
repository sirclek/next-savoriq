/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */

import { dataTypes } from '@/db/db-utils';
import p5 from 'p5';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Whiskey } from '../common/object-types';
import { getGraphData } from './radar-data';

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
  const [customizeMode, setCustomizeMode] = useState<boolean>(false);
  const [customData, setCustomData] = useState<ChartData[]>([]);
  const [draggedPoint, setDraggedPoint] = useState<number | null>(null);

  const fetchFlavours = useCallback(async () => {
    setFlavours(await getGraphData(whiskey, dataTypes.FLAVOURS));
  }, [whiskey.flavours]);

  const fetchChemicals = useCallback(async () => {
    setChemicals(await getGraphData(whiskey, dataTypes.CHEMICALS));
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
    if (customizeMode) {
      setCustomData(data);
    }
  }, [customizeMode, data]);

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

        const drawChart = (chartData: ChartData[], alpha: number) => {
          p.stroke(0, 0, 0, 0);
          p.fill(180, 120, 60, alpha);
          p.beginShape();
          for (let i = 0; i < numPoints; i++) {
            const angle = (p.TWO_PI / numPoints) * i;
            const x =
              centerX + p.cos(angle) * (chartData[i].value / maxValue) * radius;
            const y =
              centerY + p.sin(angle) * (chartData[i].value / maxValue) * radius;
            p.vertex(x, y);
          }
          p.endShape(p.CLOSE);
        };

        drawChart(data, 150);

        if (customizeMode) {
          drawChart(customData, 75);
        }

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

      p.mousePressed = () => {
        if (customizeMode) {
          const numPoints = data.length;
          const radius = Math.min(width, height) / 2.6;
          const maxValue = Math.max(...data.map((d) => d.value));
          const centerX = p.width / 2;
          const centerY = p.height / 2 + height * 0.03;

          for (let i = 0; i < numPoints; i++) {
            const angle = (p.TWO_PI / numPoints) * i;
            const x =
              centerX +
              p.cos(angle) * (customData[i].value / maxValue) * radius;
            const y =
              centerY +
              p.sin(angle) * (customData[i].value / maxValue) * radius;

            if (p.dist(p.mouseX, p.mouseY, x, y) < 10) {
              setDraggedPoint(i);
            }
          }
        }
      };

      p.mouseDragged = () => {
        if (customizeMode && draggedPoint !== null) {
          const numPoints = data.length;
          const radius = Math.min(width, height) / 2.6;
          const maxValue = Math.max(...data.map((d) => d.value));
          const centerX = p.width / 2;
          const centerY = p.height / 2 + height * 0.03;

          const angle = (p.TWO_PI / numPoints) * draggedPoint;
          const dx = p.mouseX - centerX;
          const dy = p.mouseY - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const newValue = Math.min(
            maxValue,
            Math.max(0, (distance / radius) * maxValue),
          );

          const updatedData = [...customData];
          updatedData[draggedPoint].value = newValue;
          setCustomData(updatedData);
        }
      };

      p.mouseReleased = () => {
        setDraggedPoint(null);
      };
    };

    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, [width, height, data, dataType, customizeMode, customData, draggedPoint]);

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
          onClick={() => setCustomizeMode(!customizeMode)}
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
          {customizeMode ? 'Save' : 'Customise'}
        </button>
      </div>
      <div ref={divRef} style={{ width: '100%', height: '92%' }}></div>
    </div>
  );
};

export default RadarChart;

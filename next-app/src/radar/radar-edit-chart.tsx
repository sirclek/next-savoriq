import { dataTypes } from '@/db/db-utils';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Whiskey } from '../common/object-types';
import { getGraphData } from './radar-data';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import 'chartjs-plugin-dragdata';


Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

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
  const divRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const [dataType, setDataType] = useState<'chemicals' | 'flavours'>('chemicals');
  const [flavours, setFlavours] = useState<ChartData[]>([]);
  const [chemicals, setChemicals] = useState<ChartData[]>([]);
  const [customizeMode, setCustomizeMode] = useState<boolean>(false);
  const [customData, setCustomData] = useState<ChartData[]>([]);

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
    if (divRef.current) {
      const ctx = divRef.current.getContext('2d');
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new Chart<'radar'>(ctx, {
          type: 'radar',
          data: {
            labels: data.map(d => d.name),
            datasets: [
              {
                label: `Radar Diagram - Whisky ${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`,
                data: data.map(d => d.value),
                backgroundColor: 'rgba(180, 120, 60, 0.5)',
                borderColor: 'rgba(180, 120, 60, 1)',
                borderWidth: 1,
                dragData: customizeMode,
              },
              ...(customizeMode ? [{
                label: 'Custom Data',
                data: customData.map(d => d.value),
                backgroundColor: 'rgba(180, 120, 60, 0.25)',
                borderColor: 'rgba(180, 120, 60, 0.5)',
                borderWidth: 1,
                dragData: customizeMode,
              }] : []),
            ],
          },
          options: {
            scales: {
              r: {
                beginAtZero: true,
                max: Math.max(...data.map(d => d.value)),
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.label}: ${context.raw}`;
                  },
                },
              },
              dragData: {
                magnet: {
                  to: (value: number | null) => value !== null ? Math.round(value) : null,
                },
                onDragEnd: function(e, datasetIndex, index, value) {
                  const newCustomData = [...customData];
                  if (value !== null) {
                    newCustomData[index].value = value;
                  }
                  setCustomData(newCustomData);
                },
              },
            },
          },
        });
      }
    }
  }, [data, dataType, customizeMode, customData]);

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
          onClick={() => {setCustomizeMode(false); setDataType('chemicals');}}
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
          onClick={() => { setCustomizeMode(false); setDataType('flavours'); }}
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
          {customizeMode ? 'Cancel' : 'Customise'}
        </button>
      </div>
      <canvas ref={divRef} style={{ width: '100%', height: '92%' }}></canvas>
    </div>
  );
};

export default RadarChart;

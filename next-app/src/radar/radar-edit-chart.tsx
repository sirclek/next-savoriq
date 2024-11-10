import { dataTypes } from '@/db/db-utils';
import type { BubbleDataPoint, ChartType, Point } from 'chart.js';
import {
  Chart,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import 'chartjs-plugin-dragdata';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Whiskey } from '../common/object-types';
import { getGraphData } from './radar-data';

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

type RadarChartProps = {
  whiskey: Whiskey;
};

type ChartData = {
  id: number;
  name: string;
  subType: string;
  value: number;
};

const FLAVOURMAX = 10;
const CHEMICALMAX = 150;
// const CHEMICALMAX =
//   Math.max(
//     Math.max(...data.map((d) => d.value)),
//     customizeMode ? Math.max(...customData.map((d) => d.value)) : 0,
//   ) +
//   (10 -
//     (Math.max(
//       Math.max(...data.map((d) => d.value)),
//       customizeMode ? Math.max(...customData.map((d) => d.value)) : 0,
//     ) %
//       10));
const CUSTOMDATANAME = 'Customised Data';

const RadarChart: React.FC<RadarChartProps> = ({ whiskey }) => {
  const divRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const [dataType, setDataType] = useState<'chemicals' | 'flavours'>(
    'chemicals',
  );
  const [flavours, setFlavours] = useState<ChartData[]>([]);
  const [chemicals, setChemicals] = useState<ChartData[]>([]);
  const [customizeMode, setCustomizeMode] = useState<boolean>(false);
  const [customData, setCustomData] = useState<ChartData[]>([]);

  const fetchFlavours = useCallback(async () => {
    setFlavours(await getGraphData(whiskey, dataTypes.FLAVOURS));
  }, [whiskey]);

  const fetchChemicals = useCallback(async () => {
    setChemicals(await getGraphData(whiskey, dataTypes.CHEMICALS));
  }, [whiskey]);

  useEffect(() => {
    void fetchFlavours();
  }, [fetchFlavours]);

  useEffect(() => {
    void fetchChemicals();
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

        chartRef.current = new Chart(ctx, {
          type: 'radar' as ChartType,
          data: {
            labels: data.map((d) => d.name),
            datasets: [
              {
                label: `Radar Diagram - Whisky ${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`,
                data: data.map((d) => d.value),
                backgroundColor: customizeMode
                  ? 'rgba(128, 128, 128, 0.5)'
                  : 'rgba(180, 120, 60, 0.5)',
                borderColor: customizeMode
                  ? 'rgba(128, 128, 128, 1)'
                  : 'rgba(180, 120, 60, 1)',
                borderWidth: 1,
                dragData: false,
                order: 1,
              },
              ...(customizeMode
                ? [
                    {
                      label: CUSTOMDATANAME,
                      data: customData.map((d) => d.value),
                      backgroundColor: 'rgba(180, 120, 60, 0.5)',
                      borderColor: 'rgba(180, 120, 60, 0.5)',
                      borderWidth: 1,
                      dragData: customizeMode,
                    },
                  ]
                : []),
            ],
          },
          options: {
            animation: { duration: 500, easing: 'easeInOutQuint' },

            scales: {
              r: {
                beginAtZero: true,
                ticks: {
                  stepSize: dataType === 'chemicals' ? 10 : 1,
                },
                max: dataType === 'chemicals' ? CHEMICALMAX : FLAVOURMAX,
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label(context) {
                    const value = context.dataset.data[context.dataIndex];
                    const roundValue =
                      typeof value === 'number' ? Math.round(value) : 0;
                    const label = context.dataset.label + ': ' + roundValue;
                    const customDataPoint = data[context.dataIndex].value;
                    return (
                      label +
                      ' ' +
                      (context.dataset.label === CUSTOMDATANAME
                        ? `(${roundValue - customDataPoint > 0 ? '+' : ''}${roundValue - customDataPoint})`
                        : '')
                    );
                  },
                },
              },
              dragData: {
                onDragEnd: (e, datasetIndex, index, value) => {
                  if (customizeMode && chartRef.current) {
                    // Update customData with the new dragged value
                    setCustomData((prevData) =>
                      prevData.map((d, i) =>
                        i === index ? { ...d, value: value as number } : d,
                      ),
                    );
                  }
                },
              },
            },
          },
        });
      }
    }
  }, [customizeMode, data, dataType]);

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
        {!customizeMode ? (
          <>
            <button
              onClick={() => {
                setCustomizeMode(false);
                setCustomData(chemicals);
                setDataType('chemicals');
              }}
              className={`text-xl ${dataType === 'chemicals' ? 'bg-primary' : 'bg-primary-light'} ${
                dataType === 'chemicals' ? 'text-white' : 'text-gray-700'
              }`}
              style={{
                width: '100%',
                padding: '1% 5%',
                borderRadius: '10px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.1)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            >
              Chemicals
            </button>
            <button
              onClick={() => {
                setCustomizeMode(false);
                setCustomData(flavours);
                setDataType('flavours');
              }}
              className={`text-xl ${dataType === 'flavours' ? 'bg-primary' : 'bg-primary-light'} ${
                dataType === 'flavours' ? 'text-white' : 'text-gray-700'
              }`}
              style={{
                width: '100%',
                padding: '1% 5%',
                borderRadius: '10px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.1)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            >
              Flavours
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              window.location.href = '/search/similar';
            }}
            className={'text-xl bg-primary text-white'}
            style={{
              width: '255%',
              padding: '1% 5%',
              borderRadius: '10px',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = 'scale(1.1)')
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Search Whiskeys With This Profile
          </button>
        )}
        <button
          onClick={() => {
            setCustomizeMode(!customizeMode);
          }}
          className="bg-primary-hover text-xl text-white"
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

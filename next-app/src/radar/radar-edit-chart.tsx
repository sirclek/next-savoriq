import { WhiskeyMatching, type ChartData, type MatchType } from '@/common/custom-types';
import { dataTypes } from '@/db/db-utils';
import type { ChartType } from 'chart.js';
import { Chart, Filler, Legend, LineElement, PointElement, RadarController, RadialLinearScale, Tooltip } from 'chart.js';
import 'chartjs-plugin-dragdata';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Whiskey } from '../common/custom-types';
import { getGraphData } from './radar-data';
import { M_PLUS_1 } from 'next/font/google';

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

type RadarChartProps = {
  whiskey: Whiskey;
};

const FLAVOURMAX = 10;
const CHEMICALMAX = 150;

const CUSTOMDATANAME = 'Customised Data';

const RadarChart: React.FC<RadarChartProps> = ({ whiskey }) => {
  const divRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const [dataType, setDataType] = useState<MatchType>(WhiskeyMatching.CHEMICAL);
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

  const data = useMemo(() => (dataType === WhiskeyMatching.CHEMICAL ? chemicals : flavours), [dataType, chemicals, flavours]);

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
                backgroundColor: customizeMode ? 'rgba(128, 128, 128, 0.5)' : 'rgba(180, 120, 60, 0.5)',
                borderColor: customizeMode ? 'rgba(128, 128, 128, 1)' : 'rgba(180, 120, 60, 1)',
                borderWidth: 1,
                dragData: false,
                order: 1,
                pointRadius: customizeMode ? 0 : 3, // Remove dot bubbles in customize mode
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
                      pointRadius: 3,
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
                  stepSize: dataType === WhiskeyMatching.CHEMICAL ? 10 : 1,
                },
                max: dataType === WhiskeyMatching.CHEMICAL ? CHEMICALMAX : FLAVOURMAX,
                min: 0,
                grid: { lineWidth: 2 },
                angleLines: { lineWidth: 2 },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label(context) {
                    const value = context.dataset.data[context.dataIndex];
                    const roundValue = typeof value === 'number' ? Math.round(value) : 0;
                    const label = context.dataset.label + ': ' + roundValue;
                    const customDataPoint = data[context.dataIndex].value;
                    return label + ' ' + (context.dataset.label === CUSTOMDATANAME ? `(${roundValue - customDataPoint > 0 ? '+' : ''}${roundValue - customDataPoint})` : '');
                  },
                },
              },
              dragData: {
                onDragEnd: (e, datasetIndex, index, value) => {
                  if (customizeMode && chartRef.current) {
                    const roundedValue = Math.round(value as number);
                    setCustomData((prevData) => prevData.map((d, i) => (i === index ? { ...d, value: roundedValue } : d)));
                    chartRef.current.data.datasets[datasetIndex].data[index] = roundedValue;
                    chartRef.current.update();
                  }
                },
              },
            },
          },
        });

        // Handle label click events
        // divRef.current.addEventListener('click', (event) => {
        //   const chartArea = chartRef.current!.chartArea;
        //   const centerX = (chartArea.left + chartArea.right) / 2;
        //   const centerY = (chartArea.top + chartArea.bottom) / 2;
        //   const angleStep = (2 * Math.PI) / chartRef.current!.data.labels!.length;

        //   chartRef.current!.data.labels!.forEach((label, i) => {
        //     const angle = angleStep * i - Math.PI / 2;
        //     const labelX = centerX + (centerX - 10) * Math.cos(angle);
        //     const labelY = centerY + (centerY - 10) * Math.sin(angle);

        //     if (Math.abs(event.offsetX - labelX) < 10 && Math.abs(event.offsetY - labelY) < 10) {
        //       window.location.href = `/item/${label}`;
        //     }
        //   });
        // });
      }
    }
  }, [customizeMode, data, dataType]);

  const buttonStyle = {
    width: '100%',
    padding: '0.5% 5%',
    borderRadius: '10px',
    transition: 'transform 0.2s',
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="button-container">
        <div
          style={{
            height: '8%',
            width: '100%',
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
                  setDataType(WhiskeyMatching.CHEMICAL);
                }}
                className={`text-xl ${dataType === WhiskeyMatching.CHEMICAL ? 'bg-primary' : 'bg-primary-light'} ${dataType === WhiskeyMatching.CHEMICAL ? 'text-white' : 'text-gray-700'}`}
                style={buttonStyle}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Chemicals
              </button>
              <button
                onClick={() => {
                  setCustomizeMode(false);
                  setCustomData(flavours);
                  setDataType(WhiskeyMatching.FLAVOUR);
                }}
                className={`text-xl ${dataType === WhiskeyMatching.FLAVOUR ? 'bg-primary' : 'bg-primary-light'} ${dataType === WhiskeyMatching.FLAVOUR ? 'text-white' : 'text-gray-700'}`}
                style={buttonStyle}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Flavours
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                const simplifiedData = {type: dataType, compId: -1, values: customData.map((d) => d.value)};
                const base64Numbers = Buffer.from(JSON.stringify(simplifiedData)).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
                console.log(simplifiedData);
                window.location.href = `/similar/${dataType === WhiskeyMatching.CHEMICAL ? WhiskeyMatching.CHEMICAL : WhiskeyMatching.FLAVOUR}/${base64Numbers}`;
              }}
              className={'bg-primary text-xl text-white'}
              style={{
                width: '255%',
                padding: '0.5% 5%',
                borderRadius: '10px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Search Whiskeys With This Profile
            </button>
          )}
          <button
            onClick={() => {
              setCustomData(data);
              setCustomizeMode(!customizeMode);
            }}
            className="bg-primary-hover text-xl text-white"
            style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {customizeMode ? 'Cancel' : 'Customise'}
          </button>
        </div>
      </div>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '92%',
        }}
      >
        <canvas ref={divRef} style={{ flex: 1 }}></canvas>
      </div>
    </div>
  );
};

export default RadarChart;

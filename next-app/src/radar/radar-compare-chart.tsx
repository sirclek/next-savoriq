import { WhiskeyMatching, type ChartData, type Whiskey, type WhiskeyWithCustom} from '@/common/custom-types';
import { useHover } from '@/similar/similar-context';
import type { ChartType } from 'chart.js';
import { Chart, Filler, Legend, LineElement, PointElement, RadarController, RadialLinearScale, Tooltip } from 'chart.js';
import 'chartjs-plugin-dragdata';
import React, { useEffect, useRef } from 'react';


Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

type RadarChartProps = {
  masterWhiskey: Whiskey | WhiskeyWithCustom;
  compWhiskey: WhiskeyWithCustom[];
  graphLabels: ChartData[];
};

const FLAVOURMAX = 10;
const CHEMICALMAX = 150;

const RadarCompareChart: React.FC<RadarChartProps> = ({ masterWhiskey, compWhiskey, graphLabels }: RadarChartProps) => {
  const divRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const hoverContext = useHover(); // Use the context
  const dataType = graphLabels[0].type;

  const mainWhiskeyData: ChartData[] = graphLabels.map((label) => ({
    ...label,
    value: dataType === WhiskeyMatching.CHEMICAL ? masterWhiskey.chemicals[label.id] : masterWhiskey.flavours[label.id],
  }));

  const comparisonWhiskeyData: ChartData[][] = compWhiskey.map((whiskey) =>
    graphLabels.map((label) => ({
      ...label,
      value: dataType === WhiskeyMatching.CHEMICAL ? whiskey.chemicals[label.id] : whiskey.flavours[label.id],
    })),
  );

  const comparisonWhiskeyPosition: number[] = compWhiskey.map((whiskey) => whiskey.id);

  const lastHoveredWhiskeyId = hoverContext.lastHoveredWhiskeyId || compWhiskey[0].id;

  const hoveredWhiskeyData = comparisonWhiskeyData[comparisonWhiskeyPosition.indexOf(lastHoveredWhiskeyId)];

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
            labels: graphLabels.map((d) => d.name),
            datasets: [
              {
                label: `Whisky ${dataType.charAt(0).toUpperCase() + dataType.slice(1)} | ${masterWhiskey.id === -1 ? 'Your Custom Whiskey' : masterWhiskey.name}`,
                data: mainWhiskeyData.map((d) => d.value),
                backgroundColor: 'rgba(120, 80, 40, 0.5)',
                borderColor: 'rgba(120, 80, 40, 1)',
                borderWidth: 1,
                order: 1,
                pointRadius: 0,
                animation: false,
                dragData: false,
              },
              {
                label: `Whisky ${dataType.charAt(0).toUpperCase() + dataType.slice(1)} ${compWhiskey.find((whiskey) => whiskey.id === lastHoveredWhiskeyId)?.name}`,
                data: hoveredWhiskeyData.map((d) => d.value),
                backgroundColor: 'rgba(180, 120, 40, 0.5)',
                borderColor: 'rgba(120, 80, 40, 1)',
                borderWidth: 1,
                order: 1,
                pointRadius: 5,
                dragData: false,
              },
            ],
          },
          options: {
            animation: { duration: 200, easing: 'easeInOutQuint' },
            scales: {
              r: {
                beginAtZero: true,
                ticks: {
                  stepSize: dataType === WhiskeyMatching.CHEMICAL ? 10 : 1,
                  callback: function (value) {
                    return typeof value === 'number' && value < 0 ? null : value;
                  },
                  font: {
                    size: 14, // Increase the font size for ticks
                  },
                },
                max: dataType === WhiskeyMatching.CHEMICAL ? CHEMICALMAX : FLAVOURMAX,
                min: dataType === WhiskeyMatching.CHEMICAL ? -10 : 0,
                grid: { lineWidth: 2 },
                angleLines: { lineWidth: 2 },
                pointLabels: {
                  font: {
                    size: 14, // Increase the font size for labels
                  },
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 12, // Increase the font size
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const label = context.dataset.label || '';
                    const value = context.raw;
                    const sign = (value as number) - mainWhiskeyData[context.dataIndex].value > 0 ? '+' : '';
                    return `${label}: ${value} (${sign}${(value as number) - mainWhiskeyData[context.dataIndex].value})`;
                  },
                },
              },
            },
          },
        });
      }
    }
  }, [lastHoveredWhiskeyId]);

  return (
    <div style={{ height: '95%', width: '95%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <canvas ref={divRef} style={{ flex: 1 }}></canvas>
      </div>
    </div>
  );
};

export default RadarCompareChart;

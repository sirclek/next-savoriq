import p5 from 'p5';
import React, { useEffect, useRef, useState } from 'react';

interface ChemicalData {
    chemicalName: string;
    chemicalValue: number;
}



export const ChemicalRadar = ( data: ChemicalData[], width : number, height : number ) => {

    const divRef = useRef<HTMLDivElement>(null);

    const sketch = (p: p5) => {
        const numPoints = data.length;
        const radius = Math.min(width, height) / 2.5; // Adjust to fit within canvas size
        const points: p5.Vector[] = [];
        let radarColor: p5.Color;
        const maxValue = Math.max(...data.map(d => d.chemicalValue));

        p.setup = () => {
            if (divRef.current) {
                p.createCanvas(width, height).parent(divRef.current);
            }
            radarColor = p.color(180, 120, 60, 150);
            p.textSize(16);

            for (let j = 0; j < numPoints; j++) {
                let angle = (p.TWO_PI / numPoints) * j;
                let x = p.width / 2 + p.cos(angle) * (data[j].chemicalValue / maxValue) * radius;
                let y = p.height / 2 + p.sin(angle) * (data[j].chemicalValue / maxValue) * radius;
                points.push(p.createVector(x, y));
            }
        };

        p.draw = () => {
            p.background(255);
            p.fill(0);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(12);
            p.text(`Radar Diagram - Chemical Data`, p.width / 2, 30);

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
                p.text(data[i].chemicalName, x, y - 10);
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

};
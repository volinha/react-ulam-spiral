import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  let stepSize = 10;
  let dotSize = 3;
  let numSteps = 1;
  let state = 0;
  let turnCounter = 0;
  let totalSteps;

  let x = window.innerWidth;
  let y = window.innerHeight;

  const cols = (window.innerWidth / stepSize) * 2;
  const rows = (window.innerHeight / stepSize) * 2;

  let prevX = x;
  let prevY = y;

  const isPrime = (number) => {
    let prime = true;
    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0){
        prime = false;
        break;
      } 
    }
    return prime;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    totalSteps = cols * rows;

    const context = canvas.getContext("2d");
    context.font = "24px serif";
    context.textAlign = "center center";

    for (let step = 1; step <= totalSteps; step++) {
      if(step > 1 && isPrime(step)){
      context.beginPath();
      context.arc(x, y, dotSize, 0 * Math.PI, 2 * Math.PI);
      context.stroke();
      context.fill();
      context.closePath();
      }
      
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(prevX, prevY);
      context.closePath();
      context.stroke();

      prevX = x;
      prevY = y;

      switch (state) {
        case 0:
          x += stepSize;
          break;
        case 1:
          y -= stepSize;
          break;
        case 2:
          x -= stepSize;
          break;
        case 3:
          y += stepSize;
          break;
        default:
          return;
      }

      if (step % numSteps === 0) {
        state = (state + 1) % 4;
        turnCounter++;
        if (turnCounter % 2 === 0) {
          numSteps++;
        }
      }
    }
  }, []);

  return (
    <div className="App">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default App;

const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const cx = width * 0.5;
    const cy = height * 0.5;

    const w = width * 0.01;
    const h = height * 0.1;

    let x, y;
    const parts = 200;
    const radius = width * 0.3;

    for (let i = 0; i < parts; i++) {
      const slice = degToRad(360 / parts);
      const angle = slice * i;

      x = cx * Math.pow(-1, 1) * (i % 2) + radius * Math.sin(angle);
      y = cy * Math.pow(-1, 1) * (i % 2) + radius * Math.cos(angle);

      // Verificar se as coordenadas estão dentro dos limites do canvas
      if (x < 0 || x > width) {
        x = cx - Math.sign(x - cx) * Math.min(Math.abs(x - cx), width - Math.abs(x - cx));
      }
      if (y < 0 || y > height) {
        y = cy - Math.sign(y - cy) * Math.min(Math.abs(y - cy), height - Math.abs(y - cy));
      }

      context.save();
      context.translate(x, y);
      context.rotate(-angle);

      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();
    }
  };
};

function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

canvasSketch(sketch, settings);

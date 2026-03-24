const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); initColumns(); });

const snippets = [
  "const app = express();",
  "function handleRequest(req, res) {",
  "  if (req.method === 'POST') {",
  "  return res.json({ status: 'ok' });",
  "import { useState, useEffect } from 'react';",
  "const [data, setData] = useState(null);",
  "useEffect(() => { fetchData(); }, []);",
  "async function fetchData() {",
  "  const res = await fetch('/api/data');",
  "  const json = await res.json();",
  "class NeuralNetwork {",
  "  constructor(layers) {",
  "  predict(input) {",
  "    return this.layers.reduce(",
  "const model = new Sequential([",
  "  Dense(128, activation='relu'),",
  "  Dense(64, activation='relu'),",
  "await model.fit(X_train, y_train, {",
  "  epochs: 10, batchSize: 32",
  "SELECT * FROM users",
  "WHERE active = true",
  "ORDER BY score DESC LIMIT 100;",
  "git commit -m 'feat: add AI integration'",
  "npm install @anthropic-ai/sdk",
  "docker build -t app:latest .",
  "kubectl apply -f deployment.yaml",
  "const client = new Anthropic();",
  "  model: 'claude-opus-4-6',",
  "  max_tokens: 1024,",
  "if (process.env.NODE_ENV === 'prod') {",
  "  app.use(helmet());",
  "export default function Page() {",
  "  return <main>{children}</main>",
  "type Props = { children: ReactNode }",
  "interface User {",
  "  id: string; email: string;",
  "const router = createBrowserRouter([",
  "  { path: '/', element: <Home /> },",
  "prisma.user.findMany({",
  "  where: { active: true },",
  "  include: { posts: true }",
  "z.object({ email: z.string().email() })",
  "return NextResponse.json(data);",
  "  const token = jwt.sign(payload, secret);",
  "  await redis.set(key, value, 'EX', 3600);",
  "pipeline.add(new TransformStep());",
  "  .filter(x => x.score > threshold)",
  "  .map(item => normalize(item))",
];

const COL_WIDTH = 270;
const LINE_H = 17;
let columns = [];

function initColumns() {
  const numCols = Math.ceil(canvas.width / COL_WIDTH) + 1;
  columns = [];

  for (let i = 0; i < numCols; i++) {
    const lines = [];
    const numLines = Math.ceil(canvas.height / LINE_H) + 8;

    for (let j = 0; j < numLines; j++) {
      lines.push({
        text: snippets[Math.floor(Math.random() * snippets.length)],
        opacity: Math.random() * 0.13 + 0.03,
        x: i * COL_WIDTH + Math.random() * 30 - 15,
        y: j * LINE_H + Math.random() * 6,
        size: Math.random() > 0.6 ? 11 : 10,
        hue: Math.random() > 0.75 ? 200 : 210,
      });
    }

    columns.push({
      lines,
      offsetY: Math.random() * LINE_H * 8,
      speed: Math.random() * 0.06 + 0.015,
    });
  }
}

initColumns();

let last = 0;
function draw(ts) {
  const dt = Math.min(ts - last, 50);
  last = ts;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dark navy base
  ctx.fillStyle = '#07101c';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const col of columns) {
    col.offsetY = (col.offsetY + col.speed * (dt / 16)) % (LINE_H * snippets.length);

    for (const line of col.lines) {
      ctx.globalAlpha = line.opacity;
      ctx.fillStyle = `hsl(${line.hue}, 80%, 65%)`;
      ctx.font = `${line.size}px "Courier New", monospace`;

      const y1 = line.y - col.offsetY;
      const y2 = y1 + canvas.height + LINE_H * 10;

      ctx.fillText(line.text, line.x, y1);
      ctx.fillText(line.text, line.x, y2);
    }
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

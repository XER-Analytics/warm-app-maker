import { useRef } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Label, Tooltip as RechartsTooltip } from "recharts";
import { Project } from "@/lib/projectData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MatrixChartProps {
  projects: Project[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onDrop?: (x: number, y: number) => void;
}

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  const isUser = payload.isUserProject;
  const size = isUser ? 10 : 7;

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={size}
        fill={payload.color}
        stroke={isUser ? "hsl(var(--foreground))" : "hsl(var(--border))"}
        strokeWidth={isUser ? 2.5 : 1.5}
        className="cursor-pointer transition-all"
        style={{ filter: isUser ? "drop-shadow(0 2px 6px rgba(0,0,0,0.15))" : undefined }}
      />
      {isUser && (
        <circle cx={cx} cy={cy} r={14} fill="none" stroke={payload.color} strokeWidth={1} strokeDasharray="3 3" opacity={0.5} />
      )}
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <p className="text-sm font-medium text-foreground">{data.name}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{data.description}</p>
      <div className="flex gap-3 mt-1.5 text-xs text-muted-foreground">
        <span>Detaljnivå: <strong className="text-foreground">{data.x}</strong></span>
        <span>Datamängd: <strong className="text-foreground">{data.y}</strong></span>
      </div>
    </div>
  );
};

const MatrixChart = ({ projects, selectedId, onSelect, onDrop }: MatrixChartProps) => {
  const dotClickedRef = useRef(false);

  const handleDotClick = (data: any) => {
    if (data?.id) {
      dotClickedRef.current = true;
      onSelect(data.id);
    }
  };

  const handleChartClick = (e: any) => {
    if (dotClickedRef.current) {
      dotClickedRef.current = false;
      return;
    }
    if (!onDrop || !e) return;
    const { chartX, chartY, xAxisMap, yAxisMap } = e || {};
    if (chartX !== undefined && chartY !== undefined && xAxisMap && yAxisMap) {
      const xAxis = Object.values(xAxisMap)[0] as any;
      const yAxis = Object.values(yAxisMap)[0] as any;
      if (xAxis && yAxis) {
        const x = Math.round(xAxis.scale.invert(chartX));
        const y = Math.round(yAxis.scale.invert(chartY));
        if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
          onDrop(x, y);
        }
      }
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold tracking-tight">Planeringsmatris</CardTitle>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Ditt projekt
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
              Referensprojekt
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 30, left: 20 }} onClick={handleChartClick}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis
                type="number"
                dataKey="x"
                domain={[0, 100]}
                tickCount={6}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              >
                <Label value="← Grov detaljering — Hög detaljnivå →" position="bottom" offset={10} style={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              </XAxis>
              <YAxis
                type="number"
                dataKey="y"
                domain={[0, 100]}
                tickCount={6}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              >
                <Label value="← Låg datamängd — Stor datamängd →" angle={-90} position="insideLeft" offset={-5} style={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", textAnchor: "middle" }} />
              </YAxis>
              <ReferenceLine x={50} stroke="hsl(var(--border))" strokeDasharray="6 4" />
              <ReferenceLine y={50} stroke="hsl(var(--border))" strokeDasharray="6 4" />
              <RechartsTooltip content={<CustomTooltip />} />
              <Scatter data={projects} shape={<CustomDot />} onClick={handleDotClick} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};


export default MatrixChart;

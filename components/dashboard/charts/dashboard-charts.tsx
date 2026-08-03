"use client";

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

type MonthlyItem = { month: string; count: number };
type StatusItem = { label: string; value: number; color?: string };
type LeadSourceItem = { label: string; value: number };

export function MonthlyChart({ data }: { data: MonthlyItem[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0F7A3C" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#0F7A3C" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", fontSize: "12px", color: "#0f172a" }}
        />
        <Area type="monotone" dataKey="count" stroke="#0F7A3C" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function AdmissionsBarChart({ data }: { data: MonthlyItem[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", fontSize: "12px", color: "#0f172a" }}
        />
        <Bar dataKey="count" fill="#10B981" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function EnquiryStatusPie({ data }: { data: StatusItem[] }) {
  const COLORS = ["#0F7A3C", "#10B981", "#D4AF37", "#059669", "#EF4444", "#6B7280"];

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={85}
          paddingAngle={4}
          dataKey="value"
          nameKey="label"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", fontSize: "12px", color: "#0f172a" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function LeadSourceChart({ data }: { data: LeadSourceItem[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
        <XAxis type="number" stroke="#94a3b8" fontSize={11} hide />
        <YAxis dataKey="label" type="category" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={80} />
        <Tooltip
          contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", fontSize: "12px", color: "#0f172a" }}
        />
        <Bar dataKey="value" fill="#0F7A3C" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

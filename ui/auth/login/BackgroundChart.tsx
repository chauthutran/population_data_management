"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AppDetailsIntro from "../../layout/AppDetailsIntro";

const data = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 55 },
  { name: "Mar", value: 30 },
  { name: "Apr", value: 70 },
  { name: "May", value: 60 },
  { name: "Jun", value: 80 },
];

export default function BackgroundChart() {
  return (
	<div className="relative h-full bg-blue-400 flex justify-center p-7 w-full">
		{/* Background Chart */}
		<div className="absolute inset-0 opacity-20">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" stroke="blue" />
					<XAxis dataKey="name" tick={{ fill: "#1d4ed8" }} />
					<YAxis tick={{ fill: "#1d4ed8" }} />
					<Line type="monotone" dataKey="value" stroke="#1d4ed8" strokeWidth={2} dot={false} />
				</LineChart>
			</ResponsiveContainer>
		</div>

		{/* Foreground Content */}
		<div className="z-10 text-white text-3xl justify-center items-center">
		{/* <div className="flex-1 flex flex-col items-center justify-center bg-blue-500 text-white p-8"> */}
			<h2 className="text-3xl font-semibold mb-4">Effortless Population Data Management</h2>
			<p className="text-lg mb-6">Securely enter, manage, and visualize population data in one place.</p>
			
			<div className="flex-1 flex flex-col space-y-10 mt-10">
				<AppDetailsIntro />
			</div>
  		</div>
		{/* </div> */}
	</div>
  );
}

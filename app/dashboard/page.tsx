"use client";

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download, FileText, Plus, Share2, TrendingUp, Users } from "lucide-react";
import { Panel, Pill, ProductShell } from "../../components/product-shell";

const profileData = {
  recipientName: "Margaret Smith",
  age: 78,
  location: "Melbourne, VIC",
  primaryConcern: "Mobility support needed after fall",
  fundingStatus: "Approved — Level 2 Home Care Package",
  fundingAmount: "$24,500/year",
  carePathway: "Home Care with Support",
  lastUpdated: "2 days ago",
};

const progressData = [
  { stage: "Assessment", status: "complete", date: "May 15" },
  { stage: "Recommendation", status: "complete", date: "May 18" },
  { stage: "Shortlist", status: "complete", date: "May 20" },
  { stage: "Provider Contact", status: "in_progress", date: "May 25" },
  { stage: "Tour", status: "pending", date: "June 5" },
  { stage: "Decision", status: "pending", date: "June 15" },
];

const documents = [
  { name: "Care Assessment Summary", type: "PDF", date: "May 18" },
  { name: "Hospital Discharge Report", type: "PDF", date: "May 10" },
  { name: "Funding Approval Letter", type: "PDF", date: "May 12" },
  { name: "Provider Comparison Worksheet", type: "XLSX", date: "May 20" },
];

const familyMembers = [
  { name: "Sarah Smith", role: "Primary Carer", status: "Active" },
  { name: "James Smith", role: "Family Member", status: "Active" },
  { name: "Emma Smith", role: "Family Member", status: "Invited" },
];

const progressChart = [
  { month: "May", progress: 35 },
  { month: "Jun", progress: 60 },
  { month: "Jul", progress: 85 },
  { month: "Aug", progress: 100 },
];

const actionMix = [
  { name: "Done", value: 3 },
  { name: "In progress", value: 1 },
  { name: "Pending", value: 2 },
];

export default function DashboardPage() {
  return (
    <ProductShell
      eyebrow="Family dashboard"
      title={`Central hub for ${profileData.recipientName}'s care plan.`}
      description="Track the care pathway, documents, provider comparison and family progress from one calm dashboard."
      actions={
        <div className="flex gap-3">
          <a href="/family-share" className="inline-flex items-center gap-2 rounded-full border border-[#d8c9b7] bg-white px-5 py-3 text-sm font-semibold text-[#173f35] shadow-sm"><Share2 className="h-4 w-4" /> Share</a>
          <a href="/shared-profile" className="inline-flex items-center gap-2 rounded-full bg-[#173f35] px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-950/15"><Download className="h-4 w-4" /> View profile</a>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-4">
        {[
          ["Recipient", `${profileData.recipientName}, ${profileData.age}`],
          ["Location", profileData.location],
          ["Care pathway", profileData.carePathway],
          ["Funding", profileData.fundingAmount],
        ].map(([label, value]) => (
          <Panel key={label}>
            <p className="text-sm font-semibold text-[#61736a]">{label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-[#17231f]">{value}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel>
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-[#173f35]" />
            <h2 className="text-2xl font-semibold tracking-tight">Care journey progress</h2>
          </div>
          <div className="mt-6 grid gap-4">
            {progressData.map((item, index) => (
              <div key={item.stage} className="flex items-center gap-4 rounded-2xl bg-[#f7f1e8] p-4">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${item.status === "complete" ? "bg-[#173f35] text-white" : item.status === "in_progress" ? "bg-[#bc7c51] text-white" : "bg-white text-[#61736a]"}`}>{index + 1}</span>
                <div className="flex-1">
                  <p className="font-semibold text-[#17231f]">{item.stage}</p>
                  <p className="text-sm text-[#61736a]">{item.date}</p>
                </div>
                <Pill>{item.status.replace("_", " ")}</Pill>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <h2 className="text-2xl font-semibold tracking-tight">Progress forecast</h2>
          <div className="mt-6 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressChart} margin={{ left: -24, right: 12 }}>
                <XAxis dataKey="month" tick={{ fill: "#61736a", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#61736a", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#173f35" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={actionMix} margin={{ left: -24, right: 12 }}>
                <XAxis dataKey="name" tick={{ fill: "#61736a", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#61736a", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#173f35" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3"><FileText className="h-5 w-5 text-[#173f35]" /><h2 className="text-2xl font-semibold tracking-tight">Documents</h2></div>
            <button className="inline-flex items-center gap-2 rounded-full bg-[#173f35] px-4 py-2 text-sm font-semibold text-white"><Plus className="h-4 w-4" /> Add</button>
          </div>
          <div className="mt-6 grid gap-3">
            {documents.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between gap-4 rounded-2xl bg-[#f7f1e8] p-4">
                <div><p className="font-semibold">{doc.name}</p><p className="text-sm text-[#61736a]">{doc.type} · {doc.date}</p></div>
                <Pill>Saved</Pill>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="flex items-center gap-3"><Users className="h-5 w-5 text-[#173f35]" /><h2 className="text-2xl font-semibold tracking-tight">Family members</h2></div>
          <div className="mt-6 grid gap-3">
            {familyMembers.map((member) => (
              <div key={member.name} className="flex items-center gap-4 rounded-2xl bg-[#f7f1e8] p-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#173f35] font-bold text-white">{member.name[0]}</span>
                <div className="flex-1"><p className="font-semibold">{member.name}</p><p className="text-sm text-[#61736a]">{member.role}</p></div>
                <Pill>{member.status}</Pill>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </ProductShell>
  );
}

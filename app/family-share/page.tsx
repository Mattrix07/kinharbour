"use client";

import { useState } from "react";
import { Copy, Link2, Plus, Trash2 } from "lucide-react";
import { Panel, Pill, ProductShell } from "../../components/product-shell";

const roleDescriptions: Record<string, string[]> = {
  viewer: ["View care profile", "View documents", "View progress timeline"],
  collaborator: ["All Viewer permissions", "Add notes", "Vote on decisions", "Send messages"],
  editor: ["All Collaborator permissions", "Edit profile", "Upload documents", "Manage family"],
};

export default function FamilySharePage() {
  const [shares, setShares] = useState([
    { id: 1, name: "Emma's Access", email: "emma@example.com", role: "Viewer", permissions: roleDescriptions.viewer, link: "https://kinharbour.com/shared/abc123def456", createdDate: "May 20", expiresDate: "June 20", status: "Active" },
    { id: 2, name: "James's Access", email: "james@example.com", role: "Collaborator", permissions: roleDescriptions.collaborator, link: "https://kinharbour.com/shared/xyz789uvw012", createdDate: "May 18", expiresDate: "August 18", status: "Active" },
  ]);
  const [showNewShare, setShowNewShare] = useState(false);
  const [newShareEmail, setNewShareEmail] = useState("");
  const [newShareRole, setNewShareRole] = useState("viewer");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  function copyLink(link: string, id: number) {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function createShare() {
    if (!newShareEmail.trim()) return;
    setShares((current) => [...current, { id: current.length + 1, name: `${newShareEmail.split("@")[0]}'s Access`, email: newShareEmail, role: newShareRole[0].toUpperCase() + newShareRole.slice(1), permissions: roleDescriptions[newShareRole], link: `https://kinharbour.com/shared/${Math.random().toString(36).slice(2, 11)}`, createdDate: "Today", expiresDate: "In 3 months", status: "Pending" }]);
    setNewShareEmail("");
    setNewShareRole("viewer");
    setShowNewShare(false);
  }

  return (
    <ProductShell
      eyebrow="Family share"
      title="Share controlled access with family members."
      description="Create time-limited links so relatives can view the care profile, documents and decisions without losing control of permissions."
      actions={<button onClick={() => setShowNewShare(true)} className="inline-flex items-center gap-2 rounded-full bg-[#173f35] px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-950/15"><Plus className="h-4 w-4" /> New share</button>}
    >
      {showNewShare && (
        <Panel className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Create new share link</h2>
          <div className="mt-6 grid gap-5">
            <label className="grid gap-2"><span className="text-sm font-semibold text-[#61736a]">Email address</span><input type="email" value={newShareEmail} onChange={(event) => setNewShareEmail(event.target.value)} placeholder="family.member@example.com" className="rounded-2xl border border-[#dfd3c1] bg-white px-4 py-3 outline-none" /></label>
            <div className="grid gap-3 md:grid-cols-3">
              {Object.entries(roleDescriptions).map(([role, permissions]) => (
                <button key={role} onClick={() => setNewShareRole(role)} className={`rounded-3xl border p-5 text-left transition ${newShareRole === role ? "border-[#173f35] bg-[#173f35] text-white" : "border-[#eadfce] bg-[#f7f1e8] text-[#17231f]"}`}>
                  <p className="font-semibold capitalize">{role}</p>
                  <ul className={`mt-3 grid gap-1 text-sm ${newShareRole === role ? "text-[#dbe8e3]" : "text-[#61736a]"}`}>{permissions.map((permission) => <li key={permission}>✓ {permission}</li>)}</ul>
                </button>
              ))}
            </div>
            <div className="flex gap-3"><button onClick={createShare} className="rounded-full bg-[#173f35] px-6 py-3 font-semibold text-white">Create link</button><button onClick={() => setShowNewShare(false)} className="rounded-full border border-[#d8c9b7] bg-white px-6 py-3 font-semibold text-[#173f35]">Cancel</button></div>
          </div>
        </Panel>
      )}

      <div className="grid gap-4">
        {shares.map((share) => (
          <Panel key={share.id}>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3"><h2 className="text-2xl font-semibold tracking-tight">{share.name}</h2><Pill>{share.role}</Pill><Pill>{share.status}</Pill></div>
                <p className="mt-2 text-[#61736a]">{share.email} · Created {share.createdDate} · Expires {share.expiresDate}</p>
                <div className="mt-4 flex flex-wrap gap-2">{share.permissions.map((permission) => <Pill key={permission}>{permission}</Pill>)}</div>
                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#f7f1e8] p-4 text-sm text-[#43544c]"><Link2 className="h-4 w-4 text-[#173f35]" /><span className="truncate">{share.link}</span></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => copyLink(share.link, share.id)} className="inline-flex items-center gap-2 rounded-full bg-[#173f35] px-4 py-2 text-sm font-semibold text-white"><Copy className="h-4 w-4" /> {copiedId === share.id ? "Copied" : "Copy"}</button>
                <button onClick={() => setShares((current) => current.filter((item) => item.id !== share.id))} className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"><Trash2 className="h-4 w-4" /> Remove</button>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </ProductShell>
  );
}

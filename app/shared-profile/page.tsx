import { AlertCircle, Download, FileText, Heart, Share2, Users } from "lucide-react";
import { Panel, Pill, ProductShell } from "../../components/product-shell";

const profile = {
  recipientName: "Margaret Smith",
  age: 78,
  location: "Melbourne, VIC",
  emergencyContact: "Sarah Smith — (03) 9000 0000",
  medicalConditions: ["Hypertension", "Arthritis", "Mild cognitive impairment"],
  medications: ["Lisinopril 10mg daily", "Paracetamol as needed"],
  allergies: ["Penicillin"],
  carePathway: "Home Care with Support",
  fundingStatus: "Approved — Level 2 Home Care Package",
  primaryCarer: "Sarah Smith (Daughter)",
  careNeeds: ["Mobility assistance", "Medication management", "Meal preparation"],
  preferences: ["Prefers morning appointments", "Speaks English and Mandarin", "Enjoys gardening"],
  sharedBy: "Sarah Smith",
  sharedDate: "May 25, 2026",
};

const documents = ["Care Assessment Summary", "Hospital Discharge Report", "Medication List"];

export default function SharedProfilePage() {
  return (
    <ProductShell
      eyebrow="Shared care profile"
      title={`${profile.recipientName}'s care profile.`}
      description="A read-only care summary for family members, providers or emergency responders. Designed for fast context, not full medical record storage."
      actions={
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 rounded-full border border-[#d8c9b7] bg-white px-5 py-3 text-sm font-semibold text-[#173f35]"><Download className="h-4 w-4" /> Download</button>
          <button className="inline-flex items-center gap-2 rounded-full bg-[#173f35] px-5 py-3 text-sm font-semibold text-white"><Share2 className="h-4 w-4" /> Share</button>
        </div>
      }
    >
      <Panel className="mb-6 border-amber-200 bg-amber-50/70">
        <div className="flex gap-3"><AlertCircle className="h-5 w-5 text-[#bc7c51]" /><div><h2 className="text-xl font-semibold">Shared access notice</h2><p className="mt-1 leading-7 text-[#61736a]">This profile was shared by {profile.sharedBy} on {profile.sharedDate}. Access should be limited to people involved in care decisions.</p></div></div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Panel>
          <div className="flex items-center gap-3"><Heart className="h-5 w-5 text-[#173f35]" /><h2 className="text-2xl font-semibold tracking-tight">Care overview</h2></div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Age", `${profile.age}`],
              ["Location", profile.location],
              ["Care pathway", profile.carePathway],
              ["Funding", profile.fundingStatus],
              ["Emergency contact", profile.emergencyContact],
              ["Primary carer", profile.primaryCarer],
            ].map(([label, value]) => <div key={label} className="rounded-2xl bg-[#f7f1e8] p-4"><p className="text-sm text-[#61736a]">{label}</p><p className="mt-1 font-semibold text-[#17231f]">{value}</p></div>)}
          </div>
        </Panel>

        <Panel>
          <div className="flex items-center gap-3"><Users className="h-5 w-5 text-[#173f35]" /><h2 className="text-2xl font-semibold tracking-tight">Care needs</h2></div>
          <div className="mt-6 flex flex-wrap gap-2">{profile.careNeeds.map((item) => <Pill key={item}>{item}</Pill>)}</div>
          <h3 className="mt-8 font-semibold">Preferences</h3>
          <div className="mt-3 flex flex-wrap gap-2">{profile.preferences.map((item) => <Pill key={item}>{item}</Pill>)}</div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel><h2 className="text-xl font-semibold">Medical conditions</h2><div className="mt-4 grid gap-2">{profile.medicalConditions.map((item) => <Pill key={item}>{item}</Pill>)}</div></Panel>
        <Panel><h2 className="text-xl font-semibold">Medications</h2><div className="mt-4 grid gap-2">{profile.medications.map((item) => <Pill key={item}>{item}</Pill>)}</div></Panel>
        <Panel><h2 className="text-xl font-semibold">Allergies</h2><div className="mt-4 grid gap-2">{profile.allergies.map((item) => <Pill key={item}>{item}</Pill>)}</div></Panel>
      </div>

      <Panel className="mt-6">
        <div className="flex items-center gap-3"><FileText className="h-5 w-5 text-[#173f35]" /><h2 className="text-2xl font-semibold tracking-tight">Shared documents</h2></div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">{documents.map((doc) => <div key={doc} className="rounded-2xl bg-[#f7f1e8] p-4 font-semibold">{doc}<p className="mt-1 text-sm font-normal text-[#61736a]">PDF available</p></div>)}</div>
      </Panel>
    </ProductShell>
  );
}

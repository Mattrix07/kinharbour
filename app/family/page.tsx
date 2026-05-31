"use client";

import { useState } from "react";
import { CheckCircle2, MessageCircle, Send, ThumbsUp, Users } from "lucide-react";
import { Panel, Pill, ProductShell } from "../../components/product-shell";

const familyMembers = [
  { name: "Sarah Smith", role: "Primary Carer", status: "Active", avatar: "S" },
  { name: "James Smith", role: "Family Member", status: "Active", avatar: "J" },
  { name: "Emma Smith", role: "Family Member", status: "Invited", avatar: "E" },
];

export default function FamilyPage() {
  const [messages, setMessages] = useState([
    { author: "Sarah Smith", role: "Primary Carer", message: "I think BaptistCare is the best fit. They have excellent dementia support and are close to home.", timestamp: "2 hours ago", votes: 2 },
    { author: "James Smith", role: "Family Member", message: "Agreed. I visited yesterday and the staff were very attentive. My only concern is the cost.", timestamp: "1 hour ago", votes: 1 },
    { author: "Emma Smith", role: "Family Member", message: "What about HammondCare? They were also on the shortlist and had good reviews.", timestamp: "30 minutes ago", votes: 0 },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [decisions, setDecisions] = useState([
    { question: "Which provider should we choose?", status: "Voting", options: [{ name: "BaptistCare", votes: 2 }, { name: "HammondCare", votes: 1 }, { name: "Uniting Care", votes: 0 }], deadline: "June 5" },
    { question: "Should we book a second tour?", status: "Voting", options: [{ name: "Yes", votes: 2 }, { name: "No", votes: 1 }], deadline: "June 2" },
    { question: "Start care by end of June?", status: "Decided", options: [{ name: "Yes", votes: 3 }, { name: "No", votes: 0 }], result: "Yes" },
  ]);

  function sendMessage() {
    if (!newMessage.trim()) return;
    setMessages((current) => [...current, { author: "You", role: "Primary Carer", message: newMessage, timestamp: "just now", votes: 0 }]);
    setNewMessage("");
  }

  function vote(decisionIndex: number, optionName: string) {
    setDecisions((current) => current.map((decision, index) => index === decisionIndex ? { ...decision, options: decision.options.map((option) => option.name === optionName ? { ...option, votes: option.votes + 1 } : option) } : decision));
  }

  return (
    <ProductShell eyebrow="Family collaboration" title="Make aged care decisions together." description="Give siblings and carers one shared place to discuss providers, vote on choices and record family consensus.">
      <Panel>
        <div className="flex items-center gap-3"><Users className="h-5 w-5 text-[#173f35]" /><h2 className="text-2xl font-semibold tracking-tight">Family members</h2></div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {familyMembers.map((member) => (
            <div key={member.name} className="flex items-center gap-4 rounded-2xl bg-[#f7f1e8] p-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#173f35] font-bold text-white">{member.avatar}</span>
              <div className="flex-1"><p className="font-semibold">{member.name}</p><p className="text-sm text-[#61736a]">{member.role}</p></div>
              <Pill>{member.status}</Pill>
            </div>
          ))}
        </div>
      </Panel>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <Panel>
          <h2 className="text-2xl font-semibold tracking-tight">Decision votes</h2>
          <div className="mt-6 grid gap-5">
            {decisions.map((decision, decisionIndex) => (
              <div key={decision.question} className="rounded-3xl border border-[#eadfce] bg-white/70 p-5">
                <div className="flex items-start justify-between gap-4"><div><p className="text-lg font-semibold">{decision.question}</p><p className="mt-1 text-sm text-[#61736a]">Deadline: {decision.deadline ?? "Complete"}</p></div><Pill>{decision.status}</Pill></div>
                <div className="mt-4 grid gap-2">
                  {decision.options.map((option) => (
                    <button key={option.name} onClick={() => vote(decisionIndex, option.name)} className="flex items-center justify-between rounded-2xl bg-[#f7f1e8] px-4 py-3 text-left font-semibold transition hover:bg-[#fffaf2]">
                      <span>{option.name}</span><span className="text-[#173f35]">{option.votes} votes</span>
                    </button>
                  ))}
                </div>
                {decision.result && <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#173f35]"><CheckCircle2 className="h-4 w-4" /> Decision: {decision.result}</p>}
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="flex items-center gap-3"><MessageCircle className="h-5 w-5 text-[#173f35]" /><h2 className="text-2xl font-semibold tracking-tight">Family discussion</h2></div>
          <div className="mt-6 grid gap-4">
            {messages.map((message, index) => (
              <div key={`${message.author}-${index}`} className="rounded-3xl bg-[#f7f1e8] p-5">
                <div className="flex items-start justify-between gap-4"><div><p className="font-semibold">{message.author}</p><p className="text-sm text-[#61736a]">{message.role} · {message.timestamp}</p></div><span className="inline-flex items-center gap-1 text-sm font-semibold text-[#173f35]"><ThumbsUp className="h-4 w-4" /> {message.votes}</span></div>
                <p className="mt-3 leading-7 text-[#43544c]">{message.message}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <input value={newMessage} onChange={(event) => setNewMessage(event.target.value)} placeholder="Add a family note..." className="flex-1 rounded-2xl border border-[#dfd3c1] bg-white px-4 py-3 outline-none" />
            <button onClick={sendMessage} className="inline-flex items-center gap-2 rounded-2xl bg-[#173f35] px-5 py-3 font-semibold text-white"><Send className="h-4 w-4" /> Send</button>
          </div>
        </Panel>
      </div>
    </ProductShell>
  );
}

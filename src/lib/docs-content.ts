/**
 * Operator docs content (Ethan redirect, 2026-10-12): technical
 * documentation for using the Journeyman console. Lives on the public
 * site under /journeyman/docs — not in the product function; the console
 * keeps a single Guides link pointing here. Copy follows the README
 * voice rules: short sentences, one idea each, no AI vocabulary, and a
 * tight em-dash budget (these pages run at zero). Keep the docs in sync
 * with the live console UI when it changes.
 */

export interface DocSection {
  h: string;
  html: string;
}

export interface DocPage {
  slug: string;
  title: string;
  lede: string;
  sections: DocSection[];
}

export const DOCS: DocPage[] = [
  {
    slug: 'start',
    title: 'Getting started',
    lede: 'Sign in, look around, and get your first cited answer in two minutes.',
    sections: [
      {
        h: 'Sign in',
        html: `<p>Open the console address your admin sent you. Sign in with the email and the password you set when you redeemed your invite. If you have not redeemed it yet, open the invite link first. It walks you through setting a password.</p>`,
      },
      {
        h: 'The console at a glance',
        html: `<ul>
          <li><strong>Scenario picker</strong> (top right): scopes every question to one scenario's footage. <em>All scenarios</em> searches everything indexed.</li>
          <li><strong>Suggested chips</strong>: ready questions for the picked scenario. The fastest first answer.</li>
          <li><strong>Question box</strong>: ask about a machine, an alarm, or a procedure, then <strong>Ask</strong>.</li>
          <li><strong>Recordings</strong>: your plant's captured footage, listed and playable.</li>
          <li><strong>New conversation</strong>: wipes the thread and starts clean.</li>
        </ul>`,
      },
      {
        h: 'Your first answer in two minutes',
        html: `<ol>
          <li>Pick a scenario, for example <em>Fault 078-127 jam clearance</em>.</li>
          <li>Click the first suggested chip.</li>
          <li>The answer streams in. About seven seconds, with the status line narrating each step.</li>
          <li>Click any orange citation chip in the answer. The segment player opens at exactly that moment in the footage.</li>
          <li>Ask a follow-up like "and which handle was that again?" The thread remembers.</li>
        </ol>`,
      },
      {
        h: 'What Journeyman knows',
        html: `<p>Only what has been ingested: operator footage that has been transcribed, chunked, and indexed. When a question falls outside that material, the answer says so instead of guessing. Ask your admin which scenarios are indexed today.</p>`,
      },
    ],
  },
  {
    slug: 'asking',
    title: 'Asking questions',
    lede: 'Scope first, ask plainly, and let the thread carry the context.',
    sections: [
      {
        h: 'Scope with the scenario picker',
        html: `<p>The picker at the top restricts retrieval to one scenario's footage. Scoped questions get sharper answers: with <em>Fault 078-127 jam clearance</em> selected, a question about that fault can only be answered from that footage. Use <em>All scenarios</em> when you are not sure which recording covers something.</p>`,
      },
      {
        h: 'Follow-ups and thread memory',
        html: `<p>Within one conversation, Journeyman remembers what was said. Ask what to do with handle 1A, then "and what about door 3?" The follow-up lands in context. Thread memory is per conversation: <strong>New conversation</strong> starts a clean thread.</p>`,
      },
      {
        h: 'What makes a good question',
        html: `<ul>
          <li>Name the machine, the fault code, the alarm, or the procedure. "Versant 180 fault 078-127 jam: what do I do?"</li>
          <li>Ask for the procedure, not a yes or no. "How do I clear it" beats "is it jammed."</li>
          <li>One topic per question beats a compound one.</li>
        </ul>`,
      },
      {
        h: 'Latency and the status line',
        html: `<p>Expect the first word in about two seconds and the full answer in about seven. The status line below the box narrates each phase: retrieving evidence, grounding, answering. If a request stalls, a watchdog ends it after 150 seconds. Resend the question.</p>`,
      },
    ],
  },
  {
    slug: 'citations',
    title: 'Citations and playback',
    lede: 'Every claim names its source segment, and every source plays.',
    sections: [
      {
        h: 'Why citations',
        html: `<p>Every factual claim in an answer carries an orange citation chip: the evidence segment it came from. Citations let you check the answer against the footage. They are the point of the product.</p>`,
      },
      {
        h: 'Verified vs unverified',
        html: `<ul>
          <li><strong>Verified</strong> (orange): the citation maps to evidence actually retrieved for your question. The verified count appears under each answer.</li>
          <li><strong>Unverified</strong> (amber, hatched): the model cited something outside its retrieved evidence. Treat the claim as suspect. Re-ask or rephrase.</li>
        </ul>`,
      },
      {
        h: 'The segment player',
        html: `<ul>
          <li>Hover a chip for the segment's poster frame. Click to open the player.</li>
          <li>The band under the video shows the full recording with the cited span marked. Click the band to seek.</li>
          <li>Playback starts on its own at the beginning of the span.</li>
          <li>It pauses at the end of the span and offers <strong>Replay segment</strong>.</li>
          <li>Scrub past the end and you keep watching. The band keeps the cited span marked for context.</li>
          <li>The bar shows the camera and the spoken line for the span. The × closes the player.</li>
        </ul>`,
      },
      {
        h: 'Why some citations span the whole recording',
        html: `<p>Each scenario carries a whole-clip summary, called the lesson. A citation to it marks the full track. That is correct behavior, not a playback bug. Citations to individual spoken segments mark a narrow span.</p>`,
      },
    ],
  },
  {
    slug: 'recordings',
    title: 'Recordings',
    lede: "Your plant's captured footage, and how it becomes answers.",
    sections: [
      {
        h: 'What the surface shows',
        html: `<p>The Recordings page lists your captured footage: machine, scenario, who captured it, cameras, duration. Open one to watch it.</p>`,
      },
      {
        h: 'How footage becomes knowledge',
        html: `<p>Raw footage goes through the capture pipeline before the console can cite it. Cameras are synchronized. Speech is transcribed per camera. The transcript is cut into timestamped segments, and those segments are embedded for search. When you ask a question, retrieval runs over those segments. That is why a citation can open the video at the exact moment a step was explained.</p>`,
      },
      {
        h: 'Link-back',
        html: `<p>A recording whose footage fed the searchable corpus shows the evidence derived from it. You can trace an answer back to the original capture.</p>`,
      },
      {
        h: 'Uploading',
        html: `<p>If your role includes capture, your admin will tell you when to upload raw footage. Phone video is fine. Uploads are processed by the Journeyman team before they become searchable; they do not appear in answers right away.</p>`,
      },
    ],
  },
  {
    slug: 'admin',
    title: 'Invites and quotas',
    lede: 'Invite-only access, and the limits that keep one busy shift from draining the budget.',
    sections: [
      {
        h: 'Inviting your team',
        html: `<p>Access is invite-only. An admin issues invite links. The recipient redeems the link, sets a password, and signs in. For seats, contact your Journeyman admin.</p>`,
      },
      {
        h: 'Usage quotas',
        html: `<ul>
          <li><strong>Chat</strong>: 300 questions per month, 10 per minute burst.</li>
          <li><strong>Tokens</strong>: 1.5M per month. Covers long answers and follow-up-heavy threads.</li>
          <li><strong>Playback</strong>: 120 segment loads per hour.</li>
        </ul>
        <p>Hitting a limit returns a clear message, such as "429: monthly chat request limit," with the reset window. Chat quotas reset monthly, playback hourly. Your admin can check your current usage and request a raise.</p>`,
      },
    ],
  },
  {
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    lede: 'What to check before you escalate.',
    sections: [
      {
        h: 'Answers stall or come back empty',
        html: `<p>Watch the status line; it tells you which phase is running. A watchdog ends any request after 150 seconds. Resend the question. If stalls persist, report the rough time and the question to your admin.</p>
        <p>"No matching evidence was retrieved" means the question is outside the indexed corpus, or the scenario filter is too narrow. Try <em>All scenarios</em>, or rephrase with the machine name and fault code. If footage should cover it, the recording may still be in processing.</p>`,
      },
      {
        h: 'Citations look wrong',
        html: `<p>An unverified (amber) citation means the model cited evidence it was not given. Do not trust that specific claim; re-ask the question. If it repeats, report it.</p>
        <p>"Playback unavailable" means the cited segment could not be found. Report the answer text and the citation to your admin. That is a bug, not something you did wrong.</p>`,
      },
      {
        h: 'Account and help',
        html: `<p>Password resets go through your admin. Use the email your invite was issued to. Your first contact for anything else is also your admin; they escalate to Wollack Systems with the details: time, scenario, question, what you saw.</p>`,
      },
    ],
  },
];

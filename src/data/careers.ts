export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  type: 'Full-time' | 'Contract';
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior Project Manager — High-Rise Construction',
    department: 'Civil Engineering & Construction',
    location: 'New Chandigarh, Punjab',
    experience: '10–14 Years',
    type: 'Full-time',
    description: 'Lead execution of large-scale residential towers and waterfront luxury projects adhering strictly to safety, structural quality, and scheduled delivery.',
    responsibilities: [
      'Manage site civil engineers, subcontractors, and MEP coordinators on active multi-tower sites.',
      'Enforce zero-compromise safety protocols and 5-stage ISO quality audits.',
      'Track project milestones via Primavera/MS Project and deliver monthly executive reviews.',
      'Coordinate with regional structural consultants and municipal authorities for inspections.',
    ],
    qualifications: [
      'B.Tech / B.E. in Civil Engineering from a recognized university; M.Tech preferred.',
      'Demonstrated track record executing 15+ floor residential RCC structures.',
      'Strong leadership, dispute resolution, and contractual negotiation capabilities.',
    ],
  },
  {
    id: 'job-2',
    title: 'Assistant General Manager — Commercial Leasing',
    department: 'Sales & Leasing',
    location: 'New Delhi (Dwarka / Kalkaji)',
    experience: '8–12 Years',
    type: 'Full-time',
    description: 'Drive high-street retail, F&B, and flagship corporate brand leasing for The Omaxe State and Omaxe Chowk.',
    responsibilities: [
      'Pitch and negotiate anchor lease contracts with national retail chains, fashion brands, and multiplexes.',
      'Structure revenue-share, minimum-guarantee, and fitout timeline agreements.',
      'Collaborate with the architectural design team on tenant spatial layouts and zoning.',
      'Monitor competitive leasing dynamics across Delhi-NCR commercial hubs.',
    ],
    qualifications: [
      'MBA in Marketing / Real Estate / Retail Management.',
      'Established direct network with leading Indian retail brand expansion heads.',
      'Flawless presentation and commercial term-sheet closure acumen.',
    ],
  },
  {
    id: 'job-3',
    title: 'Lead Landscape Architect & Urban Planner',
    department: 'Architecture & Design',
    location: 'New Delhi Corporate HQ',
    experience: '7–10 Years',
    type: 'Full-time',
    description: 'Design biophilic water features, forest walkways, central township greens, and pedestrian boulevards for new regional developments.',
    responsibilities: [
      'Create concept masters and execution drawings for signature landscape features.',
      'Select native flora, drought-resistant turf, and water-recycling irrigation schemes.',
      'Integrate LEED / IGBC Platinum landscape sustainability benchmarks.',
      'Perform periodic site reviews across Lucknow, Ludhiana, and Indore projects.',
    ],
    qualifications: [
      'Master’s in Landscape Architecture (M.Arch) or Urban Planning.',
      'Proficiency with AutoCAD, Rhino, Lumion, and sustainable hydrology modeling.',
      'A design portfolio demonstrating large township or public park executions.',
    ],
  },
  {
    id: 'job-4',
    title: 'Senior Manager — Customer Relationship Management (CRM)',
    department: 'Customer Care & CRM',
    location: 'Lucknow, Uttar Pradesh',
    experience: '6–9 Years',
    type: 'Full-time',
    description: 'Lead buyer communication, milestone payment billing, unit handover scheduling, and homeowner dispute resolution across Lucknow developments.',
    responsibilities: [
      'Oversee a 12-member CRM team handling inquiries from allotment to registry.',
      'Ensure 95%+ first-contact resolution on customer care requests and portal tickets.',
      'Organize possession ceremonies and smooth society handover transitions.',
      'Manage Salesforce / SAP CRM workflows and customer satisfaction indices.',
    ],
    qualifications: [
      'Post Graduate / MBA with proven real estate CRM background.',
      'Empathetic communicator with strong de-escalation skills.',
      'In-depth knowledge of UP-RERA buyer guidelines and registry procedures.',
    ],
  },
  {
    id: 'job-5',
    title: 'Legal Counsel — Real Estate Compliance & RERA',
    department: 'Legal & Secretarial',
    location: 'New Delhi Corporate HQ',
    experience: '5–8 Years',
    type: 'Full-time',
    description: 'Advise on title searches, land acquisition deeds, RERA quarterly filings, joint venture agreements, and regulatory compliances.',
    responsibilities: [
      'Draft and review Builder-Buyer Agreements, allotment letters, and lease deeds.',
      'Ensure strict compliance with state RERA authorities in Delhi, Haryana, Punjab, and UP.',
      'Liaise with external senior advocates for appellate and civil tribunal matters.',
      'Conduct comprehensive due diligence for prospective land acquisitions and PPP tenders.',
    ],
    qualifications: [
      'LL.B / LL.M from a premier law institute.',
      'Solid hands-on expertise in Indian real estate laws, Transfer of Property Act, and RERA.',
      'Impeccable drafting and regulatory statutory interpretation skills.',
    ],
  },
  {
    id: 'job-6',
    title: 'Quality Assurance & Quality Control (QA/QC) Engineer',
    department: 'Civil Engineering & Construction',
    location: 'Faridabad, Haryana',
    experience: '4–7 Years',
    type: 'Full-time',
    description: 'Conduct on-site non-destructive testing, cube test evaluations, raw material chemical testing, and audit checklists against ISO standards.',
    responsibilities: [
      'Perform routine slump tests, steel tensile audits, and batching plant calibrations.',
      'Issue Non-Conformance Reports (NCRs) and oversee immediate rectification measures.',
      'Maintain comprehensive QA/QC inspection registers for RERA and third-party auditors.',
      'Train site contractors on modern waterproofing and thermal insulation applications.',
    ],
    qualifications: [
      'Diploma or B.Tech in Civil Engineering.',
      'Prior QA/QC certification or experience on Grade-A builder sites.',
      'Analytical precision and zero tolerance for structural shortcuts.',
    ],
  },
];

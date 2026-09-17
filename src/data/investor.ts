// Data for Investor Relations, Financials, Shareholding, and Corporate Governance

export interface FinancialReport {
  id: string;
  title: string;
  quarter: string;
  financialYear: string;
  date: string;
  pdfSize: string;
  category: 'Quarterly Financials' | 'Audited Annual' | 'Investor Presentation' | 'Earnings Call Transcript';
}

export interface AnnualReport {
  year: string;
  title: string;
  theme: string;
  pages: number;
  fileSize: string;
  coverImage: string;
}

export interface ShareholdingEntity {
  category: string;
  percentage: number;
  sharesCount: string;
  description: string;
}

export interface GovernanceCommittee {
  name: string;
  chairperson: string;
  members: string[];
  mandate: string;
}

export const FINANCIAL_RESULTS_DATA: FinancialReport[] = [
  {
    id: 'fin-q3-fy26',
    title: 'Unaudited Financial Results for Q3 ended Dec 31, 2025',
    quarter: 'Q3 FY 2025-26',
    financialYear: '2025-26',
    date: 'February 12, 2026',
    pdfSize: '2.4 MB',
    category: 'Quarterly Financials',
  },
  {
    id: 'fin-pres-q3-fy26',
    title: 'Investor Presentation & Operational Performance — Q3 FY26',
    quarter: 'Q3 FY 2025-26',
    financialYear: '2025-26',
    date: 'February 12, 2026',
    pdfSize: '4.8 MB',
    category: 'Investor Presentation',
  },
  {
    id: 'fin-trans-q3-fy26',
    title: 'Transcript of Conference Call with Analysts & Institutional Investors',
    quarter: 'Q3 FY 2025-26',
    financialYear: '2025-26',
    date: 'February 16, 2026',
    pdfSize: '820 KB',
    category: 'Earnings Call Transcript',
  },
  {
    id: 'fin-q2-fy26',
    title: 'Unaudited Financial Results for Q2 ended Sept 30, 2025',
    quarter: 'Q2 FY 2025-26',
    financialYear: '2025-26',
    date: 'November 14, 2025',
    pdfSize: '2.1 MB',
    category: 'Quarterly Financials',
  },
  {
    id: 'fin-q1-fy26',
    title: 'Unaudited Financial Results for Q1 ended June 30, 2025',
    quarter: 'Q1 FY 2025-26',
    financialYear: '2025-26',
    date: 'August 12, 2025',
    pdfSize: '1.9 MB',
    category: 'Quarterly Financials',
  },
  {
    id: 'fin-audited-fy25',
    title: 'Audited Standalone and Consolidated Results for FY ended March 31, 2025',
    quarter: 'Full Year FY 2024-25',
    financialYear: '2024-25',
    date: 'May 28, 2025',
    pdfSize: '3.6 MB',
    category: 'Audited Annual',
  },
];

export const ANNUAL_REPORTS_DATA: AnnualReport[] = [
  {
    year: '2024-2025',
    title: '35th Annual Report 2024-25',
    theme: 'Architecting Enduring Value: Transforming Urban Bharat',
    pages: 284,
    fileSize: '14.2 MB',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80',
  },
  {
    year: '2023-2024',
    title: '34th Annual Report 2023-24',
    theme: 'Pioneering Regional Townships & Civic Landmarks',
    pages: 268,
    fileSize: '12.8 MB',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
  },
  {
    year: '2022-2023',
    title: '33rd Annual Report 2022-23',
    theme: 'Resilience, Delivery & Customer Centricity',
    pages: 252,
    fileSize: '11.5 MB',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80',
  },
  {
    year: '2021-2022',
    title: '32nd Annual Report 2021-22',
    theme: 'Reimagining Communities for a New Era',
    pages: 240,
    fileSize: '10.9 MB',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
  },
];

export const SHAREHOLDING_DATA: ShareholdingEntity[] = [
  {
    category: 'Promoter & Promoter Group',
    percentage: 74.14,
    sharesCount: '13,56,12,840',
    description: 'Founding family equity commitment with zero shares pledged.',
  },
  {
    category: 'Foreign Portfolio Investors (FPIs)',
    percentage: 3.82,
    sharesCount: '69,87,620',
    description: 'Global institutional funds and long-term asset managers.',
  },
  {
    category: 'Domestic Mutual Funds & Financial Institutions',
    percentage: 5.46,
    sharesCount: '99,87,310',
    description: 'Indian mutual funds, insurance providers, and scheduled banks.',
  },
  {
    category: 'Resident Individuals & High Net-worth Investors',
    percentage: 14.28,
    sharesCount: '2,61,22,430',
    description: 'Public retail and high-net-worth investors across India.',
  },
  {
    category: 'Bodies Corporate & Non-Resident Indians (NRIs)',
    percentage: 2.30,
    sharesCount: '42,06,120',
    description: 'Corporate trusts, clearing members, and overseas Indian investors.',
  },
];

export const GOVERNANCE_COMMITTEES: GovernanceCommittee[] = [
  {
    name: 'Audit Committee',
    chairperson: 'Mr. Arvind Gupta (Independent Director)',
    members: ['Mr. Rohtaas Goel', 'Mrs. Sunita Verma', 'Mr. D.K. Goyal'],
    mandate: 'Oversees financial disclosures, statutory audits, internal controls, and risk management systems in compliance with SEBI LODR.',
  },
  {
    name: 'Nomination & Remuneration Committee',
    chairperson: 'Mrs. Sunita Verma (Independent Director)',
    members: ['Mr. Arvind Gupta', 'Mr. Rohtaas Goel'],
    mandate: 'Formulates criteria for director appointment, evaluates board performance, and oversees executive compensation policy.',
  },
  {
    name: 'Stakeholders Relationship Committee',
    chairperson: 'Mr. D.K. Goyal (Independent Director)',
    members: ['Mr. Mohit Goel', 'Mr. Jatin Goel'],
    mandate: 'Ensures prompt resolution of shareholder grievances, share transfer processing, dividend claims, and general investor correspondence.',
  },
  {
    name: 'Corporate Social Responsibility (CSR) Committee',
    chairperson: 'Mr. Rohtaas Goel (Chairman)',
    members: ['Mr. Mohit Goel', 'Mrs. Sunita Verma'],
    mandate: 'Steers health, vocational training, education, and ecological initiatives across Omaxe townships in Tier-II & Tier-III cities.',
  },
];

import FeastFinder from "@/assets/images/FeastFinder.png";
import InternHub from "@/assets/images/InternHub.png";
import SpamLite from "@/assets/images/spamlite.png";
import RareDx from "@/assets/images/RareDx.png";
import Gap0 from "@/assets/images/Gap0.png";
import HealthSpeak from "@/assets/images/HealthSpeak.png";
import SupplyShield from "@/assets/images/SupplyShield.png";
import Suraksha from "@/assets/images/Suraksha.png";
import TruthLens from "@/assets/images/TruthLens.png";
import StudyStack from "@/assets/images/StudyStack.png";
import PhonePe from "@/assets/images/PhonePe.png";
import CustomerBehavior from "@/assets/images/Customer_Behavior.png";
import AIPhen from "@/assets/images/AIPhen.png";

const portfolioProjects = [
  {
    company: "FestFinder",
    year: "2024",
    title: "Recipe Finder App",
    category: "Web Development",
    results: [
      { title: "Built with HTML, CSS & JavaScript using MealDB API" },
      { title: "Enabled ingredient-based search for over 200+ recipes" },
      { title: "Enhanced user engagement through simple and intuitive UI" },
    ],
    link: "https://feast-finder-ten.vercel.app/",
    image: FeastFinder,
  },
  {
    company: "StudyStack",
    year: "2026",
    title: "Study Resource Tracker & Vault",
    category: "Web Development",
    results: [
      { title: "Built full-stack application using React, FastAPI, Supabase, and Clerk Auth" },
      { title: "Integrated interactive stats dashboard with visual distribution and activity charts" },
      { title: "Implemented local database fallback for seamless offline capability" },
    ],
    link: "https://study-stack-vert.vercel.app/",
    image: StudyStack,
  },
  {
    company: "InternHub",
    year: "2025",
    title: "Internship Posting Portal",
    category: "Web Development",
    results: [
      { title: "Built with HTML, CSS & JavaScript using MealDB API" },
      { title: "Enabled ingredient-based search for over 200+ recipes" },
      { title: "Enhanced user engagement through simple and intuitive UI" },
    ],
    link: "https://internship-posting-portal.vercel.app/",
    image: InternHub,
  },
  {
    company: "Spamlite",
    year: "2021",
    title: "SMS Spam Detection",
    category: "Data Science",
    results: [
      { title: "Trained ML model using Scikit-learn with 95% accuracy" },
      { title: "Used Streamlit to deploy an interactive web app" },
      { title: "Processed 5,000+ SMS samples for real-time classification" },
    ],
    link: "https://sms-spam-detection-ksroffnutzevqpuhrywbah.streamlit.app/",
    image: SpamLite,
  },
  {
    company: "PhonePe",
    year: "2024",
    title: "UPI Payment Interface Clone",
    category: "Data Science",
    results: [
      { title: "Built a secure payment interface simulating PhonePe UPI transactions and wallet flows" },
      { title: "Implemented real-time transaction history tracking and payment status dashboard" },
      { title: "Integrated robust verification checks for money transfers and UPI payments" },
    ],
    link: "https://app.fabric.microsoft.com/links/OHdSwlZmMZ?ctid=4517da72-c8f7-4cec-b2fc-fda9fe4354f9&pbi_source=linkShare",
    image: PhonePe,
  },
  {
    company: "CustomerBehavior",
    year: "2024",
    title: "SQL & Python Customer Analytics",
    category: "Data Science",
    results: [
      { title: "Analyzed customer purchasing patterns and trends using SQL database queries and Python Pandas/NumPy" },
      { title: "Built an interactive Power BI dashboard to visualize cohort retention and sales performance metrics" },
      { title: "Extracted key demographic insights to optimize marketing campaign targeting and increase ROI" },
    ],
    link: "https://app.fabric.microsoft.com/links/OHdSwlZmMZ?ctid=4517da72-c8f7-4cec-b2fc-fda9fe4354f9&pbi_source=linkShare",
    image: CustomerBehavior,
  },
  
  {
    company: "Gap0",
    year: "2026",
    title: "AI Skill Gap Analyzer",
    category: "Hackathon",
    results: [
      { title: "Built with React 19, Flask backend, SQLite, and Google Gemini AI API" },
      { title: "Enabled student skill profiling and automated resume parsing to identify skill gaps" },
      { title: "Generated custom, phased learning roadmaps populated with curated resources" },
    ],
    link: "https://gap0-z3sf.vercel.app/",
    image: Gap0,
  },
  {
    company: "Suraksha",
    year: "2026",
    title: "Disaster Intelligence System",
    category: "Hackathon",
    results: [
      { title: "Developed multi-source ingestion pipeline for Open-Meteo, USGS, GDACS, and news alerts" },
      { title: "Engineered cross-source verification, temporal anomaly detection, and incident fusion" },
      { title: "Created Leaflet GIS dashboard featuring priority incidents and event timelines" },
    ],
    link: "https://suraksha-mu.vercel.app/",
    image: Suraksha,
  },
  {
    company: "HealthSpeak",
    year: "2025",
    title: "Prescription Decoder App",
    category: "Hackathon",
    results: [
      { title: "Built responsive frontend using React, Tailwind CSS, and Framer Motion" },
      { title: "Integrated Google Vision OCR API to extract prescription text for local JSON dictionary mapping" },
      { title: "Implemented browser-based Text-to-Speech (Web Speech API) for voice narration" },
    ],
    link: "https://health-speak.vercel.app/",
    image: HealthSpeak,
  },
  {
    company: "SupplyShield",
    year: "2026",
    title: "Supply Chain Risk Intelligence",
    category: "Hackathon",
    results: [
      { title: "Built full-stack app using React, FastAPI, SQLite, and scikit-learn" },
      { title: "Ingested live commodity prices (data.gov.in) and weather signals to predict disruptions" },
      { title: "Developed ensemble ML model (Random Forest + GBR) with 14-day historical trend graphs" },
    ],
    link: "https://supplyshield-frontend.vercel.app/",
    image: SupplyShield,
  },
  {
    company: "TruthLens",
    year: "2026",
    title: "AI Fact-Checking System",
    category: "Hackathon",
    results: [
      { title: "Built using React (Vite) + Tailwind CSS frontend and FastAPI proxy backend" },
      { title: "Orchestrated n8n multi-agent visual workflows to automate verification queries" },
      { title: "Leveraged Google Gemini AI to analyze claims and synthesize final verdicts" },
    ],
    link: "https://truthlens-frontend-beta.vercel.app/",
    image: TruthLens,
  },
  {
    company: "RareDx",
    year: "2023",
    title: "Rare Disease Diagnostic Tool",
    category: "Hackathon",
    results: [
      { title: "Designed AI system to assist in rare disease diagnosis" },
      { title: "Analyzed symptoms, history & lab reports for prediction" },
      { title: "Aimed to support doctors with data-driven decisions" },
    ],
    link: "https://rxai.vercel.app/",
    image: RareDx,
  },
    {
    company: "AIPhen",
    year: "2025",
    title: "GenAI-Based Financial Education Platform",
    category: "Hackathon",
    results: [
      { title: "Built a privacy-first educational platform using Firebase Auth, Firestore, and Google IDX" },
      { title: "Integrated Google Finance API to enable real-time investment product discovery" },
      { title: "Achieved near-perfect performance benchmarks with a 99+ Lighthouse score" },
    ],
    link: "https://aiphen.atrv.tech/",
    image: AIPhen,
  },
];

export default portfolioProjects;
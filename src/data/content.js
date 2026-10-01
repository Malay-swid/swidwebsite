const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const CONTENT = {
  hero: {
    title: "The Future is Bright.",
    subtitle: "Precision Engineering. Sustainable Prestige. Infinite Potential.",
    // Hero uses animated SVG solar cell - no external image needed
  },
  growth: {
    title: "Powering Profits. Every Watt.",
    subtitle: "Redefining the Indian energy landscape with unmatched scale and engineering excellence.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2200&q=85",
  },
  transition: {
    traditional: {
      title: "The Burden of Tradition",
      desc: "Rising costs, carbon footprints, and outdated infrastructure that hinder industrial growth."
    },
    solar: {
      title: "The Freedom of Solar",
      desc: "Energy independence, plummeting operational costs, and sustainable corporate prestige."
    }
  },
  ecosystem: [
    {
      id: 'l1',
      title: "L1 Lowest Cost",
      desc: "Guaranteed lowest cost via direct procurement and zero subcontractor margins.",
      benefit: "Maximum ROI",
      icon: "trending-up",
      img: publicAsset("images/l1-cost.svg"),
      metrics: ["23% Avg. Savings", "Direct EPC Model", "Zero Subcontractors"]
    },
    {
      id: 's1',
      title: "S1 Safest Execution",
      desc: "Uncompromising safety protocols ensuring zero-incident project delivery.",
      benefit: "Risk Mitigation",
      icon: "shield",
      img: publicAsset("images/s1-safety.svg"),
      metrics: ["0 LTI Record", "ISO 45001 Certified", "Real-time Monitoring"]
    },
    {
      id: 'q1',
      title: "Q1 Unmatched Quality",
      desc: "End-to-end quality control from procurement to commissioning.",
      benefit: "Long-term Durability",
      icon: "award",
      img: publicAsset("images/q1-quality.svg"),
      metrics: ["Tier-1 Components", "100% EL Tested", "25-Year Warranty"]
    },
    {
      id: 't1',
      title: "T1 Fastest Timelines",
      desc: "Optimized project management for the fastest time-to-energization.",
      benefit: "Quick Payback",
      icon: "zap",
      img: publicAsset("images/t1-speed.svg"),
      metrics: ["40% Faster", "Parallel Workstreams", "Digital Twins"]
    },
  ],
  stats: {
    title: "Numbers That Define Scale",
    items: [
      { value: "120+", label: "MW Commissioned", prefix: "", suffix: "+" },
      { value: "500+", label: "Cr. Projects Delivered", prefix: "₹", suffix: " Cr" },
      { value: "500+", label: "Industrial Clients", prefix: "", suffix: "+" },
      { value: "99.2%", label: "Plant Availability", prefix: "", suffix: "%" },
    ]
  },
  solutions: [
    {
      title: "Solar EPC",
      desc: "End-to-end engineering, procurement & construction for utility & C&I scale.",
      icon: "factory",
      features: ["Land Acquisition", "Design & Engineering", "Procurement", "Construction", "Commissioning"],
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=85"
    },
    {
      title: "BESS (Battery Storage)",
      desc: "Intelligent energy storage systems for peak shaving, backup & grid services.",
      icon: "battery",
      features: ["LFP Chemistry", "EMS Integration", "Fire Safety Systems", "Remote Monitoring", "Modular Design"],
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=85"
    },
    {
      title: "Operations & Maintenance",
      desc: "AI-driven predictive maintenance ensuring 99.2% plant availability.",
      icon: "building",
      features: ["Real-time SCADA", "Drone Thermography", "Auto Ticketing", "Performance Analytics", "24/7 NOC"],
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1600&q=85"
    },
  ],
  impact: {
    title: "Beyond Energy. Building Legacies.",
    stats: [
      { label: "CSR Contribution", value: "₹23.66 Lakhs", highlight: true },
      { label: "Homes Powered", value: "500+", highlight: false },
      { label: "MW Installed", value: "120+", highlight: false },
    ],
    projects: [
      {
        name: "Baburao Dandukar Smarak Samiti",
        location: "Shikrapur",
        amount: "₹1,50,000/-",
        desc: "Dedicated to nurturing young learners in a supportive rural environment.",
        image: publicAsset("images/shikrapur.svg")
      },
      {
        name: "Aniket Sevabhumi Sanstha",
        location: "Uravade",
        amount: "₹1,00,000/-",
        desc: "Supporting residential institutions for differently abled children.",
        image: publicAsset("images/uravade.svg")
      }
    ],
    quote: "Precision in every panel, purpose in every watt."
  },
  footer: {
    ctaTitle: "Ready to Transcend?",
    ctaButton: "Start Your Journey"
  }
};

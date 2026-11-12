/**
 * CardioCare Demonstration Data & Bilingual (EN/AR) UI Dictionary
 * IMPORTANT: All records below are strictly frontend demonstration data.
 * No real patient records, medical diagnoses, or live hospital bookings are stored here.
 */
window.CARDIOCARE_DEMO = {
  clinicContact: {
    address: "420 Clinical Wellness Boulevard, Suite 310 (Demo Address)",
    phone: "+1 (555) 014-8920",
    email: "care.demo@cardiocare.example",
    hours: "Mon – Sat: 8:00 AM – 6:30 PM"
  },

  services: [
    {
      id: "general-consultation",
      title: "General Cardiology Consultation",
      deliveryType: "In-House Service",
      shortDesc: "Comprehensive heart health evaluation, medical history review, symptom assessment, and personalized care planning.",
      purpose: "Evaluate cardiovascular symptoms, review blood pressure and family risk history, and establish a clear preventive or diagnostic plan.",
      preparation: "Bring a list of current medications, previous cardiac reports, and note any recent symptoms or questions.",
      image: "https://images.pexels.com/photos/6129197/pexels-photo-6129197.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Cardiologist discussing health records with a patient during a consultation"
    },
    {
      id: "ecg-testing",
      title: "ECG Testing",
      deliveryType: "In-House Diagnostic",
      shortDesc: "Resting 12-lead electrocardiogram recording electrical heart activity for prompt specialist review.",
      purpose: "Record the heart's electrical rhythm and rate non-invasively to support clinical evaluation by your cardiologist.",
      preparation: "Wear a comfortable two-piece outfit; avoid applying oily lotions to the chest area on the morning of your test.",
      image: "https://images.pexels.com/photos/8460088/pexels-photo-8460088.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Patient undergoing a supervised resting ECG procedure in the clinic"
    },
    {
      id: "echocardiography",
      title: "Echocardiography",
      deliveryType: "In-House Diagnostic",
      shortDesc: "Non-invasive ultrasound imaging to assess heart chambers, valve motion, and overall pumping function.",
      purpose: "Visualize heart structures and blood flow patterns safely using ultrasound waves without radiation.",
      preparation: "No fasting is required for a standard transthoracic echocardiogram; wear comfortable clothing.",
      image: "https://images.pexels.com/photos/7089420/pexels-photo-7089420.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Clinician performing a cardiac ultrasound examination in a modern clinic room"
    },
    {
      id: "cardiac-stress-testing",
      title: "Cardiac Stress Testing",
      deliveryType: "Physician-Assessed / Coordinated",
      shortDesc: "Monitored exercise-based cardiac evaluation performed following specialist suitability screening.",
      purpose: "Observe heart rhythm and blood pressure response during controlled physical exertion under medical supervision.",
      preparation: "Wear supportive athletic shoes and light clothing. Consult your doctor beforehand about routine morning medications.",
      image: "https://images.pexels.com/photos/8460228/pexels-photo-8460228.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Patient completing a supervised cardiac stress test with clinicians monitoring"
    },
    {
      id: "blood-pressure-assessment",
      title: "Blood Pressure Assessment",
      deliveryType: "In-House Service",
      shortDesc: "Structured blood pressure profiling and guided review to support long-term vascular wellness.",
      purpose: "Establish accurate baseline blood pressure readings and review home monitoring logs with a clinician.",
      preparation: "Avoid caffeine or strenuous exercise 30 minutes prior to your appointment and bring your home cuff log if available.",
      image: "https://images.pexels.com/photos/8460124/pexels-photo-8460124.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Healthcare specialist measuring a patient's blood pressure during consultation"
    },
    {
      id: "preventive-heart-health",
      title: "Preventive Heart Health",
      deliveryType: "In-House Consultation",
      shortDesc: "Proactive nutrition, exercise, cholesterol, and lifestyle guidance tailored to your personal risk profile.",
      purpose: "Support long-term cardiovascular wellness before symptoms develop through sustainable, evidence-based habits.",
      preparation: "Bring recent lipid or blood glucose lab summaries if completed within the past 6 months.",
      image: "https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Cardiology consultant reviewing preventive heart care guidance"
    },
    {
      id: "cardiac-risk-assessment",
      title: "Cardiac Risk Assessment",
      deliveryType: "In-House & Lab Coordination",
      shortDesc: "Integrated review of family history, metabolic markers, and lifestyle indicators with specialist interpretation.",
      purpose: "Identify modifiable cardiovascular risk factors early and organize appropriate follow-up monitoring.",
      preparation: "Note any immediate family cardiac history and bring recent routine laboratory paperwork.",
      image: "https://images.pexels.com/photos/7108425/pexels-photo-7108425.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Specialist operating diagnostic heart imaging equipment in clinic"
    },
    {
      id: "follow-up-consultations",
      title: "Follow-up Consultations",
      deliveryType: "In-House / Scheduled Review",
      shortDesc: "Dedicated review of previous ECG and diagnostic reports, ongoing care discussions, and plan adjustments.",
      purpose: "Ensure continuity of care by reviewing completed test findings and answering patient questions clearly.",
      preparation: "Ensure any externally completed laboratory reports are brought along or uploaded prior to review.",
      image: "https://images.pexels.com/photos/8460231/pexels-photo-8460231.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Cardiologist reviewing ECG and diagnostic reports with a returning patient"
    }
  ],

  doctors: [
    {
      id: "doc-1",
      name: "Dr. Arthur Vance (Demo)",
      roleTitle: "Senior Consultant Cardiologist",
      qualification: "MD, FACC (Demo Credential)",
      specialization: "General & Preventive Cardiology",
      experience: "18+ Years (Demo)",
      languages: ["English", "French"],
      availability: "Mon, Wed, Fri · 09:00 AM – 03:00 PM (Demo)",
      bio: "Focused on comprehensive adult heart health evaluations, hypertension management, and clear patient communication.",
      interests: ["Adult Clinical Cardiology", "Hypertension Care", "Long-Term Follow-up Planning"],
      slots: ["Mon 09:30 AM (Demo)", "Wed 11:00 AM (Demo)", "Fri 02:15 PM (Demo)"],
      photo: "https://images.pexels.com/photos/12506554/pexels-photo-12506554.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Portrait of Senior Consultant Cardiologist in white medical coat with stethoscope"
    },
    {
      id: "doc-2",
      name: "Dr. Elena Rostova (Demo)",
      roleTitle: "Interventional Cardiologist",
      qualification: "MD, FSCAI (Demo Credential)",
      specialization: "Coronary Care & Risk Assessment",
      experience: "14+ Years (Demo)",
      languages: ["English", "Spanish"],
      availability: "Tue, Thu · 10:00 AM – 04:30 PM (Demo)",
      bio: "Provides thorough pre-procedure consultations, coronary risk evaluations, and coordinated post-care clinical follow-up.",
      interests: ["Coronary Risk Evaluation", "Chest Pain Assessment", "Secondary Prevention"],
      slots: ["Tue 10:15 AM (Demo)", "Tue 02:00 PM (Demo)", "Thu 11:30 AM (Demo)"],
      photo: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Portrait of Interventional Cardiologist smiling in crisp white coat"
    },
    {
      id: "doc-3",
      name: "Dr. Arjun Mehta (Demo)",
      roleTitle: "Clinical Cardiologist",
      qualification: "MD, DM Cardiology (Demo Credential)",
      specialization: "Heart Rhythm & ECG Consultation",
      experience: "11+ Years (Demo)",
      languages: ["English", "Hindi"],
      availability: "Mon, Tue, Thu · 09:00 AM – 04:00 PM (Demo)",
      bio: "Dedicated to calm, methodical evaluation of palpitations, ECG findings, and longitudinal clinical care.",
      interests: ["12-Lead ECG Review", "Palpitation Evaluation", "Patient Heart Education"],
      slots: ["Mon 10:30 AM (Demo)", "Tue 03:30 PM (Demo)", "Thu 09:15 AM (Demo)"],
      photo: "https://images.pexels.com/photos/19363028/pexels-photo-19363028.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Portrait of Clinical Cardiologist wearing a white coat and stethoscope"
    },
    {
      id: "doc-4",
      name: "Dr. Nadia Al-Mansoor (Demo)",
      roleTitle: "Cardiac Diagnostic Specialist",
      qualification: "MD, FASE (Demo Credential)",
      specialization: "Echocardiography & Stress Diagnostics",
      experience: "12+ Years (Demo)",
      languages: ["English", "Arabic"],
      availability: "Wed, Fri, Sat · 09:30 AM – 02:30 PM (Demo)",
      bio: "Specializes in non-invasive cardiac ultrasound imaging, valve assessment, and supervised stress testing coordination.",
      interests: ["Transthoracic Echocardiography", "Valvular Assessment", "Stress Echo Coordination"],
      slots: ["Wed 10:00 AM (Demo)", "Fri 11:45 AM (Demo)", "Sat 10:30 AM (Demo)"],
      photo: "https://images.pexels.com/photos/7578811/pexels-photo-7578811.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Portrait of Cardiac Diagnostic Specialist in white clinical coat"
    },
    {
      id: "doc-5",
      name: "Dr. Marcus Sterling (Demo)",
      roleTitle: "Preventive Cardiology Consultant",
      qualification: "MD, MPH (Demo Credential)",
      specialization: "Preventive Heart Health & Lipids",
      experience: "10+ Years (Demo)",
      languages: ["English"],
      availability: "Tue, Wed, Sat · 01:00 PM – 06:00 PM (Demo)",
      bio: "Partners with patients on cholesterol literacy, blood pressure habits, and sustainable cardiovascular wellness plans.",
      interests: ["Lipid & Metabolic Health", "Preventive Screening", "Lifestyle Heart Coaching"],
      slots: ["Tue 01:30 PM (Demo)", "Wed 04:00 PM (Demo)", "Sat 02:00 PM (Demo)"],
      photo: "https://images.pexels.com/photos/30588665/pexels-photo-30588665.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Portrait of Preventive Cardiology Consultant wearing white coat"
    }
  ],

  educationArticles: [
    {
      id: "edu-bp",
      title: "Understanding Blood Pressure",
      icon: "activity",
      summary: "Learn what systolic and diastolic numbers represent and why consistent, calm measurement technique matters.",
      body: "Blood pressure measures the force of blood pushing against artery walls as the heart pumps (systolic, top number) and rests between beats (diastolic, bottom number). Because readings naturally fluctuate with activity, stress, and caffeine, clinicians look at patterns over multiple visits or validated home logs rather than a single reading. Always discuss your personal target range with your physician."
    },
    {
      id: "edu-cholesterol",
      title: "Cholesterol and Heart Health",
      icon: "droplets",
      summary: "Understand HDL, LDL, and triglycerides in plain language and how nutrition and checkups support healthy arteries.",
      body: "Cholesterol is a waxy substance the body uses to build cells, carried in the blood by lipoproteins. Elevated LDL ('low-density lipoprotein') over time can contribute to arterial plaque buildup, while HDL helps transport excess cholesterol back to the liver. A fasting or non-fasting lipid panel interpreted alongside your overall risk profile helps your cardiologist guide dietary and medical choices."
    },
    {
      id: "edu-lifestyle",
      title: "Heart-Healthy Lifestyle",
      icon: "heart-handshake",
      summary: "Practical daily habits—regular walking, balanced fiber-rich meals, restorative sleep, and stress pacing.",
      body: "Consistent daily movement, such as brisk walking, supports vascular flexibility and energy. Diets centered on vegetables, fruits, whole grains, legumes, lean proteins, and unsaturated fats help maintain healthy blood pressure and lipids. Avoiding tobacco exposure, moderating sodium, and prioritizing 7–8 hours of sleep each night reinforce long-term cardiovascular resilience."
    },
    {
      id: "edu-warning",
      title: "Recognizing Heart Attack Warning Signs",
      icon: "shield-alert",
      summary: "Know urgent warning symptoms—chest pressure, radiating discomfort, sudden shortness of breath—and act immediately.",
      body: "Possible warning signs of a heart attack include uncomfortable pressure, squeezing, or fullness in the center of the chest; discomfort spreading to one or both arms, the back, neck, jaw, or stomach; sudden shortness of breath; cold sweat; nausea; or lightheadedness. Symptoms can vary between individuals. If you or someone nearby experiences these signs, call local emergency medical services immediately—never wait for a clinic appointment."
    },
    {
      id: "edu-checkups",
      title: "Importance of Regular Heart Checkups",
      icon: "calendar-check",
      summary: "Routine blood pressure, cholesterol, and age-appropriate reviews help identify silent risks before symptoms appear.",
      body: "Many cardiovascular risk factors—including elevated blood pressure and high cholesterol—rarely cause noticeable symptoms early on. Periodic preventive consultations allow you and your doctor to review vital trends, family history, and lifestyle goals calmly, making adjustments early when interventions are simplest."
    },
    {
      id: "edu-risk",
      title: "Managing Cardiovascular Risk Factors",
      icon: "clipboard-check",
      summary: "How blood sugar, blood pressure, family history, and stress interact—and how structured follow-up helps.",
      body: "Cardiovascular risk is shaped by multiple factors working together, including age, family history, blood pressure, cholesterol, blood glucose, smoking status, and physical activity. Working with a cardiology specialist helps prioritize which factors matter most for you and builds a realistic, step-by-step follow-up plan."
    }
  ],

  facilities: [
    {
      title: "Consultation Rooms",
      desc: "Quiet, private rooms designed for unhurried conversations with your cardiologist.",
      image: "https://images.pexels.com/photos/6129035/pexels-photo-6129035.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Sample illustration of private cardiology consultation room"
    },
    {
      title: "ECG Testing Room",
      desc: "Dedicated resting 12-lead ECG bay focused on patient comfort and privacy.",
      image: "https://images.pexels.com/photos/8460227/pexels-photo-8460227.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Sample illustration of ECG testing room and rhythm printout"
    },
    {
      title: "Diagnostic Equipment",
      desc: "Modern ultrasound and cardiac monitoring workstations maintained for clinical clarity.",
      image: "https://images.pexels.com/photos/7108402/pexels-photo-7108402.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Sample illustration of cardiac diagnostic ultrasound equipment"
    },
    {
      title: "Patient Waiting Area",
      desc: "Calm, well-lit lounge seating arranged for comfortable check-in and accessibility.",
      image: "https://images.pexels.com/photos/6129107/pexels-photo-6129107.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Sample illustration of clean modern clinic waiting area"
    },
    {
      title: "Reception",
      desc: "Welcoming front desk team supporting appointment check-in and report inquiries.",
      image: "https://images.pexels.com/photos/33812025/pexels-photo-33812025.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Sample illustration of modern medical clinic reception desk"
    },
    {
      title: "Clinical Examination Area",
      desc: "Organized assessment suites equipped for blood pressure and clinical follow-ups.",
      image: "https://images.pexels.com/photos/32830266/pexels-photo-32830266.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Sample illustration of clinical examination suite"
    }
  ],

  testimonials: [
    {
      quote: "The consultation felt unhurried and clear. Every step of my ECG appointment was explained calmly before the test began.",
      author: "Sample Patient A. (Demo Testimonial)",
      visitType: "Preventive Consultation (Demo)"
    },
    {
      quote: "Having my follow-up appointment schedule and sample portal reminders organized in one calm interface makes staying consistent effortless.",
      author: "Sample Patient M. (Demo Testimonial)",
      visitType: "Follow-up Visit (Demo)"
    },
    {
      quote: "From reception check-in to reviewing my echocardiography overview with the specialist, the atmosphere felt reassuring and respectful.",
      author: "Sample Patient R. (Demo Testimonial)",
      visitType: "Diagnostic Consultation (Demo)"
    },
    {
      quote: "I appreciated how clearly the doctor explained blood pressure trends in everyday language without rushing through questions.",
      author: "Sample Patient S. (Demo Testimonial)",
      visitType: "Blood Pressure Review (Demo)"
    }
  ],

  faqs: [
    {
      q: "What should I bring to my cardiology consultation?",
      a: "Please bring a photo ID, a complete list of any current medications or supplements (with dosages), recent blood test or ECG printouts if available, and any written questions you would like to discuss."
    },
    {
      q: "How do I book an ECG appointment?",
      a: "You can submit a consultation or ECG booking request using the Book Appointment button on our website or inside the Patient Portal. In this frontend demo, bookings simulate confirmation immediately; in a live clinic, reception confirms your exact slot."
    },
    {
      q: "Do I need an appointment before visiting?",
      a: "Yes, scheduling ahead ensures dedicated time with the appropriate specialist and minimizes waiting. Note: for sudden chest pain, severe breathlessness, or urgent symptoms, contact local emergency services rather than booking a clinic visit."
    },
    {
      q: "How can I access my test reports?",
      a: "Registered patients can view available demonstration ECG and diagnostic reports inside the Patient Dashboard under ECG Reports and Test Reports. Real clinical reports are always finalized and reviewed with a qualified cardiologist."
    },
    {
      q: "How do I schedule a follow-up consultation?",
      a: "In the Patient Dashboard, open the Appointments module, choose 'Follow-up Consultation', select your cardiologist and preferred date/time, and confirm your request."
    }
  ],

  /* Seeded Demo Patient & Portal Data */
  demoPatient: {
    patientId: "CC-DEMO-2048",
    fullName: "Jordan Mercer (Demo Patient)",
    initials: "JM",
    dob: "1979-05-14",
    gender: "Prefer not to specify",
    phone: "+1 (555) 019-4421",
    email: "patient.demo@cardiocare.example",
    address: "742 Maple Crest Lane, Apt 4B (Demo)",
    city: "Brookside",
    emergencyContactName: "Taylor Mercer (Demo Contact)",
    emergencyContactPhone: "+1 (555) 019-8830",
    lastConsultation: "2026-10-18 · Dr. Arthur Vance (Demo)"
  },

  demoAppointments: [
    {
      id: "APT-DEMO-101",
      doctorId: "doc-1",
      doctorName: "Dr. Arthur Vance (Demo)",
      specialization: "General & Preventive Cardiology",
      type: "Follow-up Consultation",
      date: "2026-11-18",
      time: "10:15 AM",
      reason: "Routine follow-up & blood pressure log review (Sample)",
      contact: "+1 (555) 019-4421",
      status: "Confirmed (demo)"
    },
    {
      id: "APT-DEMO-102",
      doctorId: "doc-4",
      doctorName: "Dr. Nadia Al-Mansoor (Demo)",
      specialization: "Echocardiography & Stress Diagnostics",
      type: "Echocardiography",
      date: "2026-11-25",
      time: "11:30 AM",
      reason: "Scheduled ultrasound assessment (Sample)",
      contact: "+1 (555) 019-4421",
      status: "Pending (demo)"
    },
    {
      id: "APT-DEMO-094",
      doctorId: "doc-3",
      doctorName: "Dr. Arjun Mehta (Demo)",
      specialization: "Heart Rhythm & ECG Consultation",
      type: "ECG Testing",
      date: "2026-10-18",
      time: "09:00 AM",
      reason: "Annual preventive ECG visit (Sample)",
      contact: "+1 (555) 019-4421",
      status: "Completed (demo)"
    }
  ],

  demoEcgReports: [
    {
      id: "ECG-DEMO-301",
      name: "Resting 12-Lead ECG Visit Record (Sample Demo)",
      date: "2026-10-18",
      doctor: "Dr. Arjun Mehta (Demo)",
      status: "Sample Preview Available (Demo)",
      summaryNote: "Sample demonstration document only. No real ECG waveform or automated interpretation is generated. Review genuine clinical ECGs directly with your cardiologist."
    },
    {
      id: "ECG-DEMO-244",
      name: "Baseline Preventive ECG Attachment (Sample Demo)",
      date: "2026-04-09",
      doctor: "Dr. Arthur Vance (Demo)",
      status: "Sample Preview Available (Demo)",
      summaryNote: "Sample demonstration record for interface preview. Always consult a qualified physician for genuine test evaluation."
    }
  ],

  demoTestReports: [
    {
      id: "TST-DEMO-501",
      name: "Transthoracic Echocardiogram Summary (Sample)",
      category: "Echocardiography",
      date: "2026-10-20",
      doctor: "Dr. Nadia Al-Mansoor (Demo)",
      status: "Sample Available (Demo)",
      note: "Sample demonstration placeholder. Actual ultrasound findings are explained directly by your cardiologist."
    },
    {
      id: "TST-DEMO-502",
      name: "Standard Lipid Panel Template (Sample)",
      category: "Lipid Profile",
      date: "2026-10-15",
      doctor: "Dr. Marcus Sterling (Demo)",
      status: "Sample Available (Demo)",
      note: "Sample demonstration placeholder. No fabricated cholesterol measurements are displayed."
    },
    {
      id: "TST-DEMO-503",
      name: "Fasting Blood Glucose Template (Sample)",
      category: "Blood Glucose",
      date: "2026-10-15",
      doctor: "Dr. Marcus Sterling (Demo)",
      status: "Sample Available (Demo)",
      note: "Sample demonstration placeholder for portal preview only."
    },
    {
      id: "TST-DEMO-504",
      name: "Complete Blood Count Template (Sample)",
      category: "Complete Blood Count",
      date: "2026-09-28",
      doctor: "Dr. Arthur Vance (Demo)",
      status: "Sample Available (Demo)",
      note: "Sample demonstration placeholder. Not a real laboratory report."
    },
    {
      id: "TST-DEMO-505",
      name: "Supervised Stress Test Visit Note (Sample)",
      category: "Cardiac Stress Test",
      date: "2026-08-12",
      doctor: "Dr. Elena Rostova (Demo)",
      status: "Reviewed (Demo)",
      note: "Sample demonstration placeholder for interface verification."
    },
    {
      id: "TST-DEMO-506",
      name: "Home Blood Pressure Log Attachment (Sample)",
      category: "Other Diagnostic Reports",
      date: "2026-11-01",
      doctor: "Dr. Arthur Vance (Demo)",
      status: "Uploaded (Demo)",
      note: "Sample demonstration attachment slot."
    }
  ],

  demoMedications: [
    {
      id: "MED-DEMO-1",
      name: "Sample Morning Prescription Placeholder A",
      dosage: "As prescribed by your physician (Demo)",
      time: "08:00",
      frequency: "Once daily",
      startDate: "2026-10-01",
      endDate: "2026-12-31",
      notes: "Self-entered demonstration reminder example. Follow only your clinician's written instructions.",
      status: "Active (Demo)"
    },
    {
      id: "MED-DEMO-2",
      name: "Sample Evening Supplement Placeholder B",
      dosage: "Per clinic care plan (Demo)",
      time: "20:00",
      frequency: "Once daily",
      startDate: "2026-10-15",
      endDate: "2026-12-31",
      notes: "Browser reminder demonstration only; does not trigger when the browser is closed.",
      status: "Active (Demo)"
    }
  ],

  demoMedicalHistory: {
    consultations: [
      { date: "2026-10-18", title: "Preventive Cardiology Review (Sample Demo)", clinician: "Dr. Arthur Vance (Demo)", note: "Sample consultation entry illustrating visit continuity." },
      { date: "2026-04-09", title: "Initial Heart Wellness Intake (Sample Demo)", clinician: "Dr. Arjun Mehta (Demo)", note: "Baseline intake note (demonstration only)." }
    ],
    tests: [
      { date: "2026-10-20", title: "Echocardiography Visit (Sample Demo)", clinician: "Dr. Nadia Al-Mansoor (Demo)", note: "Sample diagnostic history record." },
      { date: "2026-10-18", title: "Resting 12-Lead ECG (Sample Demo)", clinician: "Dr. Arjun Mehta (Demo)", note: "Sample diagnostic history record." }
    ],
    allergies: [
      { item: "No known drug allergies recorded in demo profile (Sample)", note: "Always verify allergy records directly with your clinic team." }
    ],
    conditions: [
      { item: "Routine Preventive Monitoring (Sample Demo Entry)", note: "Demonstration placeholder — no inferred diagnosis." }
    ],
    notes: [
      { date: "2026-10-18", text: "Patient-entered note (Sample): Bring home blood pressure cuff log to next consultation." }
    ],
    familyHistory: [
      { relation: "Optional Sample Entry", detail: "Provided voluntarily by patient during intake (Demo placeholder)." }
    ]
  },

  demoNotifications: [
    {
      id: "NTF-1",
      category: "Appointment Confirmation",
      title: "Upcoming Demo Appointment Confirmed",
      message: "Your sample follow-up consultation with Dr. Arthur Vance (Demo) is listed for 2026-11-18 at 10:15 AM.",
      time: "2 hours ago",
      read: false
    },
    {
      id: "NTF-2",
      category: "Report Availability",
      title: "Sample ECG Preview Ready",
      message: "A sample demonstration ECG preview (ECG-DEMO-301) is available in the ECG Reports module.",
      time: "Yesterday",
      read: false
    },
    {
      id: "NTF-3",
      category: "Medication Reminder Alert",
      title: "Browser Reminder Notice (Demo)",
      message: "Remember to confirm your scheduled demo reminder while this portal is open.",
      time: "2 days ago",
      read: true
    },
    {
      id: "NTF-4",
      category: "Clinic Announcement",
      title: "Saturday Preventive Clinic Hours (Demo)",
      message: "CardioCare offers scheduled Saturday morning consultations from 9:00 AM to 2:30 PM.",
      time: "4 days ago",
      read: true
    }
  ],

  /* Bilingual UI Dictionary for RTL (Arabic) & LTR (English) Toggle */
  i18n: {
    en: {
      nav_home: "Home",
      nav_services: "Services",
      nav_doctors: "Doctors",
      nav_about: "About Us",
      nav_contact: "Contact",
      nav_dashboard: "Dashboard",
      nav_login: "Patient Login",
      nav_book: "Book Appointment",
      hero_eyebrow: "Clinical Cardiology & Preventive Care",
      hero_title: "Expert Heart Care. Healthier Tomorrows.",
      hero_desc: "Comprehensive heart care with experienced specialists, modern diagnostic services and patient-focused consultation.",
      home2_hero_title: "Your Heart Care Clinic. Healthier Tomorrows.",
      home2_hero_desc: "A calm, patient-centered heart care clinic bringing together welcoming outpatient consultations, diagnostic suites, and preventive wellness support.",
      hero_cta_book: "Book a Consultation",
      hero_cta_services: "Explore Our Services",
      welcome_title: "Care That Puts Your Heart First.",
      services_title: "Our Cardiac Services",
      doctors_title: "Meet Our Heart Specialists",
      why_title: "Why Choose CardioCare?",
      edu_title: "Understand Your Heart. Take Better Care of It.",
      facilities_title: "Our Facilities",
      journey_title: "Your Patient Journey",
      testimonials_title: "Patient Experiences (Demo)",
      cta_title: "Make Your Heart Health a Priority.",
      cta_desc: "Schedule a consultation and take the next step toward informed heart care.",
      dash_overview: "Overview",
      dash_appointments: "Appointments",
      dash_ecg: "ECG Reports",
      dash_tests: "Test Reports",
      dash_meds: "Medication Reminders",
      dash_history: "Medical History",
      dash_profile: "My Profile",
      dash_notifications: "Notifications",
      dash_logout: "Logout"
    },
    ar: {
      nav_home: "الرئيسية",
      nav_services: "الخدمات",
      nav_doctors: "الأطباء",
      nav_about: "من نحن",
      nav_contact: "اتصل بنا",
      nav_dashboard: "لوحة التحكم",
      nav_login: "دخول المريض",
      nav_book: "احجز موعداً",
      hero_eyebrow: "رعاية القلب السريرية والوقائية",
      hero_title: "رعاية قلب متخصصة. لغدٍ أكثر صحة.",
      hero_desc: "رعاية شاملة للقلب مع أطباء متخصصين وخدمات تشخيصية حديثة واستشارات تركز على المريض.",
      home2_hero_title: "عيادة رعاية القلب الخاصة بك. لغدٍ أكثر صحة.",
      home2_hero_desc: "عيادة هادئة لرعاية القلب تركز على المريض وتجمع بين الاستشارات الخارجية المريحة وأجنحة التشخيص ودعم العافية الوقائية.",
      hero_cta_book: "احجز استشارة",
      hero_cta_services: "استكشف خدماتنا",
      welcome_title: "رعاية تضع صحة قلبك أولاً.",
      services_title: "خدماتنا القلبية",
      doctors_title: "تعرّف على أخصائيي القلب",
      why_title: "لماذا تختار كارديو كير؟",
      edu_title: "افهم صحة قلبك واعتنِ به بشكل أفضل.",
      facilities_title: "مرافق العيادة",
      journey_title: "رحلة المريض",
      testimonials_title: "آراء المرضى (عرض تجريبي)",
      cta_title: "اجعل صحة قلبك أولوية.",
      cta_desc: "حدّد موعداً للاستشارة واتخذ الخطوة التالية نحو رعاية قلبية واعية.",
      dash_overview: "نظرة عامة",
      dash_appointments: "المواعيد",
      dash_ecg: "تقارير تخطيط القلب",
      dash_tests: "التقارير المخبرية",
      dash_meds: "تذكيرات الأدوية",
      dash_history: "السجل الطبي",
      dash_profile: "ملفي الشخصي",
      dash_notifications: "الإشعارات",
      dash_logout: "تسجيل الخروج"
    }
  }
};


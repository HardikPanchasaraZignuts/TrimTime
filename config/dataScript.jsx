import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig"; // adjust the path to your firebase config

const providers = [
  {
    name: "Anjali Mehta",
    specialization: "Hair Stylist",
    rating: 4.7,
    profileImage: "https://i.pravatar.cc/150?img=10",
    gallery: [
      "https://source.unsplash.com/800x600/?salon,hair",
      "https://source.unsplash.com/800x600/?haircut",
    ],
    description:
      "Experienced hair stylist with a flair for bridal and party styles.",
    location: { address: "Mumbai", latitude: 19.076, longitude: 72.8777 },
    availableSlots: ["09:00", "10:30", "12:00", "14:00", "16:30"],
  },
  {
    name: "Ravi Shah",
    specialization: "Massage Therapist",
    rating: 4.6,
    profileImage: "https://i.pravatar.cc/150?img=11",
    gallery: [
      "https://source.unsplash.com/800x600/?massage,spa",
      "https://source.unsplash.com/800x600/?relax",
    ],
    description:
      "Certified massage therapist with 5 years of experience in relaxation therapies.",
    location: { address: "Navi Mumbai", latitude: 19.033, longitude: 73.0297 },
    availableSlots: ["10:00", "11:30", "13:00", "15:00"],
  },
  {
    name: "Meena Patel",
    specialization: "Beautician",
    rating: 4.9,
    profileImage: "https://i.pravatar.cc/150?img=12",
    gallery: [
      "https://source.unsplash.com/800x600/?makeup,beauty",
      "https://source.unsplash.com/800x600/?skincare",
    ],
    description:
      "Beautician offering skincare and makeup services with organic products.",
    location: { address: "Thane", latitude: 19.2183, longitude: 72.9781 },
    availableSlots: ["11:00", "12:30", "14:00", "16:00"],
  },
  {
    name: "Sneha Joshi",
    specialization: "Nail Artist",
    rating: 4.8,
    profileImage: "https://i.pravatar.cc/150?img=13",
    gallery: [
      "https://source.unsplash.com/800x600/?nails,nailart",
      "https://source.unsplash.com/800x600/?manicure",
    ],
    description:
      "Trendy nail art and manicure expert. Specialized in gel and acrylic nails.",
    location: {
      address: "Andheri, Mumbai",
      latitude: 19.1197,
      longitude: 72.8468,
    },
    availableSlots: ["09:00", "11:00", "13:00", "15:30"],
  },
  {
    name: "Pooja Sharma",
    specialization: "Hair Color Specialist",
    rating: 4.5,
    profileImage: "https://i.pravatar.cc/150?img=14",
    gallery: [
      "https://source.unsplash.com/800x600/?haircolor",
      "https://source.unsplash.com/800x600/?salon,coloring",
    ],
    description:
      "Color transformation expert with latest balayage and ombré trends.",
    location: {
      address: "Borivali, Mumbai",
      latitude: 19.229,
      longitude: 72.8567,
    },
    availableSlots: ["10:00", "12:00", "14:30", "17:00"],
  },
  {
    name: "Kiran Verma",
    specialization: "Threading & Waxing",
    rating: 4.4,
    profileImage: "https://i.pravatar.cc/150?img=15",
    gallery: [
      "https://source.unsplash.com/800x600/?waxing",
      "https://source.unsplash.com/800x600/?threading",
    ],
    description:
      "Quick and painless threading and waxing services using herbal products.",
    location: {
      address: "Goregaon, Mumbai",
      latitude: 19.1551,
      longitude: 72.8499,
    },
    availableSlots: ["09:30", "11:00", "13:30", "16:00"],
  },
  {
    name: "Ayesha Khan",
    specialization: "Facial & Skin Care",
    rating: 4.7,
    profileImage: "https://i.pravatar.cc/150?img=16",
    gallery: [
      "https://source.unsplash.com/800x600/?facial,skin",
      "https://source.unsplash.com/800x600/?spa",
    ],
    description: "Hydra facial expert with ayurvedic glow treatments.",
    location: {
      address: "Vile Parle, Mumbai",
      latitude: 19.096,
      longitude: 72.8514,
    },
    availableSlots: ["10:00", "11:30", "13:00", "15:00"],
  },
  {
    name: "Neha Rathore",
    specialization: "Bridal Makeup Artist",
    rating: 5.0,
    profileImage: "https://i.pravatar.cc/150?img=17",
    gallery: [
      "https://source.unsplash.com/800x600/?bridalmakeup",
      "https://source.unsplash.com/800x600/?makeup",
    ],
    description: "High-end bridal and engagement makeup with premium products.",
    location: {
      address: "Malad, Mumbai",
      latitude: 19.186,
      longitude: 72.8489,
    },
    availableSlots: ["09:00", "11:00", "14:00", "17:00"],
  },
  {
    name: "Sonali Desai",
    specialization: "Hair Spa Expert",
    rating: 4.3,
    profileImage: "https://i.pravatar.cc/150?img=18",
    gallery: [
      "https://source.unsplash.com/800x600/?hairspa",
      "https://source.unsplash.com/800x600/?headmassage",
    ],
    description: "Relaxing hair spa services for frizz-free, silky hair.",
    location: {
      address: "Dadar, Mumbai",
      latitude: 19.0176,
      longitude: 72.8562,
    },
    availableSlots: ["10:30", "12:30", "15:00", "17:30"],
  },
  {
    name: "Divya Jain",
    specialization: "Eyebrow & Eyelash Stylist",
    rating: 4.6,
    profileImage: "https://i.pravatar.cc/150?img=19",
    gallery: [
      "https://source.unsplash.com/800x600/?eyelash",
      "https://source.unsplash.com/800x600/?eyebrows",
    ],
    description: "Expert in lash lifts, tints and brow sculpting.",
    location: {
      address: "Kandivali, Mumbai",
      latitude: 19.205,
      longitude: 72.8509,
    },
    availableSlots: ["11:00", "12:30", "14:30", "16:30"],
  },
  {
    name: "Jaya Kulkarni",
    specialization: "Henna Artist",
    rating: 4.8,
    profileImage: "https://i.pravatar.cc/150?img=20",
    gallery: [
      "https://source.unsplash.com/800x600/?mehndi",
      "https://source.unsplash.com/800x600/?henna",
    ],
    description: "Creative mehndi designs for weddings and festivals.",
    location: {
      address: "Powai, Mumbai",
      latitude: 19.118,
      longitude: 72.9059,
    },
    availableSlots: ["10:00", "12:00", "14:00", "16:00"],
  },
  {
    name: "Aarti Singh",
    specialization: "Body Polish & Scrub",
    rating: 4.5,
    profileImage: "https://i.pravatar.cc/150?img=21",
    gallery: [
      "https://source.unsplash.com/800x600/?bodycare",
      "https://source.unsplash.com/800x600/?scrub",
    ],
    description: "Glowing skin with fruit scrubs and exfoliation therapies.",
    location: {
      address: "Bandra, Mumbai",
      latitude: 19.06,
      longitude: 72.8362,
    },
    availableSlots: ["10:00", "11:30", "13:00", "15:30"],
  },
  {
    name: "Rajesh Thakur",
    specialization: "Male Grooming Expert",
    rating: 4.4,
    profileImage: "https://i.pravatar.cc/150?img=22",
    gallery: [
      "https://source.unsplash.com/800x600/?men,haircut",
      "https://source.unsplash.com/800x600/?barbershop",
    ],
    description: "Men’s haircut, beard styling, and grooming packages.",
    location: {
      address: "Kurla, Mumbai",
      latitude: 19.072,
      longitude: 72.8821,
    },
    availableSlots: ["09:00", "10:30", "13:00", "15:00"],
  },
  {
    name: "Nikita Rao",
    specialization: "Tattoo Artist",
    rating: 4.9,
    profileImage: "https://i.pravatar.cc/150?img=23",
    gallery: [
      "https://source.unsplash.com/800x600/?tattoo,artist",
      "https://source.unsplash.com/800x600/?ink",
    ],
    description: "Custom tattoos with fine detailing and hygiene guaranteed.",
    location: {
      address: "Versova, Mumbai",
      latitude: 19.1406,
      longitude: 72.8052,
    },
    availableSlots: ["11:00", "13:00", "15:00", "17:00"],
  },
  {
    name: "Tanvi Pillai",
    specialization: "Spa & Wellness",
    rating: 4.6,
    profileImage: "https://i.pravatar.cc/150?img=24",
    gallery: [
      "https://source.unsplash.com/800x600/?spa,wellness",
      "https://source.unsplash.com/800x600/?relaxing",
    ],
    description: "Luxury spa services with aroma and steam therapies.",
    location: {
      address: "Colaba, Mumbai",
      latitude: 18.9218,
      longitude: 72.8343,
    },
    availableSlots: ["09:30", "11:00", "13:00", "15:30"],
  },
];

export const seedSalonProviders = async () => {
  try {
    const ref = collection(db, "providers");
    for (const p of providers) {
      await addDoc(ref, p);
    }
    console.log("✅ 15 providers added successfully");
  } catch (error) {
    console.error("❌ Error adding providers:", error);
  }
};

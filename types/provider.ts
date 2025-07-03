export type ProviderItem = {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  profileImage: string;
  gallery: string[]; // Array of image URLs
  description: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  availableSlots: string[]; // Time strings in "HH:mm" 24-hour format
};

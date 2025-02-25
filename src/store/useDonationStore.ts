import { create } from "zustand";

// Define the Donation Type
type Donation = {
  id: number;
  title: string;
  desc: string;
  startDate: Date,
  totalAmount: number;
};

// Define Zustand Store Type
type DonationStore = {
  donations: Donation[];
  isDonationsLoading: boolean;
  fetchDonations: () => Promise<void>;
};

// Zustand Store
export const useDonationStore = create<DonationStore>((set) => ({
  donations: [],
  isDonationsLoading: false,

  // Fetch Donations from API
  fetchDonations: async () => {
    set({ isDonationsLoading: true });
    try {
      const res = await fetch("/api/donations"); // API route
      if (!res.ok) throw new Error("Failed to fetch donations");
      const data: Donation[] = await res.json();
      set({ donations: data, isDonationsLoading: false });
    } catch (error) {
        console.error("Failed to fetch donations", error);
    }
  },
}));

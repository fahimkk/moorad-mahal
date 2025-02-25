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
  error: string | null;
  fetchDonations: () => Promise<void>;
};

// Zustand Store
export const useDonationStore = create<DonationStore>((set) => ({
  donations: [],
  isDonationsLoading: false,
  error: null,

  // Fetch Donations from API
  fetchDonations: async () => {
    set({ isDonationsLoading: true, error: null });
    try {
      const res = await fetch("/api/donations"); // API route
      if (!res.ok) throw new Error("Failed to fetch donations");
      const data: Donation[] = await res.json();
      set({ donations: data, isDonationsLoading: false });
    } catch (error: any) {
      set({ error: error.message, isDonationsLoading: false });
    }
  },
}));

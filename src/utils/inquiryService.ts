import { createClient } from "@/utils/supabase/client";

export interface CustomerInquiry {
  id?: string;
  name: string;
  phone?: string;
  email?: string;
  subject?: string;
  message: string;
  product_name?: string;
  source?: "contact_form" | "product_page" | "cart_checkout" | "whatsapp_click";
  status?: "new" | "contacted" | "resolved";
  created_at?: string;
}

const STORAGE_KEY = "marudhar_customer_inquiries";
export const OWNER_PHONE = "917877609451";
export const OWNER_PHONE_DISPLAY = "+91 7877609451";

// Helper to construct WhatsApp direct URL
export function buildWhatsAppLink(messageText: string): string {
  return `https://api.whatsapp.com/send?phone=${OWNER_PHONE}&text=${encodeURIComponent(messageText)}`;
}

// Save inquiry to Supabase + Local storage fallback
export async function saveInquiry(inquiry: CustomerInquiry): Promise<{ success: boolean; data: CustomerInquiry }> {
  const item: CustomerInquiry = {
    id: inquiry.id || `inq-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    name: inquiry.name,
    phone: inquiry.phone || "",
    email: inquiry.email || "",
    subject: inquiry.subject || "General Inquiry",
    message: inquiry.message,
    product_name: inquiry.product_name || "",
    source: inquiry.source || "contact_form",
    status: "new",
    created_at: new Date().toISOString(),
  };

  // 1. Save to LocalStorage as instant safe backup
  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      localStorage.setItem(STORAGE_KEY, JSON.stringify([item, ...existing]));
    } catch (e) {
      console.warn("Local storage save error:", e);
    }
  }

  // 2. Save to Supabase
  try {
    const supabase = createClient();
    const { error } = await supabase.from("inquiries").insert([
      {
        name: item.name,
        phone: item.phone,
        email: item.email,
        subject: item.subject,
        message: item.message,
        product_name: item.product_name,
        source: item.source,
        status: item.status,
      },
    ]);
    if (error) {
      console.warn("Supabase insert notice (inquiries):", error.message);
    }
  } catch (err) {
    console.warn("Supabase inquiry error:", err);
  }

  return { success: true, data: item };
}

// Fetch inquiries for Admin dashboard
export async function getAllInquiries(): Promise<CustomerInquiry[]> {
  let dbItems: CustomerInquiry[] = [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      dbItems = data;
    }
  } catch (err) {
    console.warn("Could not fetch remote inquiries:", err);
  }

  let localItems: CustomerInquiry[] = [];
  if (typeof window !== "undefined") {
    try {
      localItems = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) {
      console.warn("Could not parse local inquiries:", e);
    }
  }

  // Merge unique by id or timestamp/message
  const combined = [...dbItems, ...localItems];
  const uniqueMap = new Map<string, CustomerInquiry>();
  
  combined.forEach((item) => {
    const key = item.id || `${item.name}-${item.created_at}`;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, item);
    }
  });

  return Array.from(uniqueMap.values()).sort((a, b) => {
    const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return timeB - timeA;
  });
}

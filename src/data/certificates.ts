import type { Certificate } from "@/lib/types";

/**
 * Seed certificates for the /verify-certificate tool.
 * In production these rows live in Supabase (see supabase/schema.sql) and a
 * unique code + QR is generated per dispatched unit. The codes below exist so
 * the tool is demonstrable end-to-end today.
 */
export const certificates: Certificate[] = [
  {
    id: "c001",
    certificate_code: "NRV-2026-00001",
    product_id: "p01",
    order_item_id: null,
    lab_name: "Rudra Gem Testing Laboratory, Jaipur",
    issue_date: "2026-07-14",
    pdf_url: null,
    qr_code_url: null,
  },
  {
    id: "c002",
    certificate_code: "NRV-2026-00042",
    product_id: "p02",
    order_item_id: null,
    lab_name: "Rudra Gem Testing Laboratory, Jaipur",
    issue_date: "2026-08-02",
    pdf_url: null,
    qr_code_url: null,
  },
  {
    id: "c003",
    certificate_code: "NRV-2026-00107",
    product_id: "p06",
    order_item_id: null,
    lab_name: "IGL Gem Lab, Delhi",
    issue_date: "2026-08-21",
    pdf_url: null,
    qr_code_url: null,
  },
  {
    id: "c004",
    certificate_code: "NRV-2026-00113",
    product_id: "p09",
    order_item_id: null,
    lab_name: "IGL Gem Lab, Delhi",
    issue_date: "2026-08-25",
    pdf_url: null,
    qr_code_url: null,
  },
];

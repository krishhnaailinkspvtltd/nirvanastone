import "server-only";
import { cache } from "react";
import { certificates as seedCertificates } from "@/data/certificates";
import type { Certificate } from "./types";
import { getKV, setKV } from "./kv";

/**
 * Admin-issued certificates: a unique code per dispatched unit, created
 * from the order screen in /admin and looked up on /verify-certificate
 * alongside the seed demo codes.
 */

const KEY = "certificates";

async function readIssued(): Promise<Certificate[]> {
  return (await getKV<Certificate[]>(KEY)) ?? [];
}

export const getIssuedCertificates = cache(readIssued);

export async function getAllCertificates(): Promise<Certificate[]> {
  return [...(await getIssuedCertificates()), ...seedCertificates];
}

export async function findCertificate(code: string): Promise<Certificate | null> {
  const clean = code.trim().toUpperCase();
  const all = await getAllCertificates();
  return all.find((c) => c.certificate_code === clean) ?? null;
}

export async function issueCertificate(input: {
  product_id: string;
  order_item_id: string | null;
  lab_name: string;
}): Promise<Certificate> {
  const issued = await readIssued();
  const year = new Date().getFullYear();
  const serial = String(issued.length + 200).padStart(5, "0");
  const rand = Math.random().toString(36).slice(2, 4).toUpperCase();
  const cert: Certificate = {
    id: `ic${Date.now().toString(36)}`,
    certificate_code: `NRV-${year}-${serial}${rand}`,
    product_id: input.product_id,
    order_item_id: input.order_item_id,
    lab_name: input.lab_name,
    issue_date: new Date().toISOString().slice(0, 10),
    pdf_url: null,
    qr_code_url: null,
  };
  issued.unshift(cert);
  await setKV(KEY, issued);
  return cert;
}

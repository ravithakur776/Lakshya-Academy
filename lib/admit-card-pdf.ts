import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export interface AdmitCardCandidate {
  id?: string;
  registrationNo: string;
  studentName: string;
  parentName: string;
  parentPhone: string;
  phone?: string;
  studentPhone?: string;
  parentEmail?: string;
  currentClass: string;
  class?: string;
  school?: string;
  city?: string;
  status?: string;
  examDate?: string;
  examCenter?: string;
  reportingTime?: string;
  examTiming?: string;
}

/**
 * Convert an image URL into a base64 Data URL in browser
 */
async function getImageBase64(url: string): Promise<string> {
  if (typeof window === "undefined") return "";
  try {
    return await new Promise<string>((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth || img.width || 400;
          canvas.height = img.naturalHeight || img.height || 400;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
            return;
          }
        } catch {
          // fallback
        }
        resolve("");
      };
      img.onerror = () => resolve("");
      img.src = url;
    });
  } catch {
    return "";
  }
}

/**
 * Generate official LTPE 2026 Admit Card PDF Document
 */
export async function buildAdmitCardPdf(candidate: AdmitCardCandidate): Promise<jsPDF> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 10;
  const contentWidth = pageWidth - margin * 2; // 190mm

  // Colors
  const primaryGreen = [15, 122, 60]; // #0F7A3C
  const darkGreen = [10, 80, 40];
  const lightGreenBg = [244, 250, 246]; // #F4FAF6
  const grayText = [75, 85, 99];
  const darkText = [17, 24, 39];
  const borderGray = [209, 213, 219];

  // 1. Outer Double Border
  doc.setDrawColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, margin, contentWidth, pageHeight - margin * 2, 3, 3);

  doc.setDrawColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.setLineWidth(0.2);
  doc.rect(margin + 1.2, margin + 1.2, contentWidth - 2.4, pageHeight - margin * 2 - 2.4);

  // 2. Top Header Accent Banner
  doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.rect(margin + 1.2, margin + 1.2, contentWidth - 2.4, 7, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(
    "LAKSHYA TALENT PROMOTIONAL EXAMINATION (LTPE 2026) — OFFICIAL HALL TICKET",
    pageWidth / 2,
    margin + 5.8,
    { align: "center" }
  );

  // 3. Logo and Institute Header
  const headerStartY = margin + 12;
  const logoBase64 = await getImageBase64("/logo.png");

  if (logoBase64) {
    try {
      doc.addImage(logoBase64, "PNG", margin + 4, headerStartY, 22, 22);
    } catch {
      // ignore
    }
  }

  // Header Typography
  const headerTextX = margin + (logoBase64 ? 29 : 6);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("LAKSHYA ACADEMY", headerTextX, headerStartY + 6);

  doc.setFontSize(9);
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
  doc.text("A DEDICATED TEAM OF IITIANS", headerTextX, headerStartY + 11);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(grayText[0], grayText[1], grayText[2]);
  doc.text(
    "Campus: 190/2, Krishna Nagar, Mathura, Uttar Pradesh - 281004",
    headerTextX,
    headerStartY + 15.5
  );
  doc.text(
    "Helpline: +91 9319098141, +91 7895060239  |  Website: www.lakshyaiit.com",
    headerTextX,
    headerStartY + 19.5
  );

  // Admit Card Pill on the right
  const pillWidth = 52;
  const pillHeight = 12;
  const pillX = pageWidth - margin - pillWidth - 4;
  const pillY = headerStartY + 3;

  doc.setFillColor(lightGreenBg[0], lightGreenBg[1], lightGreenBg[2]);
  doc.setDrawColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(pillX, pillY, pillWidth, pillHeight, 2, 2, "FD");

  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("ADMIT CARD / HALL TICKET", pillX + pillWidth / 2, pillY + 5, { align: "center" });
  doc.setFontSize(7);
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
  doc.text("EXAM SESSION: 2026-27", pillX + pillWidth / 2, pillY + 9.5, { align: "center" });

  // Divider line
  const dividerY = headerStartY + 25;
  doc.setDrawColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.setLineWidth(0.6);
  doc.line(margin + 3, dividerY, pageWidth - margin - 3, dividerY);

  // 4. Candidate Identification Strip (Registration Number)
  const stripY = dividerY + 3;
  const stripHeight = 13;
  doc.setFillColor(lightGreenBg[0], lightGreenBg[1], lightGreenBg[2]);
  doc.setDrawColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin + 3, stripY, contentWidth - 6, stripHeight, 2, 2, "FD");

  // Registration No
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("REGISTRATION / ROLL NO:", margin + 7, stripY + 4.5);
  doc.setFont("courier", "bold");
  doc.setFontSize(14);
  doc.setTextColor(15, 122, 60);
  doc.text(candidate.registrationNo || "LTPE2026000", margin + 7, stripY + 10.5);

  // Appearing Class
  const classText = candidate.currentClass || candidate.class || "Class 9";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(grayText[0], grayText[1], grayText[2]);
  doc.text("APPEARING CLASS:", margin + 85, stripY + 4.5);
  doc.setFontSize(11);
  doc.setTextColor(darkText[0], darkText[1], darkText[2]);
  doc.text(classText.toUpperCase(), margin + 85, stripY + 10);

  // Status & Fee Badge
  doc.setFontSize(7.5);
  doc.setTextColor(grayText[0], grayText[1], grayText[2]);
  doc.text("FEE STATUS:", margin + 140, stripY + 4.5);
  doc.setFontSize(9);
  doc.setTextColor(15, 122, 60);
  doc.text("CONFIRMED (Rs. 100 PAID)", margin + 140, stripY + 10);

  // 5. Candidate Details & Photo Area
  const detailsStartY = stripY + stripHeight + 4;
  const leftColWidth = 135;
  const photoBoxWidth = 35;
  const photoBoxHeight = 44;
  const photoX = pageWidth - margin - 4 - photoBoxWidth;

  // Photo Box
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.3);
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(photoX, detailsStartY, photoBoxWidth, photoBoxHeight, 1.5, 1.5, "FD");

  doc.setTextColor(156, 163, 175);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text("AFFIX RECENT", photoX + photoBoxWidth / 2, detailsStartY + 18, { align: "center" });
  doc.text("PASSPORT SIZE", photoX + photoBoxWidth / 2, detailsStartY + 22, { align: "center" });
  doc.text("COLOUR PHOTO", photoX + photoBoxWidth / 2, detailsStartY + 26, { align: "center" });
  doc.setFontSize(5.5);
  doc.text("(Self-Attested)", photoX + photoBoxWidth / 2, detailsStartY + 31, { align: "center" });

  // Student Details Grid
  interface FieldRow {
    label: string;
    value: string;
  }

  const fields: FieldRow[] = [
    { label: "Candidate's Full Name", value: (candidate.studentName || "N/A").toUpperCase() },
    { label: "Father's / Mother's Name", value: candidate.parentName || "N/A" },
    { label: "Parents Mobile (WhatsApp)", value: candidate.parentPhone || candidate.phone || "N/A" },
    { label: "Student's Mobile No.", value: candidate.studentPhone || "N/A" },
    { label: "School Name", value: candidate.school || "School Not Specified" },
    { label: "City / District", value: candidate.city || "Mathura (U.P.)" },
  ];

  let currentY = detailsStartY + 3;
  fields.forEach((field, idx) => {
    // Row background alternation
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin + 3, currentY - 2.5, leftColWidth - 4, 7, "F");
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(grayText[0], grayText[1], grayText[2]);
    doc.text(field.label + ":", margin + 6, currentY + 2);

    doc.setFont(idx === 0 ? "helvetica" : "helvetica", idx === 0 ? "bold" : "normal");
    doc.setFontSize(idx === 0 ? 9.5 : 8.5);
    doc.setTextColor(darkText[0], darkText[1], darkText[2]);

    // Truncate if too long
    const val = field.value.length > 38 ? field.value.slice(0, 36) + "..." : field.value;
    doc.text(val, margin + 50, currentY + 2);

    currentY += 7;
  });

  // 6. Examination Schedule & Venue Box
  const examBoxY = detailsStartY + photoBoxHeight + 4;
  const examBoxHeight = 32;

  doc.setFillColor(lightGreenBg[0], lightGreenBg[1], lightGreenBg[2]);
  doc.setDrawColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin + 3, examBoxY, contentWidth - 6, examBoxHeight, 2, 2, "FD");

  // Title of exam box
  doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.roundedRect(margin + 3, examBoxY, contentWidth - 6, 6, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("EXAMINATION SCHEDULE & VENUE DETAILS", margin + 7, examBoxY + 4.2);

  // Left sub-column: Schedule
  const schX = margin + 7;
  let schY = examBoxY + 11;

  doc.setTextColor(grayText[0], grayText[1], grayText[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("Date of Examination:", schX, schY);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.setFontSize(8.5);
  doc.text(candidate.examDate || "25 October 2026 (Sunday)", schX + 32, schY);

  schY += 6;
  doc.setTextColor(grayText[0], grayText[1], grayText[2]);
  doc.setFontSize(7.5);
  doc.text("Reporting Time:", schX, schY);
  doc.setTextColor(darkText[0], darkText[1], darkText[2]);
  doc.setFontSize(8);
  doc.text(candidate.reportingTime || "10:00 AM (Gate closes at 10:15 AM)", schX + 32, schY);

  schY += 6;
  doc.setTextColor(grayText[0], grayText[1], grayText[2]);
  doc.setFontSize(7.5);
  doc.text("Exam Duration:", schX, schY);
  doc.setTextColor(darkText[0], darkText[1], darkText[2]);
  doc.setFontSize(8);
  doc.text(candidate.examTiming || "10:30 AM – 12:00 PM (1.5 Hours)", schX + 32, schY);

  // Right sub-column: Venue
  const venueX = margin + 98;
  let venueY = examBoxY + 11;

  doc.setTextColor(grayText[0], grayText[1], grayText[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("Examination Venue / Test Center:", venueX, venueY);

  doc.setTextColor(darkText[0], darkText[1], darkText[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("Lakshya Academy Campus", venueX, venueY + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(grayText[0], grayText[1], grayText[2]);
  doc.text("190/2, Krishna Nagar, Mathura (U.P.) - 281004", venueX, venueY + 9.5);
  doc.text("Landmark: Near Krishna Nagar Post Office", venueX, venueY + 14);

  // 7. Security QR Code + Verification Stamp
  const qrSectionY = examBoxY + examBoxHeight + 4;
  const qrBoxHeight = 30;

  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.3);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin + 3, qrSectionY, contentWidth - 6, qrBoxHeight, 2, 2, "FD");

  // Generate QR Code data URL
  const verifyUrl = `https://www.lakshyaiit.com/admit-card/${encodeURIComponent(candidate.registrationNo)}`;

  try {
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      margin: 1,
      width: 140,
      color: { dark: "#0F7A3C", light: "#FFFFFF" },
    });
    doc.addImage(qrDataUrl, "PNG", margin + 6, qrSectionY + 2.5, 25, 25);
  } catch {
    // fallback box
  }

  // QR Text
  const qrTextX = margin + 35;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.text("OFFICIAL DIGITAL VERIFICATION CODE", qrTextX, qrSectionY + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(grayText[0], grayText[1], grayText[2]);
  doc.text(
    "Scan this QR code with any smartphone camera to verify this candidate's authentic",
    qrTextX,
    qrSectionY + 13
  );
  doc.text(
    "registration status and exam allotment on the Lakshya Academy official server.",
    qrTextX,
    qrSectionY + 17
  );

  doc.setFont("courier", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
  doc.text(`VERIFY URL: ${verifyUrl}`, qrTextX, qrSectionY + 22);

  // 8. Signatures Section
  const sigSectionY = qrSectionY + qrBoxHeight + 4;
  const sigBoxHeight = 24;
  const sigColWidth = (contentWidth - 6) / 3;

  // Box 1: Candidate Sign
  const sig1X = margin + 3;
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.3);
  doc.rect(sig1X, sigSectionY, sigColWidth, sigBoxHeight);
  doc.line(sig1X + 4, sigSectionY + 16, sig1X + sigColWidth - 4, sigSectionY + 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(grayText[0], grayText[1], grayText[2]);
  doc.text("Candidate's Signature", sig1X + sigColWidth / 2, sigSectionY + 20, { align: "center" });
  doc.setFontSize(5.5);
  doc.text("(To be signed in Exam Hall)", sig1X + sigColWidth / 2, sigSectionY + 22.5, { align: "center" });

  // Box 2: Invigilator Sign
  const sig2X = sig1X + sigColWidth;
  doc.rect(sig2X, sigSectionY, sigColWidth, sigBoxHeight);
  doc.line(sig2X + 4, sigSectionY + 16, sig2X + sigColWidth - 4, sigSectionY + 16);
  doc.setFontSize(6.5);
  doc.text("Invigilator's Signature", sig2X + sigColWidth / 2, sigSectionY + 20, { align: "center" });
  doc.setFontSize(5.5);
  doc.text("(To be verified on Exam Day)", sig2X + sigColWidth / 2, sigSectionY + 22.5, { align: "center" });

  // Box 3: Controller of Examinations Stamp
  const sig3X = sig2X + sigColWidth;
  doc.rect(sig3X, sigSectionY, sigColWidth, sigBoxHeight);

  // Stamp circle simulation
  doc.setDrawColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.setLineWidth(0.4);
  doc.circle(sig3X + sigColWidth / 2, sigSectionY + 9, 6.5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(5.5);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.text("LAKSHYA", sig3X + sigColWidth / 2, sigSectionY + 7.5, { align: "center" });
  doc.text("ACADEMY", sig3X + sigColWidth / 2, sigSectionY + 10, { align: "center" });
  doc.text("SEAL", sig3X + sigColWidth / 2, sigSectionY + 12.5, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(darkText[0], darkText[1], darkText[2]);
  doc.text("Controller of Examinations", sig3X + sigColWidth / 2, sigSectionY + 20, { align: "center" });
  doc.setFontSize(5.5);
  doc.setTextColor(grayText[0], grayText[1], grayText[2]);
  doc.text("Lakshya Academy Mathura", sig3X + sigColWidth / 2, sigSectionY + 22.5, { align: "center" });

  // 9. Important Instructions Box
  const instY = sigSectionY + sigBoxHeight + 4;
  const instHeight = 52;

  doc.setFillColor(252, 252, 252);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 3, instY, contentWidth - 6, instHeight, 2, 2, "FD");

  doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.roundedRect(margin + 3, instY, contentWidth - 6, 5, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text("IMPORTANT INSTRUCTIONS FOR CANDIDATES & PARENTS", margin + 7, instY + 3.6);

  const instructions = [
    "1. Printout: Bring a clear printed copy of this Admit Card and your School ID or Aadhaar Card to the exam hall.",
    "2. Reporting Time: Arrive at the exam center strictly by 10:00 AM. Entry will close at 10:15 AM sharp.",
    "3. Exam Pattern: Objective Multiple Choice Questions covering Physics, Chemistry & Mathematics.",
    "4. Pen Requirement: Use only Blue or Black Ballpoint Pen for darkening OMR circles. Gel pens & pencils are strictly prohibited.",
    "5. Prohibited Items: Mobile phones, smart watches, calculators, digital gadgets, and bags are NOT permitted in the hall.",
    "6. Seating Plan: Candidates must sit strictly on the seat allocated to their Roll Number as displayed on the notice board.",
    "7. Scholarship Assessment: Scholarships & batch allotments will be awarded purely on the basis of LTPE 2026 score.",
    "8. Helpline: For transport guidance or queries, call +91 9319098141, +91 7895060239 or visit the Lakshya Help Desk.",
  ];

  let instLineY = instY + 9;
  doc.setTextColor(darkText[0], darkText[1], darkText[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);

  instructions.forEach((inst) => {
    doc.text(inst, margin + 6, instLineY);
    instLineY += 5.2;
  });

  // 10. Document Footer
  const footerY = pageHeight - margin - 2;
  doc.setTextColor(grayText[0], grayText[1], grayText[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  doc.text(
    "Lakshya Academy Examination Cell | System-Generated Document | No physical stamp required.",
    pageWidth / 2,
    footerY,
    { align: "center" }
  );

  return doc;
}

/**
 * Generate Blob for downloading or Web Share API
 */
export async function generateAdmitCardPdfBlob(candidate: AdmitCardCandidate): Promise<Blob> {
  const doc = await buildAdmitCardPdf(candidate);
  return doc.output("blob");
}

/**
 * Trigger browser file download directly
 */
export async function downloadAdmitCardPdf(candidate: AdmitCardCandidate): Promise<void> {
  const doc = await buildAdmitCardPdf(candidate);
  const cleanName = (candidate.studentName || "Student").replace(/[^a-zA-Z0-9]/g, "_");
  const filename = `LTPE_AdmitCard_${candidate.registrationNo}_${cleanName}.pdf`;
  doc.save(filename);
}

/**
 * Build prefilled WhatsApp message text (Concise & clean, no clutter)
 */
export function buildAdmitCardWhatsAppMessage(candidate: AdmitCardCandidate): string {
  const className = candidate.currentClass || candidate.class || "Class 9";
  const studentName = candidate.studentName || "Candidate";
  return (
    `*LAKSHYA ACADEMY — LTPE 2026 OFFICIAL ADMIT CARD*\n` +
    `Dear Parent, please find attached the official Admit Card for *${studentName}* (Roll No: *${candidate.registrationNo}*, ${className}).\n` +
    `📅 Exam Date: 25 October 2026 (10:30 AM – 12:00 PM) | 🏢 Venue: Lakshya Academy, Krishna Nagar, Mathura`
  );
}

/**
 * Direct WhatsApp delivery:
 * 1. Automatically triggers the official Admit Card PDF download to the user's computer/phone.
 * 2. Directly opens WhatsApp chat for that recipient (WhatsApp Web on desktop, WhatsApp App on mobile).
 * 3. Pre-fills a short, professional caption so the admin can simply attach the downloaded PDF and send!
 */
export async function sendAdmitCardViaWhatsApp(
  candidate: AdmitCardCandidate,
  onFeedback?: (msg: string, type: "success" | "info" | "error") => void
): Promise<{ whatsappUrl: string; fileName: string }> {
  const phone = (candidate.parentPhone || candidate.phone || "").replace(/\D/g, "");
  const formattedPhone = phone.length === 10 ? `91${phone}` : phone;

  const messageText = buildAdmitCardWhatsAppMessage(candidate);
  const encodedMsg = encodeURIComponent(messageText);

  const cleanName = (candidate.studentName || "Student").replace(/[^a-zA-Z0-9]/g, "_");
  const fileName = `LTPE_AdmitCard_${candidate.registrationNo}_${cleanName}.pdf`;

  // Detect mobile vs desktop
  const isMobile =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Direct WhatsApp URL (Desktop opens WhatsApp Web directly; Mobile opens native WhatsApp)
  const whatsappUrl = isMobile
    ? `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodedMsg}`
    : `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${encodedMsg}`;

  // 1. Immediately open WhatsApp in new tab
  window.open(whatsappUrl, "_blank");

  // 2. Simultaneously generate and download official PDF
  try {
    const doc = await buildAdmitCardPdf(candidate);
    doc.save(fileName);

    onFeedback?.(
      `Admit Card PDF downloaded! Redirecting to WhatsApp for ${candidate.studentName}...`,
      "success"
    );
  } catch (err) {
    console.error("PDF download error during WhatsApp send:", err);
    onFeedback?.("WhatsApp chat opened!", "info");
  }

  return { whatsappUrl, fileName };
}

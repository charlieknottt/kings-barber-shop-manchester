import { NextRequest, NextResponse } from "next/server";
import { getDay } from "date-fns";
import { getBookingsByDate } from "@/lib/bookings-store";

// Hardcoded business hours
const businessHours: Record<number, { isOpen: boolean; openTime?: string; closeTime?: string }> = {
  0: { isOpen: false }, // Sunday
  1: { isOpen: false }, // Monday
  2: { isOpen: true, openTime: "08:00", closeTime: "18:30" }, // Tuesday
  3: { isOpen: true, openTime: "08:00", closeTime: "18:30" }, // Wednesday
  4: { isOpen: true, openTime: "08:00", closeTime: "18:30" }, // Thursday
  5: { isOpen: true, openTime: "08:00", closeTime: "18:30" }, // Friday
  6: { isOpen: true, openTime: "08:00", closeTime: "13:00" }, // Saturday
};

// Service durations
const serviceDurations: Record<string, number> = {
  "traditional-haircut": 30,
  "traditional-shave": 40,
  "beard-trim": 20,
  "children-seniors": 25,
};

function generateTimeSlots(openTime: string, closeTime: string, duration: number): string[] {
  const slots: string[] = [];
  const [openHour, openMin] = openTime.split(":").map(Number);
  const [closeHour, closeMin] = closeTime.split(":").map(Number);

  let currentHour = openHour;
  let currentMin = openMin;

  const closeMinutes = closeHour * 60 + closeMin;

  while (currentHour * 60 + currentMin + duration <= closeMinutes) {
    const timeStr = `${currentHour.toString().padStart(2, "0")}:${currentMin.toString().padStart(2, "0")}`;
    slots.push(timeStr);

    currentMin += 30; // 30-minute intervals
    if (currentMin >= 60) {
      currentHour += 1;
      currentMin = 0;
    }
  }

  return slots;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dateStr = searchParams.get("date");
  const serviceId = searchParams.get("serviceId");

  if (!dateStr || !serviceId) {
    return NextResponse.json(
      { error: "Date and serviceId are required" },
      { status: 400 }
    );
  }

  const date = new Date(dateStr);
  const dayOfWeek = getDay(date);

  const hours = businessHours[dayOfWeek];

  if (!hours || !hours.isOpen) {
    return NextResponse.json({ slots: [], message: "Closed on this day" });
  }

  const duration = serviceDurations[serviceId] || 30;

  // Generate all possible time slots
  const allSlots = generateTimeSlots(hours.openTime!, hours.closeTime!, duration);

  // Get existing bookings for this date
  const existingBookings = getBookingsByDate(dateStr);
  const bookedTimes = new Set(existingBookings.map((b) => b.startTime));

  // Filter out booked slots
  const availableSlots = allSlots.filter((slot) => !bookedTimes.has(slot));

  return NextResponse.json({ slots: availableSlots });
}

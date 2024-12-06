import { describe, expect, test } from "vitest";
import { formatDate } from "@/utilities/dateTimeFormatters";

describe("dateTimeFormatters", () => {
  test("formatDate() should throw an error if the parameter generates an invalid date", () => {
    expect(() => formatDate("invalid date")).toThrowError();
  });

  test("formatDate() should return a formatted date string", () => {
    const timestamp = new Date("2024-02-01").toISOString();
    const dateFormatted = formatDate(timestamp);

    expect(dateFormatted).toBe("01/02/2024");
  });
});

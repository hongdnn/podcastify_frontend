import { describe, it, expect, vi, afterEach } from "vitest";
import { formatDateTime } from "../src/utils/dateUtil";

const expectedOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
};

describe("formatDateTime", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("formats Date using the expected locale options", () => {
        const mockValue = "Jan 01, 2020, 12:00:00 AM";
        const spy = vi
            .spyOn(Date.prototype, "toLocaleString")
            .mockReturnValue(mockValue);

        const result = formatDateTime(new Date("2020-01-01T00:00:00.000Z"));

        expect(result).toBe(mockValue);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(undefined, expectedOptions);
    });

    it("accepts ISO string input", () => {
        const mockValue = "Feb 16, 2026, 07:08:09 PM";
        const spy = vi
            .spyOn(Date.prototype, "toLocaleString")
            .mockReturnValue(mockValue);

        const result = formatDateTime("2026-02-16T19:08:09.000Z");

        expect(result).toBe(mockValue);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(undefined, expectedOptions);
    });
});

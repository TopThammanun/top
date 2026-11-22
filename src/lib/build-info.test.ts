import { describe, expect, it } from "vitest";
import { buildInfo, buildMonth } from "./build-info";

describe("buildInfo", () => {
  it("falls back to dev values outside a Next build", () => {
    expect(buildInfo.sha).toBe("dev");
    expect(buildInfo.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("derives the build month", () => {
    expect(buildMonth).toBe(buildInfo.date.slice(0, 7));
  });
});

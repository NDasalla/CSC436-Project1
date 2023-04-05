import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ConversionRates from "./ConversionRates";

describe("ConversionRates component", () => {
	it("mounts", () => {
		expect(render(<ConversionRates />)).toBeTruthy();
	});
});

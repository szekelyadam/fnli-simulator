import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import NumberInput from "../NumberInput";

describe("NumberInput", () => {
    const mockOnChange = vi.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    it("renders with initial value", () => {
        render(<NumberInput value={5} onChange={mockOnChange} />);
        const input = screen.getByRole("spinbutton");
        expect(input).toHaveValue(5);
    });

    it("calls onChange with valid number between 1 and 90", () => {
        render(<NumberInput value={5} onChange={mockOnChange} />);
        const input = screen.getByRole("spinbutton");

        fireEvent.change(input, { target: { value: "42" } });
        expect(mockOnChange).toHaveBeenCalledWith(42);
    });

    it("does not call onChange with number less than 1", () => {
        render(<NumberInput value={5} onChange={mockOnChange} />);
        const input = screen.getByRole("spinbutton");

        fireEvent.change(input, { target: { value: "0" } });
        expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("does not call onChange with number greater than 90", () => {
        render(<NumberInput value={5} onChange={mockOnChange} />);
        const input = screen.getByRole("spinbutton");

        fireEvent.change(input, { target: { value: "90" } });
        expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("maintains previous value when invalid input is entered", () => {
        render(<NumberInput value={5} onChange={mockOnChange} />);
        const input = screen.getByRole("spinbutton");

        fireEvent.change(input, { target: { value: "invalid" } });
        expect(input).toHaveValue(5);
        expect(mockOnChange).not.toHaveBeenCalled();
    });
});

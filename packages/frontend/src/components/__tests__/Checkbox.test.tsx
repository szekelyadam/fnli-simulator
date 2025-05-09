import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Checkbox from "../Checkbox";

describe("Checkbox", () => {
    const mockOnChange = vi.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    it("renders with label", () => {
        render(
            <Checkbox
                checked={false}
                onChange={mockOnChange}
                label="Test Label"
            />
        );
        expect(screen.getByText("Test Label:")).toBeInTheDocument();
    });

    it("renders unchecked by default", () => {
        render(
            <Checkbox
                checked={false}
                onChange={mockOnChange}
                label="Test Label"
            />
        );
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
    });

    it("renders checked when checked prop is true", () => {
        render(
            <Checkbox
                checked={true}
                onChange={mockOnChange}
                label="Test Label"
            />
        );
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeChecked();
    });

    it("calls onChange when clicked", () => {
        render(
            <Checkbox
                checked={false}
                onChange={mockOnChange}
                label="Test Label"
            />
        );
        const checkbox = screen.getByRole("checkbox");

        fireEvent.click(checkbox);
        expect(mockOnChange).toHaveBeenCalledWith(true);
    });

    it("toggles checked state when clicked", () => {
        const { rerender } = render(
            <Checkbox
                checked={false}
                onChange={mockOnChange}
                label="Test Label"
            />
        );
        const checkbox = screen.getByRole("checkbox");

        fireEvent.click(checkbox);
        expect(mockOnChange).toHaveBeenCalledWith(true);

        rerender(
            <Checkbox
                checked={true}
                onChange={mockOnChange}
                label="Test Label"
            />
        );
        fireEvent.click(checkbox);
        expect(mockOnChange).toHaveBeenCalledWith(false);
    });
});

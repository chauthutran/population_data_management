import { render, screen } from "@testing-library/react";
import AppIcon from "./AppIcon";

describe("AppIcon", () => {
    it("renders the size correctly", () => {
        const size = 10;
        render(
            <AppIcon size={size} />
        );
        
        const imgTag = screen.getByRole("img") as HTMLImageElement;
        expect(imgTag).toBeInTheDocument();
        expect(imgTag).toHaveAttribute("src", "/lego1.svg");
        expect(imgTag.width).toBeCloseTo(size * 0.8);
        expect(imgTag.height).toBeCloseTo(size * 0.8);
    });
})
import { render, screen, fireEvent } from '@testing-library/react';
import Header from "./Header";

const mockPush = jest.fn();

jest.mock('@/hooks/useAuth', () => ({
    useAuth: () => ({ setUser: jest.fn() })
}));

jest.mock("next/navigation", () => ({
    usePathname: () => "/",
    useRouter: () => ({
        push: mockPush,
    })
}));
const mockHandleOpenSlidebar = jest.fn();


describe("Header", () => {
    it("renders app title and icon", () => {
        render(
            <Header handleOpenSlideBar={mockHandleOpenSlidebar} />
        );
        
        expect(screen.getByText("Population Data Management")).toBeInTheDocument();
        expect(screen.getByAltText('Population Icon')).toBeInTheDocument();
    });
    
    it("shows slidebar button and calls handler", () => {
        render(<Header handleOpenSlideBar={mockHandleOpenSlidebar} />);
        
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(mockHandleOpenSlidebar).toHaveBeenCalled();
    });
    
    it("does not render nav on login page", () => {
        render(<Header handleOpenSlideBar={mockHandleOpenSlidebar} />);
        expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
    });
    
    it("calls logout handle on click", () => {
        jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValueOnce("/dashboard");
        render(<Header handleOpenSlideBar={mockHandleOpenSlidebar} />);
        
        window.confirm = jest.fn(() => true);
        const logoutBtn = screen.getByText(/Logout/i);
        fireEvent.click(logoutBtn);
        expect(window.confirm).toHaveBeenCalled();
    });
});
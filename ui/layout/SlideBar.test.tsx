import { fireEvent, render, screen } from "@testing-library/react";
import SlideBar from "./SlideBar";
import * as usePageHook from "@/hooks/usePage";
import * as useAuthHook from '@/hooks/useAuth';
import * as useClickOutsideHook from '@/hooks/useClickOutside';
import { PAGE_ABOUT_US, PAGE_APPROVALS, PAGE_CHARTS, PAGE_DASHBOARD, PAGE_DATA_ENTRY, PAGE_FORECAST, PAGE_LOGIN } from "@/constants";
import { IUser } from "@/types/definations";


jest.mock("@/hooks/usePage");
jest.mock("@/hooks/useAuth");
jest.spyOn(useClickOutsideHook, "default").mockImplementation((handler) => {
    const ref = { current: document.createElement("div") };
    return ref;
});

describe("SlideBar", () => {
    
    const mockOnClose = jest.fn();
    const mockSetUser = jest.fn();
    const mockSetCurrentPage = jest.fn();
    const mockUser: IUser = { _id: "user1", email: "user1@gmail.com" };
    
    beforeEach(() => {
        jest.spyOn(usePageHook, "useCurrentPage").mockReturnValue({
            setCurrentPage: mockSetCurrentPage,
            curPage: PAGE_DASHBOARD.name,
            title: PAGE_DASHBOARD.title,
        });
        
        jest.spyOn(useAuthHook, "useAuth").mockReturnValue({
            setUser: mockSetUser,
            curUser: mockUser
        });
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    const mockPages = [
        PAGE_DASHBOARD,
        PAGE_DATA_ENTRY,
        PAGE_APPROVALS,
        PAGE_CHARTS,
        PAGE_FORECAST,
        PAGE_ABOUT_US,
    ];
    
    it("renders when isOpen is true", () => {
        render(<SlideBar isOpen={true} onClose={mockOnClose} />);
        
        const sliderBarTag = screen.getByRole("aside");
        expect(sliderBarTag).toBeInTheDocument();
        expect(sliderBarTag.className).toMatch(/translate-x-0/ );
    });
    
    it("hide when is Open is false", () => {
        render(<SlideBar isOpen={true} onClose={mockOnClose} />);
        
        const sliderBarTag = screen.getByRole("aside");
        expect(sliderBarTag).toBeInTheDocument();
        expect(sliderBarTag.className).toMatch(/-translate-x-full/);
    });
    
    it("render all menu items correctly", () => {
        render(<SlideBar isOpen={true} onClose={mockOnClose} />);
        
        const sliderBarTag = screen.getByRole("aside");
        mockPages.forEach((item) => {
             expect(sliderBarTag.querySelector(item.title)).toBeInTheDocument();
        });
        expect(sliderBarTag.querySelector("Logout")).toBeInTheDocument();
    });
    
    it("calls setCurrentPage and onClose when menu item clicked", () => {
        render(<SlideBar isOpen={true} onClose={mockOnClose} />);
        
        const dataEntryTag = screen.getByRole("aside").querySelector(PAGE_DATA_ENTRY.title);
        fireEvent.click(dataEntryTag!);
        
        expect(mockSetCurrentPage).toHaveBeenCalledWith({name: PAGE_DATA_ENTRY.name, title: PAGE_DATA_ENTRY.title});
        expect(mockOnClose).toHaveBeenCalled();
    });
    
    it('logout calls confirmation and clears user/session', () => {
        window.confirm = jest.fn(() => true); // simulate user clicking OK
        
        render(<SlideBar isOpen={true} onClose={mockOnClose} />);
        const logoutButtonTag = screen.getByText("Logout");
        fireEvent.click(logoutButtonTag);
        
        expect(mockSetCurrentPage).toHaveBeenCalledWith(PAGE_LOGIN);
        expect(mockSetUser).toHaveBeenCalledWith(null);
        expect(mockOnClose).toHaveBeenCalled();
    });
    
    it('logout does nothing if canceled', () => {
        window.confirm = jest.fn(() => true); // simulate user clicking OK
        
        render(<SlideBar isOpen={true} onClose={mockOnClose} />);
        const logoutButtonTag = screen.getByText("Logout");
        fireEvent.click(logoutButtonTag);
        
        expect(mockSetCurrentPage).not.toHaveBeenCalled();
        expect(mockSetUser).not.toHaveBeenCalled();
        expect(mockOnClose).not.toHaveBeenCalled();
    });
});
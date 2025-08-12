import { fireEvent, render, screen, within } from "@testing-library/react";
import SlideBar from "./SlideBar";
import * as usePageHook from "@/hooks/usePage";
import * as useAuthHook from '@/hooks/useAuth';
import * as useClickOutsideHook from '@/hooks/useClickOutside';
import { PAGE_ABOUT_US, PAGE_APPROVALS, PAGE_CHARTS, PAGE_DASHBOARD, PAGE_DATA_ENTRY, PAGE_FORECAST, PAGE_LOGIN } from "@/constants";
import { IUser } from "@/types/definations";
import { Provider } from "react-redux";
import { store } from "@/store/store";


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
        render(
            <Provider store={store}>
                <SlideBar isOpen={true} onClose={mockOnClose} />
            </Provider>
        );
        
        const sliderBarTag = screen.getByRole("complementary"); // aside
        expect(sliderBarTag).toBeInTheDocument();
        expect(sliderBarTag.className).toMatch(/translate-x-0/ );
    });
    
    it("hide when is Open is false", () => {
        render(
            <Provider store={store}>
                <SlideBar isOpen={false} onClose={mockOnClose} />
            </Provider>
        );
        
        const sliderBarTag = screen.getByRole("complementary"); // aside
        expect(sliderBarTag).toBeInTheDocument();
        expect(sliderBarTag.className).toMatch(/-translate-x-full/);
    });
    
    it("render all menu items correctly", () => {
        render(
            <Provider store={store}>
                <SlideBar isOpen={true} onClose={mockOnClose} />
            </Provider>
        );
        
        const sliderBarTag = screen.getByRole("complementary"); // aside
        const utils = within(sliderBarTag);

        mockPages.forEach((item) => {
            expect(utils.getByText(item.title)).toBeInTheDocument();
        });
        expect(utils.getByText(/Logout/)).toBeInTheDocument();
    });
    
    it('logout calls confirmation and clears user/session', () => {
        window.confirm = jest.fn(() => true); // simulate user clicking OK
        
        render(
            <Provider store={store}>
                <SlideBar isOpen={true} onClose={mockOnClose} />
            </Provider>
        );
        
        const sliderBarTag = screen.getByRole("complementary"); // aside
        const utils = within(sliderBarTag);
        const logoutButtonTag = utils.getByText(/Logout/);
        fireEvent.click(logoutButtonTag);
        
        expect(mockSetUser).toHaveBeenCalledWith(null);
        expect(mockOnClose).toHaveBeenCalled();
    });
    
    it('logout does nothing if canceled', () => {
        window.confirm = jest.fn(() => false); // simulate user clicking Cancel
        
        render(
            <Provider store={store}>
                <SlideBar isOpen={true} onClose={mockOnClose} />
            </Provider>
        );
        
        const sliderBarTag = screen.getByRole("complementary");
        const utils = within(sliderBarTag);
        const logoutButtonTag = utils.getByText(/Logout/);
        fireEvent.click(logoutButtonTag);
        
        expect(mockSetUser).not.toHaveBeenCalled();
        expect(mockOnClose).not.toHaveBeenCalled();
    });
});
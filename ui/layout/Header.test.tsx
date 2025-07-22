import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";
import * as usePageHook from "@/hooks/usePage";
import { PAGE_ABOUT_US, PAGE_APPROVALS, PAGE_CHARTS, PAGE_DASHBOARD, PAGE_DATA_ENTRY, PAGE_FORECAST, PAGE_LOGIN } from "@/constants";


describe("Header", () => {
    const setCurrentPage = jest.fn();
    const handleOpenSlideBar = jest.fn();
    
    beforeEach(() => {
        // spies on the useCurrentPage function inside the usePageHook module.
        jest.spyOn(usePageHook, "useCurrentPage").mockReturnValue({
            setCurrentPage,
            curPage: PAGE_DASHBOARD.name,
            title: PAGE_DASHBOARD.title,
        });
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it("renders title and icon", () => {
        render(
            <Header handleOpenSlideBar={handleOpenSlideBar} />
        );
        
        expect(screen.getByText("Population Data Management")).toBeInTheDocument();
        expect(screen.getByAltText('Population Icon')).toBeInTheDocument();
    });
    
    it("renders all nagivation items", () => {
        render(
            <Header handleOpenSlideBar={handleOpenSlideBar} />
        );
        
        expect(screen.getByText(PAGE_DASHBOARD.title)).toBeInTheDocument();
        expect(screen.getByText(PAGE_DATA_ENTRY.title)).toBeInTheDocument();
        expect(screen.getByText(PAGE_APPROVALS.title)).toBeInTheDocument();
        expect(screen.getByText(PAGE_CHARTS.title)).toBeInTheDocument();
        expect(screen.getByText(PAGE_FORECAST.title)).toBeInTheDocument();
        expect(screen.getByText(PAGE_ABOUT_US.title)).toBeInTheDocument();
    });
    
    it("calls setCurrentPage on nav click", () => {
        render(
            <Header handleOpenSlideBar={handleOpenSlideBar} />
        );
        
        fireEvent.click(screen.getByText(PAGE_DATA_ENTRY.title));
        expect(setCurrentPage).toHaveBeenCalledWith(expect.objectContaining({name: PAGE_DATA_ENTRY.name}));
    });
    
    it("does not render nav when on login page", () => {
        jest.spyOn(usePageHook, "useCurrentPage").mockReturnValue({
            setCurrentPage,
            curPage: PAGE_LOGIN.name,
            title: PAGE_LOGIN.title,
        })
        
        render(
            <Header handleOpenSlideBar={handleOpenSlideBar} />
        )
        expect(screen.queryByText(PAGE_DASHBOARD.title)).toBeNull();
    });
});
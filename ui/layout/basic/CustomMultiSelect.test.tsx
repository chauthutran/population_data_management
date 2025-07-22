import { render, screen } from "@testing-library/react";
import CustomMultiSelect from "./CustomMultiSelect";

type Item = { _id: string, name: string };

const items: Item[] = [
    { _id: "1", name: "Item 1" },
    { _id: "2", name: "Item 2" },
    { _id: "3", name: "Item 3" },
];

describe("CustomMultiSelect", () => {
    it("renders placeholder when no items are selected", () => {
        render(
            <CustomMultiSelect 
                title="Select Items"
                displayProp="name"
                valueProp="_id"
                options={items}
                onChange={() => {}}
                selected={null}
            />
        );
        
        expect(screen.getByText("Select Items")).toBeInTheDocument();
    });
    
    it("shows selected items", () => {
        
    });
    
    it("opens dropdown", () => {
        
    });
    
    it("closes dropdown", () => {
        
    });
    
    it("calls onChange", () => {
        
    });
    
    it("handles empty selection gracefully", () => {
        
    });
})
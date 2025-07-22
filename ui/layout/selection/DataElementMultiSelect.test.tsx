import { IDataElement, IPeriodType } from "@/types/definations";
import { fireEvent, render, screen } from "@testing-library/react";
import DataElementMultiSelect from "./DataElementMultiSelect";

describe("DataElementMultiSelect", () => {
    const periodType: IPeriodType = {_id: "petype1", name: "Yearly"};
    const de1 = {_id: "de1", name: "Data Element 1", shortName: "DE1", description: "", periodType: periodType};
    const de2 = {_id: "de2", name: "Data Element 2", shortName: "DE2", description: "", periodType: periodType};
    const mockDataElements: IDataElement[] = [de1, de2];
    
    const mockOnChange = jest.fn();
    
    it("renders DisableField when disable is true", () => {
        render(
            <DataElementMultiSelect 
                options={mockDataElements}
                selected={null}
                disabled={true}
                onChange={mockOnChange}
            />
        );
        
        expect(screen.getByText("Select Data Element")).toBeInTheDocument();
    });
    
    it("renders CustomMultiSelect when disable is false", () => {
        render(
            <DataElementMultiSelect 
                options={mockDataElements}
                selected={null}
                disabled={false}
                onChange={mockOnChange}
            />
        );
        
        expect(screen.getByText("Select Data Element")).toBeInTheDocument();
        mockDataElements.forEach((opt => {
            expect(screen.getByText(opt.name)).toBeInTheDocument();
        }));
    });
    
    it("calls onChange when an item is selected", () => {
        render(
            <DataElementMultiSelect 
                options={mockDataElements}
                selected={null}
                disabled={false}
                onChange={mockOnChange}
            />
        );
        
        const optionTag = screen.getByText(de1.name);
        fireEvent.click(optionTag);
        
        expect(mockOnChange).toHaveBeenCalled();
    });
    
    it("renders selected value", () => {
        render(
            <DataElementMultiSelect 
                options={mockDataElements}
                selected={[de1]}
                disabled={false}
                onChange={mockOnChange}
            />
        );
        
        expect(screen.getByText(de1.name)).toBeInTheDocument();
    });
});
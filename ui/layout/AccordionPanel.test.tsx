import { render, screen, fireEvent } from '@testing-library/react';
import AccordionPanel from './AccordionPanel';

describe("AccordionPanel", () => {
    const title = "Test Panel";
    const childrenText = "This is panel content";
    
    it("renders the title correctly", () => {
        render(
            <AccordionPanel
                title={title}
                isOpen={true}
                onClick={() => {}}
            >
                <div>{childrenText}</div>
            </AccordionPanel>
        );

        expect(screen.getByText(title)).toBeInTheDocument();
    });
    
    it("does not show children when isOpen is false", () => {
        render(
            <AccordionPanel
                title={title}
                isOpen={false}
                onClick={() => {}}
            >
                <div>{childrenText}</div>
            </AccordionPanel>
        )
        
        expect(screen.queryByText(childrenText)).toBeNull();
    });
    
    it("shows children when isOpen is true", () => {
        render(
            <AccordionPanel
                title={title}
                isOpen={true}
                onClick={() => {}}
            >
                <div>{childrenText}</div>
            </AccordionPanel>
        );
        
        expect(screen.getByText(childrenText)).toBeInTheDocument();
    });
    
    it("calls onClick when header is clicked", () => {
        const handleClick = jest.fn();
        render(
            <AccordionPanel
                title={title}
                isOpen={false}
                onClick={handleClick}
            >
                <div>{childrenText}</div>
            </AccordionPanel>
        )
        
        const buttonTag = screen.getByRole("button");
        fireEvent.click(buttonTag);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    
    it("applies additional classname to the button", () => {
        render(
            <AccordionPanel
                title={title}
                isOpen={false}
                onClick={() => {}}
                className="bg-red"
            >
                <div>{childrenText}</div>
            </AccordionPanel>
        );
        
        const buttonTag = screen.getByRole("button");
        expect(buttonTag).toHaveClass("bg-red");
    });
});
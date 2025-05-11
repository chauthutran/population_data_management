import { useChart } from '@/hooks/useChart';
import AccordionPanel from '@/ui/layout/AccordionPanel';
import OrgUnitLevelSelect from '@/ui/layout/selection/OrgUnitLevelSelect';
import OrgUnitTree from '@/ui/layout/selection/OrgUnitTree';

export default function OrgUnitPanel({
    activePanel,
    handlePanelOnClick,
}: {
    activePanel: string;
    handlePanelOnClick: (name: string) => void;
}) {
    const {
        selectedOrgUnit,
        selectedOrgUnitLevel,
        selectOrgUnit,
        selectOrgUnitLevel,
    } = useChart();

    return (
        <AccordionPanel
            title="OrgUnit"
            isOpen={activePanel === 'orgUnit'}
            onClick={() => handlePanelOnClick('orgUnit')}
            className={`${activePanel == 'orgUnit' && 'text-blue-600'}`}
        >
            <div className="flex-grow-0 space-y-4">
                <OrgUnitTree
                    onItemClick={selectOrgUnit}
                    selected={selectedOrgUnit}
                    disabled={false}
                />
                <OrgUnitLevelSelect
                    onChange={selectOrgUnitLevel}
                    selected={selectedOrgUnitLevel}
                />
            </div>
        </AccordionPanel>
    );
}

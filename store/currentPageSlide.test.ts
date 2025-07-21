import { PAGE_CHARTS, PAGE_LOGIN } from "@/constants"
import currentPageReducer, { setPage } from "./currentPageSlide"

describe("currentPageSlide", () => {
    it("should handle setPage", () => {
        const newState = currentPageReducer(PAGE_LOGIN, setPage(PAGE_CHARTS));
        expect(newState.name).toEqual(PAGE_CHARTS.name);
    })
})
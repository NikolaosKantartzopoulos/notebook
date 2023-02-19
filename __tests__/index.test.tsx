import { fireEvent, render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
	it("renders a heading", () => {
		render(<Home />);

		const heading = screen.getByRole("heading", {
			name: /Test/i,
		});

		expect(heading).toBeInTheDocument();
	});
	test("adds task to tasksArray", () => {
		render(<Home />);
		const inputSel = screen.getByLabelText("New Task");
		const button = screen.getByRole("button");
		fireEvent.change(inputSel, { target: { value: 123 } });
		fireEvent.click(button);
		const listItem = screen.getAllByRole("listitem")[0];
		expect(listItem.textContent).toBe("123");
		fireEvent.change(inputSel, { target: { value: 456 } });
		fireEvent.click(button);
		const listItem2 = screen.getAllByRole("listitem")[1];
		expect(listItem2.textContent).toBe("456");
		fireEvent.change(inputSel, { target: { value: 456 } });
		fireEvent.click(button);
		const listItem3 = screen.getAllByRole("listitem")[2];
		expect(listItem3).not.toBeInTheDocument;
		fireEvent.change(inputSel, { target: { value: 789 } });
		fireEvent.click(button);
		const listItem4 = screen.getAllByRole("listitem")[2];
		expect(listItem4.textContent).toBe("789");
	});
});

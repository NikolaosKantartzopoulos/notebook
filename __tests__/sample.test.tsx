import { screen, render } from "@testing-library/react";
import Sample from "@/pages/sample";

test("label", () => {
	render(<Sample />);

	const deleteDateLabel = screen.getByLabelText("Sample test");

	expect(deleteDateLabel).toBeInTheDocument();
});

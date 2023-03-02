import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import Home from "../pages/index";
import NoteContextProvider from "../data/contexts/note-context";
import VariablesContextProvider from "@/data/contexts/variables-context";

describe("Home", () => {
	test("renders Add New Note UI", async () => {
		const user = userEvent.setup();
		act(() => {
			render(
				<VariablesContextProvider>
					<NoteContextProvider>
						<Home />
					</NoteContextProvider>
				</VariablesContextProvider>
			);
		});

		const plus = await screen.findByTestId("plus-img");
		await act(async () => {
			await user.click(plus);
		});
		const deleteDateLabel = await screen.findByText("Ends");
		const titleInput = await screen.findByPlaceholderText("Title...");

		expect(deleteDateLabel).toBeInTheDocument();
		expect(titleInput).toBeInTheDocument();
	});

	test("add valid inputs", async () => {
		const user = userEvent.setup();

		act(() => {
			render(
				<VariablesContextProvider>
					<NoteContextProvider>
						<Home />
					</NoteContextProvider>
				</VariablesContextProvider>
			);
		});

		const plus = await screen.findByTestId("plus-img");
		await act(async () => {
			await user.click(plus);
		});

		const titleInput = await screen.findByPlaceholderText("Title...");
		const tagsInput = await screen.findByLabelText("Tags");
		const addTagButton = await screen.findByRole("button", { name: "+" });
		const addNewNoteButton = await screen.findByText("Submit");
		const detailsInput = await screen.findByPlaceholderText("Details...");

		await act(async () => {
			await user.click(titleInput);
			await user.keyboard("Sample Title");
			await user.click(tagsInput);
			await user.keyboard("tag1");
			await user.click(addTagButton);
			await user.click(tagsInput);

			await user.keyboard("tag2");
			await user.click(addTagButton);
			await user.click(tagsInput);

			await user.keyboard("tag3");
			await user.click(addTagButton);
			await user.click(detailsInput);
			await user.keyboard("Sample Details");

			await user.click(addNewNoteButton);
		});

		const noteOneTitle = await screen.findByTestId("noteTitle");
		const noteOneDetails = await screen.findByText("Sample Details");
		const allTags = await screen.findAllByText(/tag./);

		expect(noteOneTitle).toBeInTheDocument();
		expect(noteOneDetails).toBeInTheDocument();
		expect(allTags[0]).toHaveTextContent("tag1");
		expect(allTags[1]).toHaveTextContent("tag2");
		// expect(allTags[2]).toHaveTextContent("tag3");
	});

	// test("add wrong inputs", async () => {
	// 	const user = userEvent.setup();
	// 	act(() => {
	// 		render(
	// 			<NoteContextProvider>
	// 				<Home />
	// 			</NoteContextProvider>
	// 		);
	// 	});
	// 	const titleInput = screen.getByPlaceholderText("Title...");
	// 	const tagsInput = screen.getByLabelText("Tags");
	// 	const addTagButton = screen.getByRole("button", { name: "+" });
	// 	const addNewNoteButton = screen.getByRole("button", { name: "Submit" });
	// 	const detailsInput = screen.getByPlaceholderText("Details...");

	// 	await act(async () => {
	// 		fireEvent.change(titleInput, { target: { value: "Samsple Titlee" } });
	// 		fireEvent.change(tagsInput, { target: { value: "tag1" } });
	// 		await user.click(addTagButton);
	// 		fireEvent.change(tagsInput, { target: { value: "tag2" } });
	// 		await user.click(addTagButton);
	// 		fireEvent.change(tagsInput, { target: { value: "tag3" } });
	// 		await user.click(addTagButton);
	// 		await user.click(detailsInput);
	// 		await user.keyboard("Ssample Details");

	// 		fireEvent.click(addNewNoteButton);
	// 	});

	// 	const noteOneTitle = await screen.findByTestId("noteTitle");
	// 	const noteOneDetails = await screen.findByTestId("detailsTextarea");

	// 	expect(noteOneTitle).not.toHaveTextContent("Sample Title");
	// 	expect(noteOneDetails).not.toHaveTextContent("Sample Details");
	// });
});

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import Home from "../pages/index";
import NoteContextProvider from "../data/contexts/note-context";

describe("Home", () => {
	test("renders Add New Note UI", () => {
		render(
			<NoteContextProvider>
				<Home />
			</NoteContextProvider>
		);

		const deleteDateLabel = screen.getByText("Ends");

		expect(deleteDateLabel).toBeInTheDocument();
	});

	test("add valid inputs", async () => {
		const user = userEvent.setup();
		act(() => {
			render(
				<NoteContextProvider>
					<Home />
				</NoteContextProvider>
			);
		});
		const titleInput = screen.getByPlaceholderText("Title...");
		const tagsInput = screen.getByLabelText("Tags");
		const addTagButton = screen.getByRole("button", { name: "+" });
		const addNewNoteButton = screen.getByRole("button", { name: "Submit" });
		const detailsInput = screen.getByPlaceholderText("Details...");

		await act(async () => {
			fireEvent.change(titleInput, { target: { value: "Sample Title" } });
			fireEvent.change(tagsInput, { target: { value: "tag1" } });
			await user.click(addTagButton);
			fireEvent.change(tagsInput, { target: { value: "tag2" } });
			await user.click(addTagButton);
			fireEvent.change(tagsInput, { target: { value: "tag3" } });
			await user.click(addTagButton);
			await user.click(detailsInput);
			await user.keyboard("Sample Details");

			fireEvent.click(addNewNoteButton);
		});

		const noteOneTitle = await screen.findByTestId("noteTitle");
		const noteOneDetails = await screen.findByText("Sample Details");
		expect(noteOneTitle).toBeInTheDocument();
		expect(noteOneDetails).toBeInTheDocument();
	});

	test("add wrong inputs", async () => {
		const user = userEvent.setup();
		act(() => {
			render(
				<NoteContextProvider>
					<Home />
				</NoteContextProvider>
			);
		});
		const titleInput = screen.getByPlaceholderText("Title...");
		const tagsInput = screen.getByLabelText("Tags");
		const addTagButton = screen.getByRole("button", { name: "+" });
		const addNewNoteButton = screen.getByRole("button", { name: "Submit" });
		const detailsInput = screen.getByPlaceholderText("Details...");

		await act(async () => {
			fireEvent.change(titleInput, { target: { value: "Samsple Titlee" } });
			fireEvent.change(tagsInput, { target: { value: "tag1" } });
			await user.click(addTagButton);
			fireEvent.change(tagsInput, { target: { value: "tag2" } });
			await user.click(addTagButton);
			fireEvent.change(tagsInput, { target: { value: "tag3" } });
			await user.click(addTagButton);
			await user.click(detailsInput);
			await user.keyboard("Ssample Details");

			fireEvent.click(addNewNoteButton);
		});

		const noteOneTitle = await screen.findByTestId("noteTitle");
		const noteOneDetails = await screen.findByTestId("detailsTextarea");

		expect(noteOneTitle).not.toHaveTextContent("Sample Title");
		expect(noteOneDetails).not.toHaveTextContent("Sample Details");
	});
});

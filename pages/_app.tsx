import NoteContextProvider from "@/data/contexts/note-context";
import VariablesContextProvider from "@/data/contexts/variables-context";
import "@/styles/main.scss";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<VariablesContextProvider>
			<NoteContextProvider>
				<Component {...pageProps} />
			</NoteContextProvider>
		</VariablesContextProvider>
	);
}

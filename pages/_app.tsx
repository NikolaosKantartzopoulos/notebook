import NoteContextProvider from "@/data/contexts/note-context";
import VariablesContextProvider, {
	VariablesContext,
} from "@/data/contexts/variables-context";
import "@/styles/main.scss";
import type { AppProps } from "next/app";
import { useContext } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
	const varCtx = useContext(VariablesContext);
	return (
		<VariablesContextProvider>
			<NoteContextProvider>
				<Component {...pageProps} />
			</NoteContextProvider>
		</VariablesContextProvider>
	);
}

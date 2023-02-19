import NoteContextProvider from "@/data/contexts/note-context";
import "@/styles/global.css";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<NoteContextProvider>
			<Component {...pageProps} />
		</NoteContextProvider>
	);
}

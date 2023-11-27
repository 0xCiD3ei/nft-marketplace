import Header from "src/components/shared/Header/Header";
import Footer from "src/components/shared/Footer/Footer";

export default function MainLayout({children}) {
	return (
		<div className="h-full bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
			<Header/>
			<main>{children}</main>
			<Footer/>
		</div>
	)
}
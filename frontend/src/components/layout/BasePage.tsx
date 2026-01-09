import { Header } from "./Header";

interface BasePageProps {
    children: React.ReactNode;
}

// A base page layout that includes the Header component and renders child content. 
export function BasePage({ children }: BasePageProps) {
    return (
        <div>
            <Header />
            <div className='bg-black'>
                {children}
            </div>
        </div>
    );
}
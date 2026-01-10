import { BasePage } from "@/components/layout/BasePage";


export function HomePage() {
    return (
        <BasePage>
            {/* h-full agora faz ela ter 100% do espaço que sobrou do header */}
            <div className="h-full text-white flex flex-col items-center justify-center p-4">
                <h1>Seu Conteúdo Centralizado</h1>
            </div>
        </BasePage>
    );
}

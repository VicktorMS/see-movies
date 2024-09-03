import Image from "next/image";

function Header() {
    return (
        <header className="sticky top-0 navbar bg-primary text-primary-content shadow-md p-4 z-50">
            <div className="container mx-auto flex justify-center gap-2 items-center">
                <Image
                    src="/logo.svg"
                    alt="See Movies Logo"
                    width={32}
                    height={32}
                />
                <h1 className="text-2xl font-bold">See Movies</h1>
            </div>
        </header>
    );
}

export default Header;

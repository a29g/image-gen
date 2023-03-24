import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header className="flex justify-between p-5 bg-slate-100 sticky z-50 shadow-md top-0" >
            {/* left section */}

            <div className="flex space-x-2 items-center">
                <Image
                    src=
                    "https://1000logos.net/wp-content/uploads/2023/02/ChatGPT-Logo.png"

                    alt="logo"
                    width={100}
                    height={100}
                />
                <div>
                    <h1 className="font-bold">
                        <span className="text-violet-500">AI</span> Image generator
                    </h1>
                    <h2 className="text-xs">Powerded by DALL-E 2 , Chat-GPT </h2>
                </div>
            </div>

            {/* Right section */}

            <div className="flex items-center text-xs md:text-base divide-x text-green-500">
                <Link href="https://github.com/a29g/github-issue-page" className="px-2 border-solid border-2 border-green-200 rounded-md">
                    GitHub Repo
                </Link>
            </div>
        </header>
    );
};

export default Header;

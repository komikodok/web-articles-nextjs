import { IArticleCard } from "@/types/articles.type";
import Image from "next/image";
import { Lobster } from "next/font/google";
import { ArrowRight } from "lucide-react";

const lobster = Lobster({
    subsets: ["latin"],
    variable: "--font-lobster",
    weight: ["400"],
});


const ArticleCard = ({
    id,
    title,
    content,
    imageUrl,
    category: { name },
}: IArticleCard) => {
    return (
        <div className="max-w-lg md:max-w-3xl w-full group relative mx-auto md:h-96 h-78 bg-white shadow-xl rounded-md overflow-hidden flex">
            <div className="rounded-full w-20 h-20 absolute right-5 top-5 bg-gradient-to-tr from-rose-500/40"></div>
            <div className="rounded-full w-30 h-30 absolute right-52 -bottom-5 bg-gradient-to-tr from-rose-500/40"></div>

            <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-rose-600 text-xs font-semibold rounded-full shadow-md">
                    {name}
                </span>
            </div>

            <div className="relative flex-shrink-0 group-hover:scale-105 transition-all duration-500 w-2/4 h-full">
                {
                    imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div 
                            className="w-full h-full flex justify-center items-center"
                            style={{ backgroundImage: `linear-gradient(to bottom right, #d1d5dc, #d1d5dc, #d1d5dc, white, #d1d5dc)` }}
                        >
                            <span className="text-gray-600 font-medium">No Image</span>
                        </div>
                    )
                }

                <div className="absolute inset-0 overflow-hidden flex justify-center items-end p-4 bg-gradient-to-b via-transparent to-black/70 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p 
                        className={`
                            px-4 rounded-md text-white line-clamp-2 text-lg text-center
                            ${lobster.className}
                        `}
                    >
                        {content.replace(/<[^>]*>/g, '')}
                    </p>
                </div>

            </div>

            <div className="w-full h-full bg-[tomato]/10 flex flex-col justify-between items-start p-5">
                <div className="flex flex-col w-full">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Featured Article</span>
                    <h2 
                        className={`
                            text-2xl text-rose-600
                            ${lobster.className}
                        `}
                    >
                        Artics
                    </h2>
                </div>

                <div className="w-full h-96 flex flex-col gap-6 justify-center p-4">
                    <h2 
                        className={`
                            font-bold md:text-4xl text-lg text-center text-gray-800  group-hover:scale-105 group-hover:rotate-1 transition-all duration-500
                            ${lobster.className} 
                        `}
                    >
                        { title }
                    </h2>
                </div>

                <div className="ml-auto rounded-full font-bold cursor-pointer text-sm flex gap-2 justify-center items-center p-2 flex-shrink-0 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-orange-500">
                    <ArrowRight className="text-rose-500" size={14}></ArrowRight>
                    <span>Read More...</span>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;

import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
    images: string[];
    name: string;
    price: number;
    id: string;
    smallDescription: string;
}

export function ProductCard({ images, name, price, id, smallDescription }: iAppProps) {
    return (
        <div className="rounded-lg p-2">
            <Carousel className="w-full mx-auto">
                <CarouselContent>
                    {images.map((item, index) =>(
                        <CarouselItem key={index}>
                            <div className="relative h-[230px]">
                            <Image src={item} alt="Product Image" fill className="object-cover w-full h-full rounded-lg"/>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 -ml-4" />
                <CarouselNext className="absolute right-0 -mr-4" />
            </Carousel>
            {/* <div className="relative h-[230px]">
                <Image src={images[0]} alt="Product Image" fill className="object-cover w-full h-full rounded-lg"/>
            </div> */}
            <div className="flex justify-between items-center mt-2">
                <h1 className="font-semibold text-xl">{name}</h1>
                <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 font-medium text-primary ring-1 ring-primary/10 ring-inset">${price}</h3>
            </div>
            <p className="text-grey-400 line-clamp-2 text-sm mt-2">{ smallDescription }</p>

            <Button asChild className="w-full mt-5">
                <Link href={`/product/${id}`}>View Details</Link>
            </Button>
        </div>
    )
}
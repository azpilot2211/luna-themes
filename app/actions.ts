"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import prisma from "./lib/db";
import { type CategoryTypes } from "@prisma/client";

export type State = {
    status: 'error' | 'success' | undefined;
    errors?: {
        [key: string]: string[];
    }
    message?: string | null;
}

const productSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    category: z.string().min(1, { message: "Category is Required" }),
    price: z.number().min(1, { message: "Price must be at least 1" }),
    smallDescription: z.string().min(10, { message: "Short summary must be at least 10 characters" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters" }),
    images: z.array(z.string(), { message: "Images are Required" }),
    productFile: z.string().min(1, { message: "Product File is Required" }),
});

const userSettingsSchema = z.object({
    firstName: z.string().min(3, { message: "Name must be at least 3 characters" }).or(z.literal("")).optional(),
    lastName: z.string().min(3, { message: "Name must be at least 3 characters" }).or(z.literal("")).optional(),
})

export async function SellProduct(prevState: any, formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user || user === null || !user.id){
        throw new Error("User not found");
    }

    const validateFields = productSchema.safeParse({
        name: formData.get("name"),
        category: formData.get("category"),
        price: Number(formData.get("price")),
        smallDescription: formData.get("smallDescription"),
        description: formData.get("description"),
        images: JSON.parse(formData.get("images") as string),
        productFile: formData.get("productFile"),
    });

    if(!validateFields.success){
        const state: State = {
            status: 'error',
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Something went wrong, please try again'
        };

        return state;
    }

    await prisma.product.create({
        data: {
            name: validateFields.data.name,
            category: validateFields.data.category as CategoryTypes,
            price: validateFields.data.price,
            smallDescription: validateFields.data.smallDescription,
            description: JSON.parse(validateFields.data.description),
            images: validateFields.data.images,
            productFile: validateFields.data.productFile,
            userId: user.id
        }
    });

    const state: State = {
        status: 'success',
        message: 'Product created successfully'
    };

    return state;
}

export async function UpdateUserSettings(prevState: any, formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user || user === null || !user.id){
        throw new Error("User not found");
    }

    const validateFields = userSettingsSchema.safeParse({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
    });

    if(!validateFields.success){
        const state: State = {
            status: 'error',
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Something went wrong, please try again'
        };

        return state;
    }

    const data = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            firstName: validateFields.data.firstName,
            lastName: validateFields.data.lastName
        }
    });

    const state: State = {
        status: 'success',
        message: 'User settings updated successfully',
    };

    return state;
}
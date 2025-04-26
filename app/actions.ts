'use server'

import connection from "@/lib/mongodb"
import Link from "@/models/Link";

async function generateSlug(len = 10) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < len; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    let data = await Link.find({ ['slug']: result })

    if (data.length > 0) {
        return generateSlug(10)
    }

    return result;
}

export type creation = {
    status: boolean,
    message: string,
    slug?: string
}

export async function createLink(url: string): Promise<creation> {
    try {
        await connection();

        let slug = await generateSlug();
        Link.create({
            url,
            slug
        })

        return {
            status: true,
            message: 'sucesso',
            slug: slug
        }

    } catch (error) {
        return {
            status: false,
            message: 'falha ao gravar'
        }

    }
}
import { createLink } from '@/app/actions';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {

    try {
        const link = request.nextUrl.searchParams.get('link');
        
        const newLink = await createLink(String(link ?? '')); 

        const redirectUrl = request.nextUrl.origin + '/a/' + String(newLink.slug);

        if(String(newLink.slug) == 'undefined' || String(newLink.slug) == ''){
            throw new Error('Slug não retornada');
        }

        return new Response(JSON.stringify({
            status: 1,
            url: redirectUrl,
        }), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            status: 0,
            message: 'Ocorreu um erro ao criar o link. Tente novamente mais tarde.',
            error: String(error)
        }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
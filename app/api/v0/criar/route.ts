import { createLink_v2 } from '@/app/actions';
import qr from '@/lib/qr';
import { NextRequest, NextResponse } from 'next/server';

function corsResponse(body: any = null, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Vary": "Origin",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, socket-token, Accept, Origin, X-Requested-With, X-Header-One, X-Total-Count, x-csrf-token",
      "Access-Control-Allow-Credentials": "true"
    },
  });
}
export async function OPTIONS() {
  return corsResponse(null, 200);
}
    
async function qrCodeResponse(link: string) {

    const buffer = await qr(link, 300);

    return new NextResponse(buffer, {
        headers: {
            "content-type": "image/png"
        },
    });
}

export async function GET(request: NextRequest) {

    try {
        const link = request.nextUrl.searchParams.get('link');
        const qrCode = request.nextUrl.searchParams.get('qr');
        
        const newLink = await createLink_v2(String(link ?? '')); 

        const redirectUrl = request.nextUrl.origin + '/a/' + String(newLink.slug);

        if(String(newLink.slug) == 'undefined' || String(newLink.slug) == ''){
            throw new Error('Slug não retornada');
        }

        
        if(qrCode && qrCode === '1'){

            return await qrCodeResponse(redirectUrl ?? '');

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
'use server'

import { storeAccess } from "@/app/actions";
import connection from "@/lib/mongodb";
import Link from "@/models/Link";
import { redirect } from "next/navigation";

type PageProps = {
    params: Promise<{ slug: string }>;
  };
  
export default async function redirectioner({params}: PageProps) {
    
    await connection();

    const {slug} = await params;

    let slug_t = decodeURIComponent(slug)
                .replace(/[^a-zA-Z0-9_-]/g, "");

    let data = await Link.find({ ['slug']: slug_t })

    console.log({data});

    if(String(data[0].url).includes('http')){
        await storeAccess()
        return redirect(data[0].url)
    }

    if(Array.from(data).length > 0){
        await storeAccess()
        return redirect('https://'+data[0].url)
    }
    
    
    return (
        <div className="panel not-found-box">Opa, site nao encontrado! <a href="/">Encurtar links</a> </div>
    )
}
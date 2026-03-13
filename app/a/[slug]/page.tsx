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

    let data = await Link.find({ ['slug']: slug })

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
        <div>Opa, site não encontrado! <a href="/">Encurtar links</a> </div>
    )
}
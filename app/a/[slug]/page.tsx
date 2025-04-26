'use server'

import connection from "@/lib/mongodb";
import Link from "@/models/Link";
import { redirect } from "next/navigation";

type PageProps = {
    params: { slug: string };
  };
  
export default async function redirectioner({params}: PageProps) {
    
    await connection();

    let data = await Link.find({ ['slug']: params.slug })

    console.log({data});

    if(Array.from(data).length > 0){
        return redirect('https://'+data[0].url)
    }
    
    
    return (
        <div>Opa, site não encontrado! <a href="/">Encurtar links</a> </div>
    )
}
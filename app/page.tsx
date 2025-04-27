'use client'

import {BiCopyAlt, BiCheck} from "react-icons/bi";
import { createLink, creation, storeAccess } from "./actions";
import { useEffect, useState } from "react";

export default function Home() {

  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [isCopying, setCopying] = useState<boolean>(false);
  const [accessQuantity, setAccessQuantity] = useState<number>(1);
  
  useEffect(() => {
    let count = async () => {
      const { value } = await storeAccess();
      console.log({value});
      

      setTimeout(() => {
        setAccessQuantity(value)
      })
    }

    count();
  }, [])

  const save = async () => {
    let data: creation = await createLink(url)

    if (data.status == false) {
      alert(data.message)
    }
    
    if (data.status == true) {
      setSlug(window.location.href + 'a/' + String(data.slug))
      setUrl('');
    }
    
  }

  const copy = (data: string = '') => {
    setCopying(true);
    if(typeof data == 'string' && data != ''){
      navigator.clipboard.writeText(data);
    }
    setTimeout(() => {
      setCopying(false);
    }, 4000)
  }

  return (

    <div className="container py-5 d-flex flex-column align-items-center justify-content-center gap-3">
      <h1>Encurte de graça e use enquanto eu existir xD</h1>
      <div className="row justify-content-center mb-4 w-100">
        <div className="col-md-8 d-flex">
          <input type="text" id="linkInput" className="form-control form-control-lg me-2" placeholder="Cole seu link aqui..." onChange={(e) => setUrl(e.target.value)} value={url} />
          <button type="button" onClick={save} className="btn btn-secondary btn-lg" id="encurtarBtn">Encurtar</button>
        </div>
      </div>


      {
        slug != '' &&
        <div id="resultadoArea" className="row justify-content-center w-100">
          <div className="col-md-8">
            <div className="input-group" onClick={() => copy(slug)}>
              <input type="text" id="linkEncurtado" className="form-control form-control-lg" value={slug} readOnly/>
                <button className={'btn btn-outline-secondary'+(isCopying ? 'btn-success' : '')} type="button" id="copiarBtn">
                  {isCopying ? <BiCheck /> : <BiCopyAlt />}
                </button>
            </div>
          </div>
        </div>
      }

      Acessos: {accessQuantity}
    </div>

  );
}

'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { createLink, creation } from "./actions";
import { useState } from "react";

export default function Home() {

  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');

  const save = async () => {
    let data: creation = await createLink(url)

    if(data.status == false){
      alert(data.message)
    }
    if(data.status == true){
      setSlug(window.location.href+'a/'+String(data.slug))
      setUrl('');
    }
  }

  return (
    <div className={styles.page}>
      {url}
      <input type="text" onChange={(e) => setUrl(e.target.value)} value={url} className="text" />
      <button type="button" onClick={save}>Save</button>
      
      {
        slug != '' && <code>{slug}</code>
      }
    </div>
  );
}

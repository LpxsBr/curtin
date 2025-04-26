import { connect, Connection } from 'mongoose'
import { env } from 'process'

export default async function connection(){
    const init = connect(String(env.DATABASE)).then(e => {
        return e
    })

    return await init
}
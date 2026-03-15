import { toDataURL } from 'qrcode'

async function qr(data: string, size?: number): Promise<Buffer<ArrayBuffer>>{
    
    const qr = toDataURL(data, { width: size, margin: 1});
    
    const img = (await qr).split(',')[1];
    const buffer = Buffer.from(img, 'base64');
    
    return buffer;
}

export default qr;
# 🔗 42T - Link Shortener

O **42T** é um encurtador de links simples que permite transformar URLs
longas em links curtos de forma rápida.\
O projeto também oferece uma **API pública** para encurtamento
automático via requisições HTTP.

------------------------------------------------------------------------

# 🚀 Funcionalidades

-   Encurtamento de URLs
-   Redirecionamento automático
-   Interface web para criação de links
-   API para integração com outros sistemas

------------------------------------------------------------------------

# 🌐 Site

Acesse o encurtador:

https://42t.vercel.app

No site você pode:

1.  Colar uma URL
2.  Gerar um link encurtado
3.  Copiar o link gerado

------------------------------------------------------------------------

# 🔌 API

A API permite criar links curtos via requisição HTTP.

## Endpoint

GET /api/criar?link=URL

opcional para gerar qr code
GET /api/criar?link=URL&qr=1

## Exemplo de requisição

https://42t.vercel.app/api/criar?link=https://github.com/LpxsBr/curtin/tree/main&qr=1

## Exemplo de resposta

``` json
{
  "status": 1,
  "url": "https://42t.vercel.app/a/OekXw9T6OQ"
}
```

com &qr=1


``` json
QR Code
```

------------------------------------------------------------------------

# 🧪 Exemplo com curl

``` bash
curl "https://42t.vercel.app/api/criar?link=https://google.com"
```

------------------------------------------------------------------------

# 📌 Roadmap

Funcionalidades planejadas para próximas versões:

-   [x] Site do encurtador
-   [x] API para encurtamento de links
-   [x] Geração de QR Code para links encurtados
-   [x] Reaproveitamento de links encurtados (reduz carga de armazenamento do banco)
-   [ ] Painel de gerenciamento de links

------------------------------------------------------------------------

# 🛠 Possíveis usos

-   Compartilhamento rápido de links
-   Integração com bots e automações
-   Sistemas que precisam gerar links curtos
-   Campanhas de marketing

# 🏆 Checkpoints

-   [x] 10 acessos
-   [x] 100 acessos
-   [ ] 1000 acessos

# Aroma Coffee House

## Desenvolvimento

```sh
npm install
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Barista (recomendação de café)

A seção “Um café que combina com você” recebe o que o visitante digita e recomenda bebidas do cardápio. **Não usa IA externa nem chave de API**: o servidor compara o texto com palavras-chave de cada bebida em `src/lib/recommendation-local.ts`.

- Entende erros de digitação (ex.: “cage felado” → Iced Latte).
- Entende sinônimos (ex.: “leite gelado”, “frio”, “refrescante” → Iced Latte).
- Entende negações simples (ex.: “sem leite” → Espresso; “pouco doce” evita o Caramel Latte).
- Os gostos não são salvos. Preços e imagens vêm do cardápio da página.

Para ajustar as recomendações, edite a lista `keywords` em `src/lib/recommendation-local.ts`.

O WhatsApp e o Instagram ainda usam valores de exemplo e devem ser substituídos pelos contatos reais da loja.

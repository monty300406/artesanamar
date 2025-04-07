// /api/crear-preferencia.js

const mercadopago = require('mercadopago');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    // Agregá tu Access Token de producción
    mercadopago.configure({
        access_token: 'TU_ACCESS_TOKEN_AQUI',
    });

    try {
        const { title, price, quantity, image } = req.body;

        const preference = {
            items: [
                {
                    title,
                    unit_price: Number(price),
                    quantity: Number(quantity),
                    picture_url: image,
                },
            ],
            back_urls: {
                success: 'https://tusitio.com/success',
                failure: 'https://tusitio.com/failure',
                pending: 'https://tusitio.com/pending',
            },
            auto_return: 'approved',
        };

        const response = await mercadopago.preferences.create(preference);
        res.status(200).json({ id: response.body.id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Algo salió mal' });
    }
}

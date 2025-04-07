// api/create_preference.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Solo se permiten peticiones POST' });
    }

    const { title, price, quantity } = req.body;

    try {
        const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer TU_ACCESS_TOKEN', // REEMPLAZA AQUÍ
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [
                    {
                        title,
                        unit_price: Number(price),
                        quantity: Number(quantity)
                    }
                ]
            })
        });

        const data = await response.json();

        return res.status(200).json({ id: data.id });
    } catch (error) {
        return res.status(500).json({ error: 'Error al crear la preferencia' });
    }
}

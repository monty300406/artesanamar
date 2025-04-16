import express from 'express';
import mercadopago from 'mercadopago';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// 🔑 Reemplaza con tu Access Token de Mercado Pago (modo de prueba para empezar)
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-4862779799670588-040711-ef12900c1b62f758fae06ddee16aa61a-682632386' });
const preferences = new Preference(client);

app.get('/api/test', (req, res) => {
  console.log('Endpoint /api/test fue llamado'); // Agrega este log
  res.json({ message: 'Servidor backend funcionando correctamente' });
});

app.post('/api/create_preference', async (req, res) => {
  console.log('Endpoint /api/create_preference fue llamado'); // Agrega este log
  console.log('Cuerpo de la petición:', req.body); // Agrega este log
  try {
    const { title, quantity, unit_price } = req.body;
    console.log('Datos recibidos:', { title, quantity, unit_price }); // Agrega este log

    const preferenceData = {
      items: [
        {
          title: title,
          quantity: Number(quantity),
          unit_price: Number(unit_price),
        }
      ]
    };

    console.log('Datos para la preferencia:', preferenceData); // Agrega este log

    const response = await preferences.create({ body: preferenceData });
    console.log('Respuesta de Mercado Pago:', response); // Agrega este log
    res.json({ id: response.id });

  } catch (error) {
    console.error('Error al crear la preferencia:', error);
    res.status(500).send('Error al crear la preferencia');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
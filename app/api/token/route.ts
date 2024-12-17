import Midtrans from 'midtrans-client';
import { NextResponse } from 'next/server';

// Inisialisasi Midtrans
let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-xDQCV_KcmXFtFN_qqPNPAQr6',
  clientKey: 'SB-Mid-client-_8Cz3bAlA4n5zYOZ',
});

export async function POST(res: Request) {
  try {
    const { id, quantity, price, name } = await res.json();

    let parameters = {
      item_details: [
        {
          name: name,
          price: price,
          quantity: quantity,
        },
      ],
      transaction_details: {
        order_id: id,
        gross_amount: price * quantity,
      },
    };

    const token = await snap.createTransactionToken(parameters);

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error creating transaction token:', error);
    return NextResponse.json({ error: 'Failed to create transaction token' }, { status: 500 });
  }
}

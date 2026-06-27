import { NextRequest } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import InventoryPDF from '../../../lib/pdf/inventory-pdf';
import { componentType } from '@/lib/types/component';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const rawItems = formData.get('items');
  if (!rawItems || typeof rawItems !== 'string') {
    return new Response('Missing inventory items', {
      status: 400,
    });
  }
  const items = JSON.parse(rawItems) as componentType[];
  const document = InventoryPDF({ items });
  const pdfBuffer = await renderToBuffer(document);
  return new Response(new Uint8Array(pdfBuffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="inventory.pdf"',
    },
  });
}

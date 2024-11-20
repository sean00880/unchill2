import { headers } from 'next/headers';

export async function getServerSideHeaders() {
  const headersResult = await headers();
  const cookies = headersResult.get('cookie');
  return { cookies };
}

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const postType = body?.post_type as string | undefined;

  if (postType === 'eventos' || !postType) {
    revalidateTag('eventos');
    revalidatePath('/');
  }

  if (postType === 'post' || !postType) {
    revalidateTag('posts');
    revalidatePath('/blog');
  }

  if (postType === 'proveedores' || !postType) {
    revalidateTag('proveedores');
    revalidatePath('/proveidors');
  }

  revalidatePath('/', 'layout');

  return NextResponse.json({ revalidated: true, postType: postType ?? 'all' });
}

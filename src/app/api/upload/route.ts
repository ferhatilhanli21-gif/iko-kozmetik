import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Supabase yapılandırması eksik' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { data, error } = await supabase.storage
    .from('blog-images')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: true,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(data.path)

  return NextResponse.json({ url: urlData.publicUrl })
}

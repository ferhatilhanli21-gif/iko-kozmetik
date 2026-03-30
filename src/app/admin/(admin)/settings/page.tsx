'use client'

import { useState } from 'react'
import { Save, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
  const [siteName, setSiteName] = useState('İKO Kozmetik')
  const [siteDescription, setSiteDescription] = useState(
    "Morgan's Pomade Türkiye Distribütörü — Erkek bakımında kalite ve stil.",
  )
  const [siteUrl, setSiteUrl] = useState('https://ikokozmetik.com.tr')
  const [authorName, setAuthorName] = useState('İKO Kozmetik')
  const [authorBio, setAuthorBio] = useState(
    "Morgan's Pomade Türkiye distribütörü ve erkek bakım ürünleri uzmanı.",
  )
  const [commentsEnabled, setCommentsEnabled] = useState(true)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Ayarlar</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Site yapılandırmasını ve tercihlerini yönetin.
        </p>
      </div>

      {/* Site Settings */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Site Bilgileri</CardTitle>
          <CardDescription>Sitenizin temel bilgileri.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="siteName" className="text-sm font-medium">
              Site Adı
            </Label>
            <Input
              id="siteName"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="siteUrl" className="text-sm font-medium">
              Site URL'si
            </Label>
            <Input
              id="siteUrl"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              className="h-9 text-sm"
              type="url"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="siteDescription" className="text-sm font-medium">
              Site Açıklaması
            </Label>
            <Textarea
              id="siteDescription"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              className="text-sm resize-none"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Anasayfa için varsayılan meta açıklama olarak kullanılır.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Author Settings */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Yazar Profili</CardTitle>
          <CardDescription>Kamuya açık yazar bilgileri.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="authorName" className="text-sm font-medium">
              Görünen Ad
            </Label>
            <Input
              id="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="authorBio" className="text-sm font-medium">
              Biyografi
            </Label>
            <Textarea
              id="authorBio"
              value={authorBio}
              onChange={(e) => setAuthorBio(e.target.value)}
              className="text-sm resize-none"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Özellikler</CardTitle>
          <CardDescription>Site özelliklerini etkinleştirin veya devre dışı bırakın.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="comments" className="text-sm font-medium cursor-pointer">
                Yorumlar
              </Label>
              <p className="text-xs text-muted-foreground">Okuyucuların yazılara yorum bırakmasına izin ver.</p>
            </div>
            <Switch
              id="comments"
              checked={commentsEnabled}
              onCheckedChange={setCommentsEnabled}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analytics" className="text-sm font-medium cursor-pointer">
                Analitik
              </Label>
              <p className="text-xs text-muted-foreground">Ziyaretçi takibi ve sayfa görüntüleme analitiğini etkinleştir.</p>
            </div>
            <Switch
              id="analytics"
              checked={analyticsEnabled}
              onCheckedChange={setAnalyticsEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex items-center gap-3">
        <Button onClick={handleSave} className="gap-2">
          {saved ? (
            <>
              <CheckCircle className="h-4 w-4" />
              Kaydedildi
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Değişiklikleri Kaydet
            </>
          )}
        </Button>
        {saved && (
          <span className="text-sm text-emerald-600 dark:text-emerald-400">
            Ayarlar başarıyla kaydedildi.
          </span>
        )}
      </div>
    </div>
  )
}

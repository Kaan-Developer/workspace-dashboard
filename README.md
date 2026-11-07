# E-ticaret başlangıç altyapısı

React + TypeScript strict + Vite. Mağaza tasarımı veya iş mantığı içermez.

## Çalıştırma

Node.js >=22.22.0 ve pnpm 11.19.0 kullanın.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Diğer komutlar: `pnpm build`, `pnpm preview`, `pnpm lint`, `pnpm typecheck`.
Test altyapısı kurulmadı. `pnpm-lock.yaml` sürüm kontrolünde tutulmalıdır.

## Yapı ve veri akışı

- `index.html`: Türkçe belge ve React kök elemanı.
- `src/main.tsx`: React kökünü açar; modül yüklenirken bir kez oluşturulan QueryClient'ı QueryClientProvider'a verir, BrowserRouter ile URL yönlendirmesini etkinleştirir.
- `src/app/app.tsx`: App bileşeni yalnız `/` adresini StartPage bileşenine bağlar.
- `src/pages/start-page.tsx`: StartPage yalnız başlık ve başlangıç metnini gösterir.
- `src/lib/supabase.ts`: Ortam değerlerini kırpar; ikisi de doluysa Supabase istemcisi, herhangi biri eksikse `null` dışa aktarır. Kullanan kod önce null kontrolü yapmalıdır. Başlangıç sayfası veri isteği yapmaz.
- `src/types/env.d.ts`: İki ortam değişkenini isteğe bağlı string olarak tanımlar; eksik değerler TypeScript tarafında da hesaba katılır.
- `src/lib/utils.ts`: `cn` koşullu sınıfları clsx ile birleştirir, Tailwind sınıf çakışmalarını tailwind-merge ile çözer. Tüm UI bileşenleri aynı yardımcıyı kullanır.
- `src/index.css`: Tailwind v4, shadcn yardımcı stilleri, animasyonlar ve açık/koyu tema CSS değişkenleri. Sistem yazı tipi kullanılır.
- `src/components/layout`, `src/features`, `src/hooks`: Sonraki geliştirme için klasörler hazır; gereksiz boş dosya yoktur. Git boş klasörleri takip etmez.

Zustand, React Hook Form, Zod ve resolver kurulu; henüz store, form veya iş şeması yoktur. React Query önbelleği hazır, sorgu tanımlanmadı.

## UI bileşenleri

Bileşenler resmi shadcn CLI ile Radix tabanlı olarak üretildi. Alt bileşenler kendilerine gelen özellikleri ilgili HTML/Radix öğesine aktarır; `className` değerleri cn ile birleştirilir. Radix etkileşim, odak ve klavye davranışlarını sağlar.

| Dosya | Bileşenler ve görevleri |
| --- | --- |
| `button.tsx` | Button; variant/size ile görünüm seçer, asChild ile alt öğeye davranış aktarır. buttonVariants dosya içinde sınıfları hesaplar. |
| `input.tsx` | Input; yerel input özelliklerini ve stilleri aktarır. |
| `label.tsx` | Label; alanın erişilebilir etiketini sağlar. |
| `textarea.tsx` | Textarea; çok satırlı giriş özelliklerini aktarır. |
| `sheet.tsx` | Sheet, Trigger, Close, Portal, Overlay, Content, Header, Footer, Title, Description; yandan açılan panelin tetikleme, odak, başlık ve içerik parçaları. |
| `select.tsx` | Select, Group, Value, Trigger, Content, Label, Item, Separator, ScrollUpButton, ScrollDownButton; seçim, seçenekler ve kaydırma parçaları. |
| `checkbox.tsx` | Checkbox; Radix işaretleme durumunu ve dekoratif işaret ikonunu gösterir. |
| `accordion.tsx` | Accordion, Item, Trigger, Content; açılır bölüm, tetikleyici ve içerik. |
| `dropdown-menu.tsx` | DropdownMenu ve Portal/Trigger/Content/Group/Item/CheckboxItem/RadioGroup/RadioItem/Label/Separator/Shortcut/Sub/SubTrigger/SubContent parçaları; açılır menü ve seçim davranışları. |
| `tabs.tsx` | Tabs, List, Trigger, Content; sekme seçimi ve yatay/dikey yön. tabsListVariants liste sınıflarını dosya içinde hesaplar. |
| `skeleton.tsx` | Skeleton; yükleme sırasında kullanılabilecek yer tutucu. |
| `badge.tsx` | Badge; küçük durum etiketi. badgeVariants görünüm sınıflarını dosya içinde hesaplar. |
| `separator.tsx` | Separator; yatay/dikey ayırıcı. |
| `dialog.tsx` | Dialog, Trigger, Portal, Close, Overlay, Content, Header, Footer, Title, Description; modal pencere parçaları. |
| `alert-dialog.tsx` | AlertDialog, Trigger, Portal, Overlay, Content, Header, Footer, Media, Title, Description, Action, Cancel; onay penceresi parçaları. |

İkonlar adlandırılmış `react-icons/lu` importlarıdır. Dekoratif ikonlarda aria-hidden/focusable, mevcut boyut sınıfları ve 24px temel boyut korunur. Marka gerektiğinde `react-icons/si` kullanın. `lucide-react` doğrudan bağımlılık değildir.

CLI yeniden bileşen eklerse Lucide importlarını tekrar dönüştürün ve cn importunu `@/lib/utils` olarak kullanın. components.json içindeki lucide seçimi aynı ikon ailesinin CLI kaynağıdır. shadcn paketi CSS yardımcıları için geliştirme bağımlılığı olarak tutulur.

## Yapılandırma kararları

- `vite.config.ts`: React ve Tailwind Vite eklentileri; `@` dosya URL'sinden `src` klasörüne çözülür, Windows yol boşlukları desteklenir.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: Uygulama/Node ayarları ayrıdır; strict açık, uygulamada `@/*` kısayolu vardır. TypeScript 6.0.3 güncel typescript-eslint destek aralığıyla uyumludur.
- `eslint.config.js`: JavaScript/TypeScript, React Hooks ve Fast Refresh kuralları. Fast Refresh geliştirmede bileşen durumunu koruyarak güncelleme yapar; kullanılmayan varyant dışa aktarımları bu sınırı bozmaması için kaldırıldı.
- `components.json`: shadcn kaynak stili, tema ve import yolları.
- `package.json`, `pnpm-lock.yaml`: Komutlar, bağımlılıklar ve çözümlenmiş sürümler.
- `.gitignore`: Derleme, bağımlılıklar, loglar ve yerel ortam dosyaları hariç; `.env.example` takip edilebilir.

## Supabase

`.env.example` dosyasını `.env.local` olarak kopyalayıp kendi projenizin URL ve publishable key değerlerini girin. Dosya boş bırakıldığında istemci oluşturulmaz. Değişiklikten sonra geliştirme sunucusunu yeniden başlatın. `VITE_` değişkenleri tarayıcıya açıktır; secret veya service-role anahtarı kullanmayın. Harici proje/veritabanı oluşturulmadı, canlı bağlantı doğrulanmadı.

## Resmi kaynaklar

- https://vite.dev/guide/
- https://tailwindcss.com/docs/installation/using-vite
- https://ui.shadcn.com/docs/installation/vite
- https://ui.shadcn.com/docs/cli
- https://typescript-eslint.io/getting-started/
- https://reactrouter.com/start/declarative/installation
- https://tanstack.com/query/latest/docs/framework/react/quick-start
- https://supabase.com/docs/guides/getting-started/quickstarts/reactjs
- https://github.com/react-hook-form/resolvers
- https://react-icons.github.io/react-icons/

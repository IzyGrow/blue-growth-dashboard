import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Clock, 
  Download, 
  MessageCircle, 
  ChevronDown, 
  ChevronRight,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Package
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileItem {
  id: string;
  name: string;
  uploadDate?: string;
  hasComments?: boolean;
  commentsCount?: number;
}

interface ProjectSection {
  id: string;
  title: string;
  isExpanded: boolean;
  files: FileItem[];
  startDate?: string;
  estimatedEndDate?: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

interface KPIItem {
  name: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('ozet');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Faaliyet Raporu Verileri
  const activityReport = {
    socialMedia: {
      title: "Sosyal Medya Hedefleri",
      monthly: {
        target: 500,
        achieved: 420,
        status: "İyi gidiyor"
      },
      overall: {
        startValue: 1200,
        currentValue: 2450,
        growth: 104
      }
    },
    website: {
      title: "Web Sitesi Performansı", 
      monthly: {
        target: 2000,
        achieved: 1850,
        status: "Hedefe yakın"
      },
      overall: {
        startValue: 800,
        currentValue: 2450,
        growth: 206
      }
    },
    conversion: {
      title: "Dönüşüm Oranları",
      monthly: {
        target: 4.0,
        achieved: 3.2,
        status: "Gelişim gerekli"
      },
      overall: {
        startValue: 1.8,
        currentValue: 3.2,
        growth: 78
      }
    },
    email: {
      title: "E-mail Marketing",
      monthly: {
        target: 25.0,
        achieved: 22.5,
        status: "İyi seviyede"
      },
      overall: {
        startValue: 15.2,
        currentValue: 22.5,
        growth: 48
      }
    }
  };

  // Mock data - Bu veriler elle yüklenecek
  const subscriptionInfo = {
    customerName: "İntime Mimarlık",
    packageName: "Growth Paket",
    features: [
      "Profesyonel ve Dinamik web sitesi",
      "Sosyal medya yönetimi", 
      "Aylık ve haftalık planlama",
      "E-ticaret entegrasyonu",
      "Meta reklam yönetimi",
      "Blog yönetimi",
      "Whatsapp reklam",
      "Funnel ve Mesaj Yönetimi",
      "7/24 destek",
      "Detaylı Analiz"
    ],
    startDate: "18.07.2025",
    duration: "12 Ay"
  };

  const analysisItems: ProjectSection[] = [
    { id: 'swot', title: 'SWOT Analizi', isExpanded: false, files: [], status: 'in-progress', startDate: '15 Ocak 2024', estimatedEndDate: '25 Ocak 2024' },
    { id: 'brand', title: 'Marka Analizi', isExpanded: false, files: [], status: 'not-started' },
    { id: 'target', title: 'Hedef Kitle Analizi', isExpanded: false, files: [], status: 'not-started' },
    { id: 'competitor', title: 'Rakip Analizi', isExpanded: false, files: [], status: 'not-started' },
    { id: 'website', title: 'İnternet Sitesi Analizi', isExpanded: false, files: [], status: 'not-started' },
    { id: 'social', title: 'Sosyal Medya Analizi', isExpanded: false, files: [], status: 'not-started' },
    { id: 'trendyol', title: 'Trendyol Analizi', isExpanded: false, files: [], status: 'not-started' }
  ];

  const planningItems = [
    {
      id: 'social-planning',
      title: 'Sosyal Medya Planlaması',
      items: [
        { name: 'Instagram Yönetimi', completed: false },
        { name: 'Facebook Yönetimi', completed: true },
        { name: 'LinkedIn Stratejisi', completed: false },
        { name: 'İçerik Takvimi', completed: false }
      ]
    },
    {
      id: 'ecommerce-planning', 
      title: 'E-ticaret Planlaması',
      items: [
        { name: 'Shopify Kurulumu', completed: true },
        { name: 'Ürün Katalogu', completed: false },
        { name: 'Ödeme Sistemleri', completed: false }
      ]
    },
    {
      id: 'email-planning',
      title: 'E-mail Sistem Planlaması', 
      items: [
        { name: 'Email Şablonları', completed: false },
        { name: 'Otomasyon Kurulumu', completed: false },
        { name: 'Segment Tanımlama', completed: false }
      ]
    }
  ];

  const kpiData: KPIItem[] = [
    { name: 'Website Ziyareti', currentValue: 2450, targetValue: 3000, unit: 'ziyaret', trend: 'up' },
    { name: 'Sosyal Medya Takipçi', currentValue: 1250, targetValue: 2000, unit: 'takipçi', trend: 'up' },
    { name: 'Dönüşüm Oranı', currentValue: 3.2, targetValue: 5.0, unit: '%', trend: 'up' },
    { name: 'Email Açılma Oranı', currentValue: 22.5, targetValue: 25.0, unit: '%', trend: 'stable' }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success text-white">Tamamlandı</Badge>;
      case 'in-progress':
        return <Badge className="bg-warning text-white">Devam Ediyor</Badge>;
      default:
        return <Badge variant="outline">Başlanmadı</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-primary text-white p-6 rounded-lg shadow-elegant">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Müşteri Bilgilendirme Sistemi</h1>
                <p className="text-primary-foreground/90">
                  {subscriptionInfo.customerName} tarafından açılmıştır
                </p>
                <p className="text-primary-foreground/70 text-sm">İzygrow Dijital Pazarlama Hizmetleri</p>
              </div>
              <div className="hidden md:block">
                <img 
                  src="/lovable-uploads/c32f5373-5237-4023-9578-112741e0faa8.png" 
                  alt="İntime Mimarlık Logo" 
                  className="h-16 w-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6">
            <TabsTrigger value="ozet">Özet</TabsTrigger>
            <TabsTrigger value="abonelik">Abonelik</TabsTrigger>
            <TabsTrigger value="analiz">Analiz</TabsTrigger>
            <TabsTrigger value="planlama">Planlama</TabsTrigger>
            <TabsTrigger value="uygulama">Uygulama</TabsTrigger>
            <TabsTrigger value="performans-iyilestirme">Performans ve İyileştirme</TabsTrigger>
          </TabsList>

          {/* Özet Tab */}
          <TabsContent value="ozet" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpiData.map((kpi, index) => (
                <Card key={index} className="bg-gradient-card border-0 shadow-elegant">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">{kpi.name}</h3>
                      {getTrendIcon(kpi.trend)}
                    </div>
                    <div className="text-2xl font-bold">{kpi.currentValue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      Hedef: {kpi.targetValue.toLocaleString()} {kpi.unit}
                    </p>
                    <Progress 
                      value={(kpi.currentValue / kpi.targetValue) * 100} 
                      className="mt-2" 
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-card border-0 shadow-elegant">
              <CardHeader>
                <CardTitle>Proje Durumu</CardTitle>
                <CardDescription>Tüm süreçlerin genel görünümü</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success">2</div>
                    <div className="text-sm text-muted-foreground">Tamamlanan</div>
                  </div>
                  <div className="text-center p-4 bg-warning/10 rounded-lg">
                    <div className="text-2xl font-bold text-warning">3</div>
                    <div className="text-sm text-muted-foreground">Devam Eden</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-muted-foreground">5</div>
                    <div className="text-sm text-muted-foreground">Bekleyen</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Abonelik Tab */}
          <TabsContent value="abonelik">
            <Card className="bg-gradient-card border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {subscriptionInfo.packageName}
                </CardTitle>
                <CardDescription>
                  Başlangıç: {subscriptionInfo.startDate} | Süre: {subscriptionInfo.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold">Paket İçeriği:</h4>
                  <ul className="space-y-2">
                    {subscriptionInfo.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analiz Tab */}
          <TabsContent value="analiz" className="space-y-4">
            {analysisItems.map((item) => (
              <Card key={item.id} className="bg-gradient-card border-0 shadow-elegant">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => toggleSection(item.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {expandedSections[item.id] ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                      }
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      {getStatusBadge(item.status)}
                    </div>
                  </div>
                </CardHeader>
                
                {expandedSections[item.id] && (
                  <CardContent>
                    {item.files.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>Başlangıç: {item.startDate || 'Belirtilmedi'}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Clock className="h-4 w-4" />
                          <span>Tahmini Bitiş: {item.estimatedEndDate || 'Belirtilmedi'}</span>
                        </div>
                        <AlertCircle className="h-8 w-8 mx-auto mb-2 text-warning" />
                        <p>Henüz dosya eklenmedi</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {item.files.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span>{file.name}</span>
                            <div className="flex items-center gap-2">
                              {file.hasComments && (
                                <Badge variant="outline" className="text-xs">
                                  <MessageCircle className="h-3 w-3 mr-1" />
                                  {file.commentsCount}
                                </Badge>
                              )}
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>

          {/* Planlama Tab */}
          <TabsContent value="planlama" className="space-y-4">
            {planningItems.map((section) => (
              <Card key={section.id} className="bg-gradient-card border-0 shadow-elegant">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center gap-3">
                    {expandedSections[section.id] ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                
                {expandedSections[section.id] && (
                  <CardContent>
                    <div className="space-y-3">
                      {section.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <div className={cn(
                            "w-5 h-5 rounded border-2 flex items-center justify-center",
                            item.completed ? "bg-success border-success" : "border-muted-foreground"
                          )}>
                            {item.completed && <CheckCircle className="h-3 w-3 text-white" />}
                          </div>
                          <span className={cn(
                            item.completed ? "line-through text-muted-foreground" : ""
                          )}>
                            {item.name}
                          </span>
                          {item.completed && <Badge className="bg-success text-white text-xs">Tamamlandı</Badge>}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>

          {/* Uygulama Tab */}
          <TabsContent value="uygulama">
            <Card className="bg-gradient-card border-0 shadow-elegant">
              <CardHeader>
                <CardTitle>Uygulama Takibi</CardTitle>
                <CardDescription>Planlanan maddelerin aylık ve sürekli takibi</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Bu bölüm planlamada belirlenen maddeler tamamlandıktan sonra doldurulacaktır.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performans ve İyileştirme Tab - Faaliyet Raporu */}
          <TabsContent value="performans-iyilestirme" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl">Faaliyet Raporu</CardTitle>
                <CardDescription>Tüm bölümlerdeki çalışmaların müşteriye yansımaları</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(activityReport).map(([key, section]) => (
                <Card key={key} className="bg-gradient-card border-0 shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Aylık Performans */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-primary">Bu Ay</h4>
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Hedef:</span>
                          <span className="font-semibold">{section.monthly.target.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Gerçekleşme:</span>
                          <span className="font-semibold">{section.monthly.achieved.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm">Durum:</span>
                          <Badge 
                            className={cn(
                              section.monthly.status === "İyi gidiyor" ? "bg-success text-white" :
                              section.monthly.status === "Hedefe yakın" ? "bg-info text-white" :
                              section.monthly.status === "İyi seviyede" ? "bg-accent text-white" :
                              "bg-warning text-white"
                            )}
                          >
                            {section.monthly.status}
                          </Badge>
                        </div>
                        <Progress 
                          value={(section.monthly.achieved / section.monthly.target) * 100} 
                          className="h-2"
                        />
                        <div className="text-center text-xs text-muted-foreground mt-1">
                          %{Math.round((section.monthly.achieved / section.monthly.target) * 100)} tamamlandı
                        </div>
                      </div>
                    </div>

                    {/* Başlangıçtan Bu Yana */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-primary">Başlangıçtan Bu Yana</h4>
                      <div className="bg-secondary/20 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Başlangıç:</span>
                          <span className="font-semibold">{section.overall.startValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Şu Anki Durum:</span>
                          <span className="font-semibold">{section.overall.currentValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm">Büyüme:</span>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-success" />
                            <span className="font-semibold text-success">%{section.overall.growth}</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-primary transition-all duration-500"
                            style={{ width: `${Math.min(section.overall.growth, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Özet Tablo */}
            <Card className="bg-gradient-card border-0 shadow-elegant">
              <CardHeader>
                <CardTitle>Genel Performans Özeti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Kategori</th>
                        <th className="text-center p-2">Aylık Başarı</th>
                        <th className="text-center p-2">Genel Büyüme</th>
                        <th className="text-center p-2">Durum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(activityReport).map(([key, section]) => (
                        <tr key={key} className="border-b">
                          <td className="p-2 font-medium">{section.title}</td>
                          <td className="text-center p-2">
                            %{Math.round((section.monthly.achieved / section.monthly.target) * 100)}
                          </td>
                          <td className="text-center p-2 text-success font-semibold">
                            %{section.overall.growth}
                          </td>
                          <td className="text-center p-2">
                            <Badge 
                              className={cn(
                                section.monthly.status === "İyi gidiyor" ? "bg-success text-white" :
                                section.monthly.status === "Hedefe yakın" ? "bg-info text-white" :
                                section.monthly.status === "İyi seviyede" ? "bg-accent text-white" :
                                "bg-warning text-white"
                              )}
                            >
                              {section.monthly.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
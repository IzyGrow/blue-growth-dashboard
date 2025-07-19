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

  // Mock data - Bu veriler elle yüklenecek
  const subscriptionInfo = {
    packageName: "Premium Dijital Pazarlama Paketi",
    features: [
      "Sosyal Medya Yönetimi",
      "E-ticaret Optimizasyonu", 
      "SEO ve İçerik Pazarlama",
      "Email Marketing",
      "Performans Analizi"
    ],
    startDate: "15 Ocak 2024",
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
            <h1 className="text-3xl font-bold mb-2">Müşteri Bilgilendirme Sistemi</h1>
            <p className="text-primary-foreground/90">İzygrow Dijital Pazarlama Hizmetleri</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
            <TabsTrigger value="ozet">Özet</TabsTrigger>
            <TabsTrigger value="abonelik">Abonelik</TabsTrigger>
            <TabsTrigger value="analiz">Analiz</TabsTrigger>
            <TabsTrigger value="planlama">Planlama</TabsTrigger>
            <TabsTrigger value="uygulama">Uygulama</TabsTrigger>
            <TabsTrigger value="performans">Performans</TabsTrigger>
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

          {/* Performans Tab */}
          <TabsContent value="performans" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {kpiData.map((kpi, index) => (
                <Card key={index} className="bg-gradient-card border-0 shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      {kpi.name}
                      {getTrendIcon(kpi.trend)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Mevcut</span>
                        <span className="font-semibold">{kpi.currentValue.toLocaleString()} {kpi.unit}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Hedef</span>
                        <span className="font-semibold">{kpi.targetValue.toLocaleString()} {kpi.unit}</span>
                      </div>
                      <Progress 
                        value={Math.min((kpi.currentValue / kpi.targetValue) * 100, 100)} 
                        className="h-3"
                      />
                      <div className="text-center text-sm text-muted-foreground">
                        {Math.round((kpi.currentValue / kpi.targetValue) * 100)}% tamamlandı
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
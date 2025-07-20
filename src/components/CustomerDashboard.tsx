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
  Package,
  Plus,
  Target
} from 'lucide-react';
import { Input } from "@/components/ui/input";
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
    
  };

  const analysisItems: ProjectSection[] = [
    { id: 'goals', title: 'Hedefler Tablosu', isExpanded: false, files: [], status: 'in-progress' },
    { id: 'swot', title: 'SWOT Analizi', isExpanded: false, files: [], status: 'in-progress', startDate: '19.07.2025', estimatedEndDate: '25.07.2025' },
    { id: 'brand', title: 'Marka Analizi', isExpanded: false, files: [], status: 'not-started' },
    { id: 'target', title: 'Hedef Kitle Analizi', isExpanded: false, files: [], status: 'not-started' },
    { id: 'competitor', title: 'Rakip Analizi', isExpanded: false, files: [], status: 'not-started' },
    { id: 'website', title: 'İnternet Sitesi Analizi', isExpanded: false, files: [], status: 'not-started' },
    { id: 'social', title: 'Sosyal Medya Analizi', isExpanded: false, files: [], status: 'not-started' },
    { id: 'trendyol', title: 'Trendyol Analizi', isExpanded: false, files: [], status: 'not-started' }
  ];

  // SWOT Analizi için state'ler
  const [swotData, setSwotData] = useState({
    strengths: [''],
    weaknesses: [''],
    opportunities: [''],
    threats: [''],
    soActions: [''],
    stActions: ['']
  });

  // Rakip Analizi için state'ler
  const [competitorData, setCompetitorData] = useState({
    competitors: [],
    features: [''],
    comparisonTable: {}
  });

  // Hedefler için state'ler  
  const [goalsData, setGoalsData] = useState({
    shortTerm: [''],
    mediumTerm: [''],
    longTerm: ['']
  });

  // Hedef Kitle Analizi için state'ler
  const [targetAnalysisData, setTargetAnalysisData] = useState({
    services: [
      {
        id: 1,
        name: '',
        targetGroups: [
          {
            id: 1,
            ageRange: '',
            location: '',
            education: '',
            interests: '',
            persona: {
              name: '',
              bio: '',
              profession: '',
              hasChildren: '',
              residence: '',
              likes: '',
              painPoints: '',
              motivations: ''
            }
          }
        ]
      }
    ]
  });

  const addSwotItem = (category: keyof typeof swotData) => {
    setSwotData(prev => ({
      ...prev,
      [category]: [...prev[category], '']
    }));
  };

  const updateSwotItem = (category: keyof typeof swotData, index: number, value: string) => {
    setSwotData(prev => ({
      ...prev,
      [category]: prev[category].map((item, i) => i === index ? value : item)
    }));
  };

  const addGoalItem = (category: keyof typeof goalsData) => {
    setGoalsData(prev => ({
      ...prev,
      [category]: [...prev[category], '']
    }));
  };

  const updateGoalItem = (category: keyof typeof goalsData, index: number, value: string) => {
    setGoalsData(prev => ({
      ...prev,
      [category]: prev[category].map((item, i) => i === index ? value : item)
    }));
  };

  // Target Analysis helper functions
  const addService = () => {
    const newId = Math.max(...targetAnalysisData.services.map(s => s.id)) + 1;
    // Find the index where to insert the new service (after the last persona)
    const lastServiceIndex = targetAnalysisData.services.length - 1;
    const insertIndex = lastServiceIndex + 1;
    
    const newServices = [...targetAnalysisData.services];
    newServices.splice(insertIndex, 0, {
      id: newId,
      name: '',
      targetGroups: [{
        id: 1,
        ageRange: '',
        location: '',
        education: '',
        interests: '',
        persona: {
          name: '',
          bio: '',
          profession: '',
          hasChildren: '',
          residence: '',
          likes: '',
          painPoints: '',
          motivations: ''
        }
      }]
    });
    
    setTargetAnalysisData(prev => ({
      ...prev,
      services: newServices
    }));
  };

  const updateServiceName = (serviceId: number, name: string) => {
    setTargetAnalysisData(prev => ({
      ...prev,
      services: prev.services.map(service => 
        service.id === serviceId ? { ...service, name } : service
      )
    }));
  };

  const updateTargetGroup = (serviceId: number, groupId: number, field: string, value: string) => {
    setTargetAnalysisData(prev => ({
      ...prev,
      services: prev.services.map(service => 
        service.id === serviceId ? {
          ...service,
          targetGroups: service.targetGroups.map(group =>
            group.id === groupId ? { ...group, [field]: value } : group
          )
        } : service
      )
    }));
  };

  const updatePersona = (serviceId: number, groupId: number, field: string, value: string) => {
    setTargetAnalysisData(prev => ({
      ...prev,
      services: prev.services.map(service => 
        service.id === serviceId ? {
          ...service,
          targetGroups: service.targetGroups.map(group =>
            group.id === groupId ? {
              ...group,
              persona: { ...group.persona, [field]: value }
            } : group
          )
        } : service
      )
    }));
  };

  // Rakip Analizi helper functions
  const addCompetitor = (name: string, socialMedia: string, linkedin: string, website: string) => {
    const newCompetitor = {
      id: Date.now(),
      name,
      socialMedia,
      linkedin,
      website
    };
    
    setCompetitorData(prev => {
      const updatedCompetitors = [...prev.competitors, newCompetitor];
      
      // Yeni tablo verileri oluştur
      const newTable = {};
      prev.features.forEach(feature => {
        if (feature.trim()) {
          newTable[feature] = { ...prev.comparisonTable[feature] || {} };
          newTable[feature][newCompetitor.name] = '';
          newTable[feature]['İntime'] = newTable[feature]['İntime'] || '';
        }
      });
      
      return {
        ...prev,
        competitors: updatedCompetitors,
        comparisonTable: newTable
      };
    });
  };

  const updateCompetitor = (id: number, field: string, value: string) => {
    setCompetitorData(prev => ({
      ...prev,
      competitors: prev.competitors.map(comp => 
        comp.id === id ? { ...comp, [field]: value } : comp
      )
    }));
  };

  const addFeature = (feature: string) => {
    if (!feature.trim()) return;
    
    setCompetitorData(prev => {
      const updatedFeatures = [...prev.features, feature];
      
      // Tüm rakipler için yeni özellik satırı ekle
      const newTable = { ...prev.comparisonTable };
      newTable[feature] = {};
      newTable[feature]['İntime'] = '';
      prev.competitors.forEach(competitor => {
        newTable[feature][competitor.name] = '';
      });
      
      return {
        ...prev,
        features: updatedFeatures,
        comparisonTable: newTable
      };
    });
  };

  const updateComparisonScore = (feature: string, competitor: string, score: string) => {
    setCompetitorData(prev => ({
      ...prev,
      comparisonTable: {
        ...prev.comparisonTable,
        [feature]: {
          ...prev.comparisonTable[feature],
          [competitor]: score
        }
      }
    }));
  };

  const calculateRowTotal = (feature: string) => {
    const row = competitorData.comparisonTable[feature] || {};
    return Object.values(row).reduce((sum: number, score: unknown) => {
      const num = parseFloat(String(score)) || 0;
      return sum + num;
    }, 0);
  };

  const calculateColumnTotal = (competitor: string) => {
    return competitorData.features.reduce((sum: number, feature: string) => {
      const score = competitorData.comparisonTable[feature]?.[competitor] || '0';
      return sum + (parseFloat(String(score)) || 0);
    }, 0);
  };

  const addTargetGroup = (serviceId: number) => {
    setTargetAnalysisData(prev => ({
      ...prev,
      services: prev.services.map(service => 
        service.id === serviceId ? {
          ...service,
          targetGroups: [...service.targetGroups, {
            id: Math.max(...service.targetGroups.map(g => g.id)) + 1,
            ageRange: '',
            location: '',
            education: '',
            interests: '',
            persona: {
              name: '',
              bio: '',
              profession: '',
              hasChildren: '',
              residence: '',
              likes: '',
              painPoints: '',
              motivations: ''
            }
          }]
        } : service
      )
    }));
  };

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
    { name: 'Satış Yapılan Firma Sayısı', currentValue: 15, targetValue: 25, unit: 'firma', trend: 'up' },
    { name: 'Website Ziyareti', currentValue: 2450, targetValue: 3000, unit: 'ziyaret', trend: 'up' },
    { name: 'Sosyal Medya Takipçi', currentValue: 1250, targetValue: 2000, unit: 'takipçi', trend: 'up' },
    { name: 'Dönüşüm Oranı', currentValue: 3.2, targetValue: 5.0, unit: '%', trend: 'up' },
    { name: 'Email Açılma Oranı', currentValue: 22.5, targetValue: 25.0, unit: '%', trend: 'stable' }
  ];

  // Ülke bazında satış artışı verileri
  const countrySalesData = [
    { country: 'Türkiye', growth: 45, currentSales: 8, color: 'bg-red-500' },
    { country: 'İngiltere', growth: 22, currentSales: 3, color: 'bg-blue-500' },
    { country: 'Dubai', growth: 18, currentSales: 2, color: 'bg-green-500' },
    { country: 'Rusya', growth: 12, currentSales: 1, color: 'bg-purple-500' },
    { country: 'Almanya', growth: 8, currentSales: 1, color: 'bg-orange-500' }
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

            {/* Ülke Bazında Satış Artışı */}
            <Card className="bg-gradient-card border-0 shadow-elegant">
              <CardHeader>
                <CardTitle>Ülke Bazında Satış Artışı</CardTitle>
                <CardDescription>Hedef ülkelerdeki satış performansı</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {countrySalesData.map((country, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${country.color}`}></div>
                        <span className="font-medium">{country.country}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{country.currentSales} firma</div>
                        <div className="text-sm text-success">+%{country.growth}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                  Başlangıç: {subscriptionInfo.startDate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Paket İçeriği */}
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
                  
                  {/* Custom Geliştirme */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Custom Geliştirme</h4>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h5 className="font-medium mb-2">Anlaşılan Geliştirme</h5>
                      <p className="text-sm text-muted-foreground">
                        (sözleşmede ek A olarak eklenmiştir)
                      </p>
                    </div>
                  </div>
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
                    {/* Hedefler Tablosu */}
                    {item.id === 'goals' && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Kısa Vadeli Hedefler */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-primary" />
                              <h4 className="font-semibold">Kısa Vadeli</h4>
                            </div>
                            <div className="space-y-2">
                              {goalsData.shortTerm.map((goal, index) => (
                                <Input
                                  key={index}
                                  value={goal}
                                  onChange={(e) => updateGoalItem('shortTerm', index, e.target.value)}
                                  placeholder="Kısa vadeli hedef girin..."
                                  className="text-sm"
                                />
                              ))}
                              <Button 
                                onClick={() => addGoalItem('shortTerm')} 
                                variant="outline" 
                                size="sm"
                                className="w-full"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Ekle
                              </Button>
                            </div>
                          </div>

                          {/* Orta Vadeli Hedefler */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-primary" />
                              <h4 className="font-semibold">Orta Vadeli</h4>
                            </div>
                            <div className="space-y-2">
                              {goalsData.mediumTerm.map((goal, index) => (
                                <Input
                                  key={index}
                                  value={goal}
                                  onChange={(e) => updateGoalItem('mediumTerm', index, e.target.value)}
                                  placeholder="Orta vadeli hedef girin..."
                                  className="text-sm"
                                />
                              ))}
                              <Button 
                                onClick={() => addGoalItem('mediumTerm')} 
                                variant="outline" 
                                size="sm"
                                className="w-full"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Ekle
                              </Button>
                            </div>
                          </div>

                          {/* Uzun Vadeli Hedefler */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-primary" />
                              <h4 className="font-semibold">Uzun Vadeli</h4>
                            </div>
                            <div className="space-y-2">
                              {goalsData.longTerm.map((goal, index) => (
                                <Input
                                  key={index}
                                  value={goal}
                                  onChange={(e) => updateGoalItem('longTerm', index, e.target.value)}
                                  placeholder="Uzun vadeli hedef girin..."
                                  className="text-sm"
                                />
                              ))}
                              <Button 
                                onClick={() => addGoalItem('longTerm')} 
                                variant="outline" 
                                size="sm"
                                className="w-full"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Ekle
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SWOT Analizi */}
                    {item.id === 'swot' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Başlangıç: {item.startDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Tahmini Bitiş: {item.estimatedEndDate}</span>
                          </div>
                        </div>

                        {/* SWOT Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Güçlü Yönler */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-green-600">Güçlü Yönler (S)</h4>
                            <div className="space-y-2">
                              {swotData.strengths.map((strength, index) => (
                                <Input
                                  key={index}
                                  value={strength}
                                  onChange={(e) => updateSwotItem('strengths', index, e.target.value)}
                                  placeholder="Güçlü yön girin..."
                                  className="text-sm"
                                />
                              ))}
                              <Button 
                                onClick={() => addSwotItem('strengths')} 
                                variant="outline" 
                                size="sm"
                                className="w-full"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Ekle
                              </Button>
                            </div>
                          </div>

                          {/* Zayıf Yönler */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-red-600">Zayıf Yönler (W)</h4>
                            <div className="space-y-2">
                              {swotData.weaknesses.map((weakness, index) => (
                                <Input
                                  key={index}
                                  value={weakness}
                                  onChange={(e) => updateSwotItem('weaknesses', index, e.target.value)}
                                  placeholder="Zayıf yön girin..."
                                  className="text-sm"
                                />
                              ))}
                              <Button 
                                onClick={() => addSwotItem('weaknesses')} 
                                variant="outline" 
                                size="sm"
                                className="w-full"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Ekle
                              </Button>
                            </div>
                          </div>

                          {/* Fırsatlar */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-blue-600">Fırsatlar (O)</h4>
                            <div className="space-y-2">
                              {swotData.opportunities.map((opportunity, index) => (
                                <Input
                                  key={index}
                                  value={opportunity}
                                  onChange={(e) => updateSwotItem('opportunities', index, e.target.value)}
                                  placeholder="Fırsat girin..."
                                  className="text-sm"
                                />
                              ))}
                              <Button 
                                onClick={() => addSwotItem('opportunities')} 
                                variant="outline" 
                                size="sm"
                                className="w-full"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Ekle
                              </Button>
                            </div>
                          </div>

                          {/* Tehditler */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-orange-600">Tehditler (T)</h4>
                            <div className="space-y-2">
                              {swotData.threats.map((threat, index) => (
                                <Input
                                  key={index}
                                  value={threat}
                                  onChange={(e) => updateSwotItem('threats', index, e.target.value)}
                                  placeholder="Tehdit girin..."
                                  className="text-sm"
                                />
                              ))}
                              <Button 
                                onClick={() => addSwotItem('threats')} 
                                variant="outline" 
                                size="sm"
                                className="w-full"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Ekle
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Eylem Planları */}
                        <div className="space-y-6">
                          {/* Güçlü X Fırsat */}
                          <div className="p-4 bg-green-50 rounded-lg">
                            <h5 className="font-semibold text-green-700 mb-3">Güçlü X Fırsat Tablosundan Çıkan Eylemler</h5>
                            <div className="space-y-2">
                              {swotData.soActions.map((action, index) => (
                                <Input
                                  key={index}
                                  value={action}
                                  onChange={(e) => updateSwotItem('soActions', index, e.target.value)}
                                  placeholder="SO stratejisi eylem girin..."
                                  className="text-sm bg-white"
                                />
                              ))}
                              <Button 
                                onClick={() => addSwotItem('soActions')} 
                                variant="outline" 
                                size="sm"
                                className="w-full"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Eylem Ekle
                              </Button>
                            </div>
                          </div>

                          {/* Güçlü X Tehdit */}
                          <div className="p-4 bg-orange-50 rounded-lg">
                            <h5 className="font-semibold text-orange-700 mb-3">Güçlü X Tehdit Tablosundan Çıkan Eylemler</h5>
                            <div className="space-y-2">
                              {swotData.stActions.map((action, index) => (
                                <Input
                                  key={index}
                                  value={action}
                                  onChange={(e) => updateSwotItem('stActions', index, e.target.value)}
                                  placeholder="ST stratejisi eylem girin..."
                                  className="text-sm bg-white"
                                />
                              ))}
                              <Button 
                                onClick={() => addSwotItem('stActions')} 
                                variant="outline" 
                                size="sm"
                                className="w-full"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Eylem Ekle
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Hedef Kitle Analizi */}
                    {item.id === 'target' && (
                      <div className="space-y-6">
                        {/* Hizmetler Bölümü */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-primary">Hizmet/Ürün</h4>
                            <Button onClick={addService} variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Hizmet/Ürün Ekle
                            </Button>
                          </div>

                          {targetAnalysisData.services.map((service) => (
                            <div key={service.id} className="p-4 border rounded-lg space-y-4">
                              {/* Hizmet Adı */}
                              <Input
                                value={service.name}
                                onChange={(e) => updateServiceName(service.id, e.target.value)}
                                placeholder="Hizmet/Ürün adını girin..."
                                className="font-medium"
                              />

                              {/* Hedef Gruplar */}
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-medium">Hedef Gruplar</h5>
                                  <Button 
                                    onClick={() => addTargetGroup(service.id)} 
                                    variant="outline" 
                                    size="sm"
                                  >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Hedef Grup Ekle
                                  </Button>
                                </div>

                                {service.targetGroups.map((group) => (
                                  <div key={group.id} className="p-4 bg-muted/30 rounded-lg space-y-4">
                                    {/* Hedef Grup Bilgileri */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium mb-1 block">Yaş Aralığı</label>
                                        <Input
                                          value={group.ageRange}
                                          onChange={(e) => updateTargetGroup(service.id, group.id, 'ageRange', e.target.value)}
                                          placeholder="Örn: 25-35"
                                          className="text-sm"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium mb-1 block">Lokasyon</label>
                                        <Input
                                          value={group.location}
                                          onChange={(e) => updateTargetGroup(service.id, group.id, 'location', e.target.value)}
                                          placeholder="Örn: İstanbul, Ankara"
                                          className="text-sm"
                                        />
                                      </div>
                                       <div>
                                         <label className="text-sm font-medium mb-1 block">Eğitim Durumu</label>
                                         <select
                                           value={group.education}
                                           onChange={(e) => updateTargetGroup(service.id, group.id, 'education', e.target.value)}
                                           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                         >
                                           <option value="">Seçiniz</option>
                                           <option value="eğitimli">Eğitimli</option>
                                           <option value="eğitimsiz">Eğitimsiz</option>
                                           <option value="bu hizmet için önemli kriter değil">Bu hizmet için önemli kriter değil</option>
                                         </select>
                                       </div>
                                      <div>
                                        <label className="text-sm font-medium mb-1 block">İlgi Alanları</label>
                                        <Input
                                          value={group.interests}
                                          onChange={(e) => updateTargetGroup(service.id, group.id, 'interests', e.target.value)}
                                          placeholder="Örn: Teknoloji, spor"
                                          className="text-sm"
                                        />
                                      </div>
                                    </div>

                                    {/* Persona Bilgileri */}
                                    <div className="mt-4">
                                      <h6 className="font-medium mb-3 text-purple-600">Persona Bilgileri</h6>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <label className="text-sm font-medium mb-1 block">Adı</label>
                                          <Input
                                            value={group.persona.name}
                                            onChange={(e) => updatePersona(service.id, group.id, 'name', e.target.value)}
                                            placeholder="Örn: Ayşe Kaya"
                                            className="text-sm"
                                          />
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium mb-1 block">Mesleği</label>
                                          <Input
                                            value={group.persona.profession}
                                            onChange={(e) => updatePersona(service.id, group.id, 'profession', e.target.value)}
                                            placeholder="Örn: Pazarlama Müdürü"
                                            className="text-sm"
                                          />
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium mb-1 block">Çocuğu var mı?</label>
                                          <Input
                                            value={group.persona.hasChildren}
                                            onChange={(e) => updatePersona(service.id, group.id, 'hasChildren', e.target.value)}
                                            placeholder="Örn: Evet, 2 çocuk"
                                            className="text-sm"
                                          />
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium mb-1 block">Nerede yaşıyor</label>
                                          <Input
                                            value={group.persona.residence}
                                            onChange={(e) => updatePersona(service.id, group.id, 'residence', e.target.value)}
                                            placeholder="Örn: İstanbul, Kadıköy"
                                            className="text-sm"
                                          />
                                        </div>
                                        <div className="md:col-span-2">
                                          <label className="text-sm font-medium mb-1 block">Bio</label>
                                          <Input
                                            value={group.persona.bio}
                                            onChange={(e) => updatePersona(service.id, group.id, 'bio', e.target.value)}
                                            placeholder="Kısa biyografi..."
                                            className="text-sm"
                                          />
                                        </div>
                                        <div className="md:col-span-2">
                                          <label className="text-sm font-medium mb-1 block">Nelerden hoşlanıyor</label>
                                          <Input
                                            value={group.persona.likes}
                                            onChange={(e) => updatePersona(service.id, group.id, 'likes', e.target.value)}
                                            placeholder="Örn: Kitap okuma, seyahat"
                                            className="text-sm"
                                          />
                                        </div>
                                        <div className="md:col-span-2">
                                          <label className="text-sm font-medium mb-1 block">Acı noktaları neler</label>
                                          <Input
                                            value={group.persona.painPoints}
                                            onChange={(e) => updatePersona(service.id, group.id, 'painPoints', e.target.value)}
                                            placeholder="Örn: Zaman eksikliği, stres"
                                            className="text-sm"
                                          />
                                        </div>
                                        <div className="md:col-span-2">
                                          <label className="text-sm font-medium mb-1 block">Motivasyon kaynakları neler</label>
                                          <Input
                                            value={group.persona.motivations}
                                            onChange={(e) => updatePersona(service.id, group.id, 'motivations', e.target.value)}
                                            placeholder="Örn: Kariyer gelişimi, aile"
                                            className="text-sm"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Rakip Analizi */}
                    {item.id === 'competitor' && (
                      <div className="space-y-6">
                        {/* Rakip Ekleme Formu */}
                        <Card className="bg-blue-50 border border-blue-200">
                          <CardHeader>
                            <CardTitle className="text-blue-700">Yeni Rakip Ekle</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              const formData = new FormData(e.target as HTMLFormElement);
                              const name = formData.get('name') as string;
                              const socialMedia = formData.get('socialMedia') as string;
                              const linkedin = formData.get('linkedin') as string;
                              const website = formData.get('website') as string;
                              
                              if (name.trim()) {
                                addCompetitor(name, socialMedia, linkedin, website);
                                (e.target as HTMLFormElement).reset();
                              }
                            }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium mb-1 block">Rakibin Adı</label>
                                <Input name="name" placeholder="Rakip adını girin..." required />
                              </div>
                              <div>
                                <label className="text-sm font-medium mb-1 block">Sosyal Medya Adresi</label>
                                <Input name="socialMedia" placeholder="Sosyal medya linki..." />
                              </div>
                              <div>
                                <label className="text-sm font-medium mb-1 block">LinkedIn Adresi</label>
                                <Input name="linkedin" placeholder="LinkedIn profil linki..." />
                              </div>
                              <div>
                                <label className="text-sm font-medium mb-1 block">Web Adresi</label>
                                <Input name="website" placeholder="Website URL'si..." />
                              </div>
                              <div className="md:col-span-2">
                                <Button type="submit" className="w-full">
                                  <Plus className="h-4 w-4 mr-2" />
                                  Rakip Ekle
                                </Button>
                              </div>
                            </form>
                          </CardContent>
                        </Card>

                        {/* Özellik Ekleme */}
                        <Card className="bg-green-50 border border-green-200">
                          <CardHeader>
                            <CardTitle className="text-green-700">Karşılaştırma Özelliği Ekle</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              const formData = new FormData(e.target as HTMLFormElement);
                              const feature = formData.get('feature') as string;
                              
                              if (feature.trim()) {
                                addFeature(feature);
                                (e.target as HTMLFormElement).reset();
                              }
                            }} className="flex gap-2">
                              <Input 
                                name="feature" 
                                placeholder="Karşılaştırılacak özellik..." 
                                className="flex-1"
                                required 
                              />
                              <Button type="submit">
                                <Plus className="h-4 w-4 mr-2" />
                                Ekle
                              </Button>
                            </form>
                          </CardContent>
                        </Card>

                        {/* Karşılaştırma Tablosu */}
                        {(competitorData.competitors.length > 0 || competitorData.features.some(f => f.trim())) && (
                          <Card>
                            <CardHeader>
                              <CardTitle>Rakip Karşılaştırma Tablosu</CardTitle>
                              <CardDescription>Her özellik için 10 üzerinden puan verin</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                  <thead>
                                    <tr className="border-b-2">
                                      <th className="text-left p-3 bg-muted font-semibold">Özellikler</th>
                                      <th className="text-center p-3 bg-blue-100 font-semibold">İntime</th>
                                      {competitorData.competitors.map((competitor) => (
                                        <th key={competitor.id} className="text-center p-3 bg-muted font-semibold">
                                          {competitor.name}
                                        </th>
                                      ))}
                                      <th className="text-center p-3 bg-orange-100 font-semibold">Toplam</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {competitorData.features.map((feature, index) => 
                                      feature.trim() && (
                                        <tr key={index} className="border-b">
                                          <td className="p-3 font-medium bg-muted/50">{feature}</td>
                                          <td className="p-2 text-center">
                                            <Input
                                              type="number"
                                              min="0"
                                              max="10"
                                              value={competitorData.comparisonTable[feature]?.['İntime'] || ''}
                                              onChange={(e) => updateComparisonScore(feature, 'İntime', e.target.value)}
                                              className="w-16 text-center"
                                              placeholder="0-10"
                                            />
                                          </td>
                                          {competitorData.competitors.map((competitor) => (
                                            <td key={competitor.id} className="p-2 text-center">
                                              <Input
                                                type="number"
                                                min="0"
                                                max="10"
                                                value={competitorData.comparisonTable[feature]?.[competitor.name] || ''}
                                                onChange={(e) => updateComparisonScore(feature, competitor.name, e.target.value)}
                                                className="w-16 text-center"
                                                placeholder="0-10"
                                              />
                                            </td>
                                          ))}
                                          <td className="p-3 text-center font-semibold bg-orange-50">
                                            {Number(calculateRowTotal(feature)).toFixed(1)}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                    {competitorData.features.some(f => f.trim()) && (
                                      <tr className="border-t-2 bg-orange-50">
                                        <td className="p-3 font-semibold">TOPLAM</td>
                                        <td className="p-3 text-center font-semibold">
                                          {Number(calculateColumnTotal('İntime')).toFixed(1)}
                                        </td>
                                        {competitorData.competitors.map((competitor) => (
                                          <td key={competitor.id} className="p-3 text-center font-semibold">
                                            {Number(calculateColumnTotal(competitor.name)).toFixed(1)}
                                          </td>
                                        ))}
                                        <td className="p-3 text-center font-semibold">
                                          {Number(calculateColumnTotal('İntime') + 
                                            competitorData.competitors.reduce((sum, comp) => 
                                              sum + calculateColumnTotal(comp.name), 0)
                                          ).toFixed(1)}
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* Rakip Bilgileri Düzenleme */}
                        {competitorData.competitors.length > 0 && (
                          <Card>
                            <CardHeader>
                              <CardTitle>Rakip Bilgilerini Düzenle</CardTitle>
                              <CardDescription>Eklediğiniz rakiplerin bilgilerini buradan düzenleyebilirsiniz</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {competitorData.competitors.map((competitor) => (
                                  <div key={competitor.id} className="p-4 border rounded-lg bg-muted/30">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium mb-1 block">Rakip Adı</label>
                                        <Input
                                          value={competitor.name}
                                          onChange={(e) => updateCompetitor(competitor.id, 'name', e.target.value)}
                                          placeholder="Rakip adını girin..."
                                        />
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium mb-1 block">Sosyal Medya Adresi</label>
                                        <Input
                                          value={competitor.socialMedia}
                                          onChange={(e) => updateCompetitor(competitor.id, 'socialMedia', e.target.value)}
                                          placeholder="Sosyal medya linki..."
                                        />
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium mb-1 block">LinkedIn Adresi</label>
                                        <Input
                                          value={competitor.linkedin}
                                          onChange={(e) => updateCompetitor(competitor.id, 'linkedin', e.target.value)}
                                          placeholder="LinkedIn profil linki..."
                                        />
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium mb-1 block">Web Adresi</label>
                                        <Input
                                          value={competitor.website}
                                          onChange={(e) => updateCompetitor(competitor.id, 'website', e.target.value)}
                                          placeholder="Website URL'si..."
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    )}

                    {/* Diğer analiz bölümleri için varsayılan görünüm */}
                    {item.id !== 'swot' && item.id !== 'goals' && item.id !== 'target' && item.id !== 'competitor' && item.files.length === 0 && (
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
                    )}

                    {item.files.length > 0 && (
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
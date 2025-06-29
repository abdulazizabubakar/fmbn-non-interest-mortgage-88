
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Star, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Target,
  Eye
} from 'lucide-react';
import { mockPerformanceMetrics, mockPartners } from '@/data/mockDeveloperData';
import { PerformanceMetrics } from '@/types/developer';

interface PerformanceScoringProps {
  searchTerm: string;
}

const PerformanceScoring: React.FC<PerformanceScoringProps> = ({ searchTerm }) => {
  const [performanceData] = useState<PerformanceMetrics[]>(mockPerformanceMetrics);

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 4.5) return 'bg-green-100 text-green-800';
    if (score >= 3.5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: 'Avg Performance', value: '4.2', suffix: '/5.0', icon: Star },
          { label: 'Top Performers', value: '12', suffix: '', icon: TrendingUp },
          { label: 'Need Improvement', value: '3', suffix: '', icon: AlertTriangle },
          { label: 'Under Review', value: '5', suffix: '', icon: Clock }
        ].map((stat, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {stat.value}
                    <span className="text-sm text-muted-foreground ml-1">{stat.suffix}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Leaderboard */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Partner Performance Scorecard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {performanceData.map((metrics) => {
              const partner = mockPartners.find(p => p.id === metrics.partnerId);
              if (!partner) return null;

              return (
                <div
                  key={metrics.partnerId}
                  className="border rounded-lg p-6 hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="space-y-1">
                          <h3 className="text-lg font-medium">{partner.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">
                            {partner.type} • Last updated: {metrics.lastUpdated}
                          </p>
                        </div>
                        <Badge className={getScoreBadgeColor(metrics.overallScore)}>
                          {metrics.overallScore.toFixed(1)} ★
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>

                    {/* Score Breakdown */}
                    <div className="grid gap-4 md:grid-cols-4">
                      {[
                        { label: 'Timeliness', score: metrics.timelinessScore, icon: Clock },
                        { label: 'Quality', score: metrics.qualityScore, icon: CheckCircle },
                        { label: 'Compliance', score: metrics.complianceScore, icon: Target },
                        { label: 'Customer Satisfaction', score: metrics.customerSatisfaction, icon: Star }
                      ].map((metric, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <metric.icon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">{metric.label}</span>
                            </div>
                            <span className={`font-bold ${getScoreColor(metric.score)}`}>
                              {metric.score.toFixed(1)}
                            </span>
                          </div>
                          <Progress value={(metric.score / 5) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>

                    {/* Project Stats */}
                    <div className="grid gap-4 md:grid-cols-3 bg-muted/50 rounded-lg p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{metrics.totalProjects}</p>
                        <p className="text-sm text-muted-foreground">Total Projects</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{metrics.onTimeDeliveries}</p>
                        <p className="text-sm text-muted-foreground">On-Time Deliveries</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{metrics.averageDelay.toFixed(1)}</p>
                        <p className="text-sm text-muted-foreground">Avg Delay (Days)</p>
                      </div>
                    </div>

                    {/* Performance Indicators */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4 text-sm">
                        <span className="flex items-center space-x-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span>{Math.round((metrics.onTimeDeliveries / metrics.totalProjects) * 100)}% On-Time</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span>{metrics.delayedProjects} Delayed</span>
                        </span>
                      </div>
                      
                      {metrics.overallScore >= 4.5 && (
                        <Badge className="bg-gold-100 text-gold-800">
                          Top Performer
                        </Badge>
                      )}
                      {metrics.overallScore < 3.0 && (
                        <Badge className="bg-red-100 text-red-800">
                          Needs Improvement
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceScoring;

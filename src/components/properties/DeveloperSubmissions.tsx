
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface DeveloperSubmissionsProps {
  searchQuery?: string;
}

const DeveloperSubmissions: React.FC<DeveloperSubmissionsProps> = ({ searchQuery }) => {
  // Mock submissions data
  const submissions = [
    {
      id: "SUB-2023-001",
      developerName: "Unity Homes Ltd.",
      projectName: "Unity Garden Estate",
      location: "Lagos",
      units: 24,
      submitDate: "2023-04-10",
      status: "approved",
      progress: 65,
    },
    {
      id: "SUB-2023-002",
      developerName: "Kabash Developers",
      projectName: "Harmony Heights",
      location: "Abuja",
      units: 18,
      submitDate: "2023-04-15",
      status: "pending-review",
      progress: 0,
    },
    {
      id: "SUB-2023-003",
      developerName: "Northern Housing",
      projectName: "Peace Gardens",
      location: "Kano",
      units: 42,
      submitDate: "2023-04-20",
      status: "approved",
      progress: 30,
    },
    {
      id: "SUB-2023-004",
      developerName: "Adkan Properties",
      projectName: "Green Valley Homes",
      location: "Rivers",
      units: 36,
      submitDate: "2023-04-25",
      status: "rejected",
      progress: 0,
    },
  ];

  // Filter submissions based on search query
  const filteredSubmissions = searchQuery 
    ? submissions.filter(submission => 
        submission.developerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : submissions;

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved': return <Badge variant="default">Approved</Badge>;
      case 'pending-review': return <Badge variant="outline">Pending Review</Badge>;
      case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Developer Submissions</CardTitle>
          <CardDescription>
            Track property submissions from developers and construction progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Submission ID</TableHead>
                <TableHead>Developer</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.id}</TableCell>
                  <TableCell>{submission.developerName}</TableCell>
                  <TableCell>{submission.projectName}</TableCell>
                  <TableCell>{submission.location}</TableCell>
                  <TableCell>{submission.units}</TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell>
                    <div className="w-full space-y-1">
                      <Progress 
                        value={submission.progress} 
                        className="h-2" 
                        style={{"--progress-background": 
                          submission.progress >= 75 ? "#10B981" : 
                          submission.progress >= 50 ? "#3B82F6" : 
                          submission.progress >= 25 ? "#F59E0B" : "#6B7280"
                        } as React.CSSProperties}
                      />
                      <p className="text-xs text-muted-foreground text-right">{submission.progress}%</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      {submission.status === 'pending-review' && (
                        <Button size="sm">Review</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperSubmissions;

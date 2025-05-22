
// Analytics and reporting types
export interface IconData {
  icon: any; // Using any for simplicity, ideally would be a more specific Lucide icon type
  className: string;
}

export interface StatCard {
  title: string;
  value: string | number;
  change?: number;
  icon: IconData;
}

export interface ChartData {
  name: string;
  value: number;
}

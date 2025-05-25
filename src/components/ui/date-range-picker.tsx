
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  date?: DateRange | undefined;
  setDate: (value: DateRange | undefined) => void;
  placeholder?: string;
  align?: "start" | "center" | "end";
  showCompare?: boolean;
}

// Export both DateRangePicker for backward compatibility and DateRange as the component
export function DateRangePicker({
  date,
  setDate,
  placeholder = "Select date range",
  align = "start",
  showCompare = true,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Handle predefined date ranges
  const handlePredefinedRange = (days: number) => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - days);
    
    setDate({ from, to });
  };

  return (
    <div className="grid gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            size="sm"
            className={cn(
              "w-full justify-start text-left font-normal h-10",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              placeholder
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <div className="px-4 pt-4 pb-2 flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handlePredefinedRange(7)}
            >
              Last 7 days
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handlePredefinedRange(30)}
            >
              Last 30 days
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handlePredefinedRange(90)}
            >
              Last 90 days
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setDate(undefined)}
            >
              Clear
            </Button>
          </div>
          <div className="p-4 space-y-2">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(selected) => {
                setDate(selected);
                if (selected?.from && selected.to) {
                  setIsOpen(false);
                }
              }}
              numberOfMonths={2}
              className="pointer-events-auto"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Export DateRange component for existing code that uses it
export function DateRange({
  value,
  onValueChange,
  className,
  placeholder = "Select date range",
  align = "start",
}: {
  value?: DateRange | undefined;
  onValueChange: (value: DateRange | undefined) => void;
  className?: string;
  placeholder?: string;
  align?: "start" | "center" | "end";
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <DateRangePicker
        date={value}
        setDate={onValueChange}
        placeholder={placeholder}
        align={align}
      />
    </div>
  );
}

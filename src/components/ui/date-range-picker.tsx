
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

interface DateRangePickerProps {
  value?: { from: Date; to: Date } | undefined;
  onValueChange: (value: { from: Date; to: Date } | undefined) => void;
  className?: string;
  placeholder?: string;
  align?: "start" | "center" | "end";
}

export function DateRange({
  value,
  onValueChange,
  className,
  placeholder = "Select date range",
  align = "start",
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Handle predefined date ranges
  const handlePredefinedRange = (days: number) => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - days);
    
    onValueChange({ from, to });
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            size="sm"
            className={cn(
              "w-full justify-start text-left font-normal h-10",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, y")} - {format(value.to, "LLL dd, y")}
                </>
              ) : (
                format(value.from, "LLL dd, y")
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
              onClick={() => onValueChange(undefined)}
            >
              Clear
            </Button>
          </div>
          <div className="p-4 space-y-2">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={value?.from}
              selected={{
                from: value?.from || undefined,
                to: value?.to || undefined,
              }}
              onSelect={(selected) => {
                if (selected?.from && selected.to) {
                  onValueChange({ 
                    from: selected.from, 
                    to: selected.to
                  });
                  setIsOpen(false);
                } else if (selected?.from) {
                  onValueChange({ 
                    from: selected.from, 
                    to: selected.from 
                  });
                }
              }}
              numberOfMonths={2}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

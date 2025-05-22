
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  showCompare?: boolean;
}

export function DateRangePicker({
  date,
  setDate,
  className,
  showCompare = true,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            size={"sm"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate);
              if (newDate?.to) {
                setIsOpen(false);
              }
            }}
            numberOfMonths={2}
          />
          <div className="flex items-center justify-between p-3 border-t">
            <div className="flex gap-2 flex-wrap">
              {showCompare && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const today = new Date();
                      const from = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate() - 30
                      );
                      const to = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate()
                      );
                      setDate({ from, to });
                      setIsOpen(false);
                    }}
                  >
                    Last 30 days
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const today = new Date();
                      const from = new Date(
                        today.getFullYear(),
                        today.getMonth() - 3,
                        today.getDate()
                      );
                      const to = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate()
                      );
                      setDate({ from, to });
                      setIsOpen(false);
                    }}
                  >
                    Last 90 days
                  </Button>
                </>
              )}
              
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  setDate(undefined);
                  setIsOpen(false);
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

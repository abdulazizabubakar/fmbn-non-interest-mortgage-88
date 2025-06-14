
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Search, FileText, Users, Home, Settings, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onOpenChange }) => {
  const [searchValue, setSearchValue] = useState('');

  // Sample commands - in real app, these would come from your app's functionality
  const commands = [
    {
      group: 'Navigation',
      items: [
        { id: 'dashboard', title: 'Go to Dashboard', icon: Home, shortcut: '⌘D' },
        { id: 'customers', title: 'View Customers', icon: Users, shortcut: '⌘U' },
        { id: 'applications', title: 'Applications', icon: FileText, shortcut: '⌘A' },
        { id: 'settings', title: 'Settings', icon: Settings, shortcut: '⌘,' },
      ]
    },
    {
      group: 'Actions',
      items: [
        { id: 'new-app', title: 'New Application', icon: FileText, shortcut: '⌘N' },
        { id: 'calculator', title: 'Mortgage Calculator', icon: Calculator, shortcut: '⌘C' },
        { id: 'search', title: 'Global Search', icon: Search, shortcut: '⌘K' },
      ]
    }
  ];

  // Filter commands based on search
  const filteredCommands = commands.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-2xl">
        <Command className="rounded-lg border-0 shadow-lg">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Type a command or search..."
              value={searchValue}
              onValueChange={setSearchValue}
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0"
            />
            <Badge variant="outline" className="ml-2 text-xs">
              ⌘K
            </Badge>
          </div>
          
          <CommandList className="max-h-[300px] overflow-y-auto">
            {filteredCommands.length === 0 && searchValue && (
              <CommandEmpty className="py-6 text-center text-sm">
                No results found for "{searchValue}"
              </CommandEmpty>
            )}
            
            {filteredCommands.map((group) => (
              <CommandGroup key={group.group} heading={group.group}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    className="flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-accent rounded-sm"
                    onSelect={() => {
                      console.log(`Executing command: ${item.id}`);
                      onOpenChange(false);
                    }}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {item.shortcut}
                    </Badge>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export { CommandPalette };

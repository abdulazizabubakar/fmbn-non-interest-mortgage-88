
import React, { useState } from 'react';
import { Mail, User, Search, Star, Trash, Paperclip, MoreHorizontal, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockMessages } from '@/data/mockMessages';
import { Message } from '@/types/messages';

const InboxMessages = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = messages.filter(message => 
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectMessage = (id: string) => {
    setSelectedMessages(prev => 
      prev.includes(id)
        ? prev.filter(messageId => messageId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredMessages.map(message => message.id));
    }
  };

  const markAsRead = (ids: string[]) => {
    setMessages(prev => 
      prev.map(message => 
        ids.includes(message.id)
          ? { ...message, read: true }
          : message
      )
    );
  };

  const markAsUnread = (ids: string[]) => {
    setMessages(prev => 
      prev.map(message => 
        ids.includes(message.id)
          ? { ...message, read: false }
          : message
      )
    );
  };

  const toggleStarred = (id: string) => {
    setMessages(prev => 
      prev.map(message => 
        message.id === id
          ? { ...message, starred: !message.starred }
          : message
      )
    );
  };

  const deleteMessages = (ids: string[]) => {
    setMessages(prev => prev.filter(message => !ids.includes(message.id)));
    setSelectedMessages(prev => prev.filter(id => !ids.includes(id)));
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {selectedMessages.length > 0 && (
        <div className="flex items-center space-x-2 bg-muted p-2 rounded-md">
          <span className="text-sm text-muted-foreground">{selectedMessages.length} selected</span>
          <Button variant="ghost" size="sm" onClick={() => markAsRead(selectedMessages)}>
            Mark as Read
          </Button>
          <Button variant="ghost" size="sm" onClick={() => markAsUnread(selectedMessages)}>
            Mark as Unread
          </Button>
          <Button variant="ghost" size="sm" onClick={() => deleteMessages(selectedMessages)}>
            Delete
          </Button>
        </div>
      )}
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox 
                  checked={
                    filteredMessages.length > 0 &&
                    selectedMessages.length === filteredMessages.length
                  }
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[40px]">⭐</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="w-[60px]">Attachment</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="w-[40px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <TableRow key={message.id} className={!message.read ? 'bg-muted/30 font-medium' : ''}>
                  <TableCell>
                    <Checkbox
                      checked={selectedMessages.includes(message.id)}
                      onCheckedChange={() => toggleSelectMessage(message.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => toggleStarred(message.id)}
                    >
                      <Star 
                        className={`h-4 w-4 ${message.starred ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} 
                      />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <User className="h-4 w-4" />
                      </Avatar>
                      <span>{message.sender.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{message.subject}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[300px]">
                      {message.content}
                    </div>
                  </TableCell>
                  <TableCell>
                    {message.hasAttachment && <Paperclip className="h-4 w-4" />}
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {new Date(message.timestamp).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => markAsRead([message.id])}>
                          Mark as Read
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => markAsUnread([message.id])}>
                          Mark as Unread
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toggleStarred(message.id)}>
                          {message.starred ? 'Remove Star' : 'Star Message'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => deleteMessages([message.id])}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Mail className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No messages found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InboxMessages;

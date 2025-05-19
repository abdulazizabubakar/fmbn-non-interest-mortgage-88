
export interface MessageSender {
  id: string;
  name: string;
  email: string;
}

export interface Message {
  id: string;
  sender: MessageSender;
  recipients: string[];
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  hasAttachment: boolean;
  category: string;
}

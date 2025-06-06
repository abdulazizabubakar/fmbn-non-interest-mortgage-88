
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Search, X, Filter, Clock, User, FileText, Home, CreditCard } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  type: 'customer' | 'application' | 'property' | 'mortgage' | 'payment';
  description: string;
  url: string;
}

interface SmartSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SmartSearchBar: React.FC<SmartSearchBarProps> = ({
  placeholder = "Search customers, applications, properties...",
  onSearch,
  className
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Mohammed Ibrahim',
    'APP-2023-001',
    'Abuja Properties',
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Mohammed Ibrahim',
      type: 'customer',
      description: 'Customer ID: CUST-2023-001',
      url: '/customers/1'
    },
    {
      id: '2',
      title: 'APP-2023-456',
      type: 'application',
      description: 'Pending Review - ₦25,000,000',
      url: '/applications/456'
    },
    {
      id: '3',
      title: 'Asokoro Heights Unit 12B',
      type: 'property',
      description: 'Available - FCT Abuja',
      url: '/properties/12b'
    },
  ];

  const typeIcons = {
    customer: <User className="h-4 w-4" />,
    application: <FileText className="h-4 w-4" />,
    property: <Home className="h-4 w-4" />,
    mortgage: <CreditCard className="h-4 w-4" />,
    payment: <CreditCard className="h-4 w-4" />
  };

  const typeColors = {
    customer: 'bg-blue-100 text-blue-700 border-blue-200',
    application: 'bg-purple-100 text-purple-700 border-purple-200',
    property: 'bg-green-100 text-green-700 border-green-200',
    mortgage: 'bg-orange-100 text-orange-700 border-orange-200',
    payment: 'bg-pink-100 text-pink-700 border-pink-200'
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Simulate search
      setResults(mockResults.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      ));
      
      // Add to recent searches
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
      }
      
      onSearch?.(searchQuery);
    } else {
      setResults([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    handleSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const selectResult = (result: SearchResult) => {
    setQuery(result.title);
    setIsOpen(false);
    // Navigate to result URL
    console.log('Navigate to:', result.url);
  };

  const selectRecentSearch = (search: string) => {
    setQuery(search);
    handleSearch(search);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn('relative w-full max-w-2xl', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="pl-10 pr-20 h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto animate-fade-in">
          {query && results.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                Search Results
              </div>
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => selectResult(result)}
                  className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded-md transition-colors flex items-center space-x-3"
                >
                  <div className={cn('p-2 rounded-full', typeColors[result.type])}>
                    {typeIcons[result.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">{result.title}</div>
                    <div className="text-sm text-gray-500 truncate">{result.description}</div>
                  </div>
                  <Badge variant="outline" className={typeColors[result.type]}>
                    {result.type}
                  </Badge>
                </button>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <div className="text-sm">No results found for "{query}"</div>
              <div className="text-xs text-gray-400 mt-1">Try different keywords or check spelling</div>
            </div>
          )}

          {!query && recentSearches.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => selectRecentSearch(search)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md transition-colors flex items-center space-x-3"
                >
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{search}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { SmartSearchBar };

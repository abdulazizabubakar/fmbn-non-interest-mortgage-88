
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Code, Copy, Search, BookOpen, FileText } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const ApiDocumentation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('introduction');

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      description: "Code copied to clipboard",
    });
  };

  const endpoints = [
    {
      name: 'List All Documents',
      method: 'GET',
      path: '/api/v1/documents',
      description: 'Returns a paginated list of all documents',
      parameters: [
        { name: 'limit', type: 'integer', description: 'Maximum number of results to return' },
        { name: 'offset', type: 'integer', description: 'Number of results to skip' },
        { name: 'status', type: 'string', description: 'Filter by document status' }
      ],
      responses: {
        '200': {
          description: 'A list of documents',
          example: `{
  "data": [
    {
      "id": "doc_123",
      "title": "Property Deed",
      "uploadedBy": "user_456",
      "status": "verified",
      "uploadDate": "2024-05-01T12:34:56Z"
    },
    {
      "id": "doc_124",
      "title": "ID Card",
      "uploadedBy": "user_789",
      "status": "pending",
      "uploadDate": "2024-05-02T09:12:34Z"
    }
  ],
  "meta": {
    "total": 120,
    "limit": 10,
    "offset": 0
  }
}`
        },
        '401': {
          description: 'Unauthorized',
          example: `{
  "error": {
    "code": "unauthorized",
    "message": "API key is missing or invalid"
  }
}`
        }
      }
    },
    {
      name: 'Create Document',
      method: 'POST',
      path: '/api/v1/documents',
      description: 'Creates a new document record',
      parameters: [],
      requestBody: {
        description: 'Document object that needs to be created',
        example: `{
  "title": "Birth Certificate",
  "description": "Customer birth certificate",
  "category": "kyc",
  "ownerId": "user_123",
  "metadata": {
    "expiryDate": "2030-01-01",
    "issuedBy": "National Registry"
  }
}`
      },
      responses: {
        '201': {
          description: 'Document created successfully',
          example: `{
  "data": {
    "id": "doc_125",
    "title": "Birth Certificate",
    "status": "pending",
    "uploadDate": "2024-05-19T10:11:12Z"
  }
}`
        },
        '400': {
          description: 'Bad Request',
          example: `{
  "error": {
    "code": "validation_error",
    "message": "The title field is required"
  }
}`
        }
      }
    }
  ];

  const filteredEndpoints = endpoints.filter(endpoint => 
    endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    endpoint.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search API documentation..."
            className="w-full pl-10 p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="introduction">Introduction</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="introduction" className="space-y-4">
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold">NIMMS API Documentation</h2>
            <p>
              The NIMMS API provides programmatic access to the National Islamic Mortgage Management System. 
              With this API, you can integrate NIMMS functionality into your own applications.
            </p>
            <h3 className="text-lg font-semibold mt-4">Base URL</h3>
            <div className="bg-muted p-3 rounded-md flex items-center justify-between">
              <code>https://api.nimms.gov.ng/v1</code>
              <Button variant="ghost" size="sm" onClick={() => handleCopyCode('https://api.nimms.gov.ng/v1')}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="text-lg font-semibold mt-4">API Versioning</h3>
            <p>
              The NIMMS API is versioned using URL path versioning. The current version is v1.
            </p>
            <h3 className="text-lg font-semibold mt-4">Rate Limiting</h3>
            <p>
              The API has rate limiting to protect against abuse. By default, each API key is limited to 100 requests per minute.
              If you exceed this limit, you'll receive a 429 Too Many Requests response.
            </p>
            <h3 className="text-lg font-semibold mt-4">Support</h3>
            <p>
              If you need help with the API, please contact the NIMMS technical support team at 
              <a href="mailto:api-support@nimms.gov.ng" className="text-blue-600 ml-1">api-support@nimms.gov.ng</a>.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-4">
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold">Authentication</h2>
            <p>
              The NIMMS API uses API keys for authentication. Your API key should be included in the header of each request.
            </p>
            <h3 className="text-lg font-semibold mt-4">API Key Header</h3>
            <div className="bg-muted p-3 rounded-md flex items-center justify-between">
              <code>Authorization: Bearer YOUR_API_KEY</code>
              <Button variant="ghost" size="sm" onClick={() => handleCopyCode('Authorization: Bearer YOUR_API_KEY')}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="text-lg font-semibold mt-4">Obtaining an API Key</h3>
            <p>
              API keys can be obtained from the Integrations module in your NIMMS account. Only authorized users with administrator 
              privileges can generate API keys.
            </p>
            <h3 className="text-lg font-semibold mt-4">API Key Security</h3>
            <p>
              Keep your API key secure and do not share it publicly. If you believe your API key has been compromised, 
              regenerate it immediately from the Integrations module.
            </p>
            <h3 className="text-lg font-semibold mt-4">Example Request</h3>
            <div className="bg-muted p-3 rounded-md overflow-x-auto">
              <pre className="text-sm">
{`curl -X GET "https://api.nimms.gov.ng/v1/documents" \\
-H "Authorization: Bearer YOUR_API_KEY" \\
-H "Content-Type: application/json"`}
              </pre>
              <Button variant="ghost" size="sm" className="float-right -mt-8 mr-1" onClick={() => handleCopyCode(`curl -X GET "https://api.nimms.gov.ng/v1/documents" \\
-H "Authorization: Bearer YOUR_API_KEY" \\
-H "Content-Type: application/json"`)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">API Endpoints</h2>
            <span className="text-sm text-muted-foreground">
              Showing {filteredEndpoints.length} of {endpoints.length} endpoints
            </span>
          </div>

          {filteredEndpoints.length > 0 ? (
            filteredEndpoints.map((endpoint, index) => (
              <div key={index} className="border rounded-md overflow-hidden">
                <div className={`p-3 flex items-center justify-between ${
                  endpoint.method === 'GET' ? 'bg-blue-50 border-b border-blue-100' : 
                  endpoint.method === 'POST' ? 'bg-green-50 border-b border-green-100' : 
                  endpoint.method === 'PUT' ? 'bg-amber-50 border-b border-amber-100' : 
                  'bg-red-50 border-b border-red-100'
                }`}>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      endpoint.method === 'GET' ? 'bg-blue-500 text-white' : 
                      endpoint.method === 'POST' ? 'bg-green-500 text-white' : 
                      endpoint.method === 'PUT' ? 'bg-amber-500 text-white' : 
                      'bg-red-500 text-white'
                    }`}>
                      {endpoint.method}
                    </span>
                    <span className="font-mono">{endpoint.path}</span>
                  </div>
                  <span className="text-sm font-medium">{endpoint.name}</span>
                </div>
                
                <div className="p-4">
                  <p className="text-sm mb-4">{endpoint.description}</p>
                  
                  {endpoint.parameters.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Parameters</h4>
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr>
                            <th className="text-left py-2 px-3 bg-muted">Name</th>
                            <th className="text-left py-2 px-3 bg-muted">Type</th>
                            <th className="text-left py-2 px-3 bg-muted">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {endpoint.parameters.map((param, i) => (
                            <tr key={i} className="border-t">
                              <td className="py-2 px-3 font-mono">{param.name}</td>
                              <td className="py-2 px-3">{param.type}</td>
                              <td className="py-2 px-3">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  {endpoint.requestBody && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Request Body</h4>
                      <p className="text-sm mb-2">{endpoint.requestBody.description}</p>
                      <div className="bg-muted p-3 rounded-md overflow-x-auto relative">
                        <pre className="text-sm">{endpoint.requestBody.example}</pre>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2"
                          onClick={() => handleCopyCode(endpoint.requestBody.example)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Responses</h4>
                    <div className="space-y-3">
                      {Object.entries(endpoint.responses).map(([status, response]: [string, any], i) => (
                        <div key={i} className="border rounded-md overflow-hidden">
                          <div className={`p-2 text-sm font-medium ${
                            status.startsWith('2') ? 'bg-green-50 border-b border-green-100' : 
                            status.startsWith('4') ? 'bg-red-50 border-b border-red-100' : 
                            'bg-amber-50 border-b border-amber-100'
                          }`}>
                            {status} - {response.description}
                          </div>
                          <div className="bg-muted p-3 overflow-x-auto relative">
                            <pre className="text-sm">{response.example}</pre>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="absolute top-2 right-2"
                              onClick={() => handleCopyCode(response.example)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-muted rounded-md">
              <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-medium">No endpoints found</h4>
              <p className="text-muted-foreground">
                Try adjusting your search terms
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold">Code Examples</h2>
            <p>
              Below are code examples demonstrating how to use the NIMMS API in various programming languages.
            </p>
            
            <h3 className="text-lg font-semibold mt-4">JavaScript (Node.js)</h3>
            <div className="bg-muted p-3 rounded-md overflow-x-auto relative">
              <pre className="text-sm">
{`const axios = require('axios');

// Configure API key
const apiKey = 'YOUR_API_KEY';

// Function to fetch documents
async function getDocuments() {
  try {
    const response = await axios.get('https://api.nimms.gov.ng/v1/documents', {
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Documents:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error.response?.data || error.message);
    throw error;
  }
}

getDocuments();`}
              </pre>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-2 right-2"
                onClick={() => handleCopyCode(`const axios = require('axios');

// Configure API key
const apiKey = 'YOUR_API_KEY';

// Function to fetch documents
async function getDocuments() {
  try {
    const response = await axios.get('https://api.nimms.gov.ng/v1/documents', {
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Documents:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error.response?.data || error.message);
    throw error;
  }
}

getDocuments();`)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <h3 className="text-lg font-semibold mt-4">Python</h3>
            <div className="bg-muted p-3 rounded-md overflow-x-auto relative">
              <pre className="text-sm">
{`import requests

# Configure API key
api_key = 'YOUR_API_KEY'

# Function to fetch documents
def get_documents():
    url = 'https://api.nimms.gov.ng/v1/documents'
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise exception for 4XX/5XX responses
        
        print('Documents:', response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f'Error fetching documents: {str(e)}')
        raise

get_documents()`}
              </pre>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-2 right-2"
                onClick={() => handleCopyCode(`import requests

# Configure API key
api_key = 'YOUR_API_KEY'

# Function to fetch documents
def get_documents():
    url = 'https://api.nimms.gov.ng/v1/documents'
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise exception for 4XX/5XX responses
        
        print('Documents:', response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f'Error fetching documents: {str(e)}')
        raise

get_documents()`)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <h3 className="text-lg font-semibold mt-4">PHP</h3>
            <div className="bg-muted p-3 rounded-md overflow-x-auto relative">
              <pre className="text-sm">
{`<?php
// Configure API key
$apiKey = 'YOUR_API_KEY';

// Function to fetch documents
function getDocuments() {
    $url = 'https://api.nimms.gov.ng/v1/documents';
    $headers = [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json'
    ];
    
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    
    $response = curl_exec($curl);
    $err = curl_error($curl);
    
    curl_close($curl);
    
    if ($err) {
        echo 'Error fetching documents: ' . $err;
        return false;
    } else {
        $result = json_decode($response, true);
        echo 'Documents: ' . print_r($result, true);
        return $result;
    }
}

getDocuments();
?>`}
              </pre>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-2 right-2"
                onClick={() => handleCopyCode(`<?php
// Configure API key
$apiKey = 'YOUR_API_KEY';

// Function to fetch documents
function getDocuments() {
    $url = 'https://api.nimms.gov.ng/v1/documents';
    $headers = [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json'
    ];
    
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    
    $response = curl_exec($curl);
    $err = curl_error($curl);
    
    curl_close($curl);
    
    if ($err) {
        echo 'Error fetching documents: ' . $err;
        return false;
    } else {
        $result = json_decode($response, true);
        echo 'Documents: ' . print_r($result, true);
        return $result;
    }
}

getDocuments();
?>`)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiDocumentation;

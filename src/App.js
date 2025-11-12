import { useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';

// Function to parse the AI response and format it nicely
const parseAIResponse = (text, copyToClipboard, copiedIndex) => {
  if (!text) return "";
  
  // Split by double newlines to get sections
  const sections = text.split('\n\n');
  
  const colors = [
    { 
      bg: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100', 
      border: 'border-blue-300/50', 
      header: 'text-blue-800', 
      icon: '💡',
      glow: 'shadow-blue-200/50'
    },
    { 
      bg: 'bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100', 
      border: 'border-purple-300/50', 
      header: 'text-purple-800', 
      icon: '🎭',
      glow: 'shadow-purple-200/50'
    },
    { 
      bg: 'bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100', 
      border: 'border-emerald-300/50', 
      header: 'text-emerald-800', 
      icon: '🌟',
      glow: 'shadow-emerald-200/50'
    },
  ];
  
  let colorIndex = 0;
  
  return sections.map((section, index) => {
    // Handle bold headers like **Improved Clarity**
    if (section.startsWith('**') && section.includes('**')) {
      const title = section.match(/\*\*(.*?)\*\*/)?.[1] || '';
      const content = section.replace(/\*\*(.*?)\*\*/, '').trim();
      const color = colors[colorIndex % colors.length];
      
      // Extract the main text (non-italic part)
      const lines = content.split('\n');
      const mainText = lines.find(line => line.trim() && !line.startsWith('*'));
      
      colorIndex++;
      
      return (
        <Card key={index} className="border-0 rounded-3 shadow-sm h-100" style={{
          background: color.bg.replace('bg-gradient-to-br', 'linear-gradient(135deg,').replace('from-', '').replace('via-', ', ').replace('to-', ', ').replace(' ', ''),
          transform: 'translateY(0)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        }}>
          <Card.Body className="p-3">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <Card.Title className={`${color.header} fw-bold h6 d-flex align-items-center mb-0`}>
                <span className="me-2" style={{fontSize: '1.2rem'}}>{color.icon}</span>
                {title}
              </Card.Title>
              {mainText && (
                <Button
                  onClick={() => copyToClipboard(mainText, index)}
                  size="sm"
                  className={`border-0 rounded-2 px-2 py-1 fw-bold ${
                    copiedIndex === index 
                      ? 'bg-success text-white' 
                      : 'bg-white text-dark shadow-sm'
                  }`}
                  style={{
                    fontSize: '0.75rem',
                    transition: 'all 0.2s ease',
                    transform: copiedIndex === index ? 'scale(0.95)' : 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    if (copiedIndex !== index) {
                      e.target.style.background = 'linear-gradient(45deg, #3b82f6, #8b5cf6)';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (copiedIndex !== index) {
                      e.target.style.background = 'white';
                      e.target.style.color = '#212529';
                      e.target.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {copiedIndex === index ? (
                    <>
                      <span className="me-1">✅</span>
                      Done!
                    </>
                  ) : (
                    <>
                      <span className="me-1">📋</span>
                      Copy
                    </>
                  )}
                </Button>
              )}
            </div>
            
            <div className="d-grid gap-2">
              {content.split('\n').map((line, lineIndex) => {
                if (line.trim() === '') return null;
                
                // Handle italic explanations
                if (line.startsWith('*') && line.endsWith('*')) {
                  return (
                    <Alert key={lineIndex} variant="light" className="border-0 rounded-2 p-2 mb-0" style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      fontSize: '0.8rem',
                      lineHeight: '1.4'
                    }}>
                      <div className="d-flex align-items-start">
                        <span className="me-2" style={{fontSize: '0.9rem'}}>💭</span>
                        <em className="text-muted flex-1">{line.slice(1, -1)}</em>
                      </div>
                    </Alert>
                  );
                }
                
                return (
                  <Card key={lineIndex} className="border-0 rounded-2 shadow-sm mb-0" style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(5px)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.transform = 'translateX(3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}>
                    <Card.Body className="p-2">
                      <p className="mb-0 fw-semibold text-dark" style={{fontSize: '0.9rem', lineHeight: '1.5'}}>
                        {line}
                      </p>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </Card.Body>
        </Card>
      );
    }
    
    // Handle other content
    return section.trim() ? (
      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-gray-700">{section}</p>
      </div>
    ) : null;
  }).filter(Boolean);
};

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/text/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }), // Fixed: wrap in object
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json(); // Use json() instead of text()
      setResult(data.improvedText || data.result || JSON.stringify(data));
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Container fluid className="py-3">
        {/* Header */}
        <Row className="justify-content-center text-center mb-3">
          <Col>
            <h1 className="h2 fw-bold mb-2" style={{
              background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              AI Text Polisher ✨
            </h1>
            <p className="text-muted mb-0">Transform your text with AI-powered suggestions</p>
          </Col>
        </Row>

        {/* Main Content - Side by Side Layout */}
        <Row className="g-3 h-100">
          {/* Left Side - Input Section */}
          <Col lg={5} className="d-flex">
            <Card className="shadow-lg border-0 rounded-4 w-100" style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              minHeight: '70vh'
            }}>
              <Card.Body className="p-4 d-flex flex-column">
                <Form className="flex-grow-1 d-flex flex-column">
                  <Form.Group className="flex-grow-1 d-flex flex-column">
                    <Form.Label className="fw-bold text-dark d-flex align-items-center mb-3">
                      <span className="me-2" style={{fontSize: '1.1rem'}}>✍️</span>
                      Enter your text to improve:
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder="Type your message here and watch it transform..."
                      className="border-0 rounded-3 p-3 shadow-sm flex-grow-1"
                      style={{
                        backgroundColor: 'rgba(248, 250, 252, 0.8)',
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        resize: 'none',
                        transition: 'all 0.3s ease',
                        minHeight: '300px'
                      }}
                      onFocus={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.backgroundColor = 'rgba(248, 250, 252, 0.8)';
                        e.target.style.boxShadow = '';
                      }}
                    />
                  </Form.Group>
                  
                  <div className="text-center mt-3">
                    <Button
                      onClick={handleSubmit}
                      disabled={loading || !input.trim()}
                      className="px-4 py-2 border-0 rounded-3 fw-bold shadow-lg w-100"
                      style={{
                        background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        transform: loading ? 'none' : 'translateY(0)',
                      }}
                      onMouseEnter={(e) => {
                        if (!loading && input.trim()) {
                          e.target.style.transform = 'translateY(-2px) scale(1.02)';
                          e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!loading) {
                          e.target.style.transform = 'translateY(0) scale(1)';
                          e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                        }
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          <span>Polishing...</span>
                        </>
                      ) : (
                        <>
                          <span className="me-2">✨</span>
                          Polish My Text
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Side - Results Section */}
          <Col lg={7}>
            {result ? (
              <Card className="shadow-lg border-0 rounded-4 h-100" style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                minHeight: '70vh'
              }}>
                <Card.Header className="text-white text-center py-3 border-0" style={{
                  background: 'linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient 3s ease infinite'
                }}>
                  <h3 className="mb-1 fw-bold d-flex align-items-center justify-content-center">
                    <span className="me-2" style={{fontSize: '1.5rem'}}>🎯</span>
                    AI Suggestions
                  </h3>
                  <small className="opacity-90">Choose the style that fits your needs</small>
                </Card.Header>
                <Card.Body className="p-3 overflow-auto" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(239,246,255,0.6), rgba(245,243,255,0.6))',
                  maxHeight: '65vh'
                }}>
                  <div className="d-grid gap-3">
                    {parseAIResponse(result, copyToClipboard, copiedIndex)}
                  </div>
                </Card.Body>
              </Card>
            ) : (
              <Card className="shadow-lg border-0 rounded-4 h-100 d-flex align-items-center justify-content-center" style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                minHeight: '70vh'
              }}>
                <Card.Body className="text-center">
                  <div style={{fontSize: '4rem', opacity: 0.3}}>🤖</div>
                  <h4 className="text-muted mt-3">Ready to polish your text!</h4>
                  <p className="text-muted">Enter some text on the left and click "Polish My Text" to see AI suggestions here.</p>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
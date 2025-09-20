import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  MapPin, 
  Camera, 
  Upload, 
  Mic, 
  Send, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Smartphone,
  Languages
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ReportForm {
  type: string;
  severity: string;
  location: string;
  description: string;
  images: File[];
  language: string;
  contactInfo: string;
}

export function ReportingInterface() {
  const [formData, setFormData] = useState<ReportForm>({
    type: '',
    severity: '',
    location: '',
    description: '',
    images: [],
    language: 'en',
    contactInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [reports, setReports] = useState<ReportForm[]>([]);
  const [viewReports, setViewReports] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hazardTypes = [
    { value: 'tsunami', label: 'Tsunami Warning', icon: '🌊' },
    { value: 'storm-surge', label: 'Storm Surge', icon: '⛈️' },
    { value: 'abnormal-waves', label: 'Abnormal Waves', icon: '〰️' },
    { value: 'coastal-erosion', label: 'Coastal Erosion', icon: '🏖️' },
    { value: 'flooding', label: 'Coastal Flooding', icon: '💧' },
    { value: 'other', label: 'Other Hazard', icon: '⚠️' }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low - Minor concern', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium - Moderate risk', color: 'bg-yellow-500' },
    { value: 'high', label: 'High - Significant danger', color: 'bg-orange-500' },
    { value: 'critical', label: 'Critical - Immediate threat', color: 'bg-red-500' }
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setReports(prev => [...prev, formData]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const getLocationFromGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  if (viewReports) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">My Reports</CardTitle>
          </CardHeader>
          <CardContent>
            {reports.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                No reports submitted yet.
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((report, idx) => (
                  <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{report.type}</span>
                      <Badge variant={report.severity === 'critical' ? 'destructive' : 'secondary'}>
                        {report.severity}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      <strong>Location:</strong> {report.location}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      <strong>Description:</strong> {report.description}
                    </div>
                    {report.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {report.images.map((file, i) => (
                          <div key={i} className="w-16 h-16 border rounded overflow-hidden">
                            {file.type.startsWith('image') ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <video
                                src={URL.createObjectURL(file)}
                                className="object-cover w-full h-full"
                                controls
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-6 flex justify-center">
              <Button onClick={() => setViewReports(false)}>
                Back to Reporting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl">Report Submitted Successfully!</h2>
              <p className="text-gray-600">
                Thank you for reporting this hazard. Your report has been received and will be verified by our team.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Report ID:</strong> VRN-{Date.now().toString().slice(-6)}
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  You will receive updates via SMS/WhatsApp if you provided contact information.
                </p>
              </div>
              <div className="flex space-x-4 justify-center">
                <Button onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    type: '',
                    severity: '',
                    location: '',
                    description: '',
                    images: [],
                    language: 'en',
                    contactInfo: ''
                  });
                  setCurrentStep(1);
                }}>
                  Submit Another Report
                </Button>
                <Button variant="outline" onClick={() => setViewReports(true)}>
                  View My Reports
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Report Ocean Hazard</h1>
        <p className="text-gray-600">
          Help protect your community by reporting ocean hazards and unusual coastal conditions.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-4 ${
                  currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Hazard Details</span>
          <span>Location & Evidence</span>
          <span>Review & Submit</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Hazard Report Form</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm mb-2 block">Type of Hazard *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {hazardTypes.map((type) => (
                        <Button
                          key={type.value}
                          variant={formData.type === type.value ? "default" : "outline"}
                          className="h-auto p-4 flex-col space-y-2"
                          onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                        >
                          <span className="text-2xl">{type.icon}</span>
                          <span className="text-sm">{type.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Severity Level *</label>
                    <div className="space-y-2">
                      {severityLevels.map((level) => (
                        <Button
                          key={level.value}
                          variant={formData.severity === level.value ? "default" : "outline"}
                          className="w-full justify-start space-x-3"
                          onClick={() => setFormData(prev => ({ ...prev, severity: level.value }))}
                        >
                          <div className={`w-4 h-4 rounded-full ${level.color}`}></div>
                          <span>{level.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Description *</label>
                    <Textarea
                      placeholder="Describe what you observed. Include details like time, weather conditions, and any unusual behavior of the sea..."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Write in your preferred language. Our system supports multiple Indian languages.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm mb-2 block">Location *</label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter location or coordinates"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={getLocationFromGPS}
                        className="flex items-center space-x-2"
                      >
                        <MapPin className="h-4 w-4" />
                        <span>GPS</span>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Upload Photos/Videos</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-4">
                        Upload images or videos of the hazard (optional but recommended)
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => {
                          if (fileInputRef.current) fileInputRef.current.click();
                        }}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      {formData.images.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                          {formData.images.map((file, idx) => (
                            <div key={idx} className="relative w-20 h-20 rounded overflow-hidden border">
                              {file.type.startsWith('image') ? (
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <video
                                  src={URL.createObjectURL(file)}
                                  className="object-cover w-full h-full"
                                  controls
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {formData.images.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">{formData.images.length} file(s) selected</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Contact Information (Optional)</label>
                    <Input
                      placeholder="Phone number or WhatsApp for updates"
                      value={formData.contactInfo}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value }))}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll send you updates about verification and official response.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg mb-4">Review Your Report</h3>
                  
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Hazard Type:</span>
                      <span className="text-sm">{hazardTypes.find(t => t.value === formData.type)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Severity:</span>
                      <Badge variant={formData.severity === 'critical' ? 'destructive' : 'secondary'}>
                        {formData.severity}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm">{formData.location}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Description:</span>
                      <p className="text-sm mt-1">{formData.description}</p>
                    </div>
                    {formData.images.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Media Files:</span>
                        <span className="text-sm">{formData.images.length} file(s)</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">What happens next?</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Your report will be immediately visible to disaster management authorities</li>
                      <li>• Community moderators will verify the information</li>
                      <li>• If verified, official alerts may be issued to affected areas</li>
                      <li>• You'll receive updates if you provided contact information</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                    disabled={
                      (currentStep === 1 && (!formData.type || !formData.severity || !formData.description)) ||
                      (currentStep === 2 && !formData.location)
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Report</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <span>Quick Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <h4 className="mb-2">📍 Location</h4>
                <p className="text-gray-600 text-xs">Use GPS for accurate coordinates. This helps emergency responders reach the exact location.</p>
              </div>
              <div className="text-sm">
                <h4 className="mb-2">📸 Photos</h4>
                <p className="text-gray-600 text-xs">Include wide shots and close-ups. Photos help verify your report quickly.</p>
              </div>
              <div className="text-sm">
                <h4 className="mb-2">🏃‍♂️ Safety First</h4>
                <p className="text-gray-600 text-xs">Don't risk your safety to take photos. Report from a safe distance.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Languages className="h-5 w-5" />
                <span>Language Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                Report in your preferred language:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>🇮🇳 Hindi</div>
                <div>🌊 Tamil</div>
                <div>⭐ Telugu</div>
                <div>🏖️ Malayalam</div>
                <div>🌅 Bengali</div>
                <div>🏔️ Gujarati</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-xs">
                <div className="font-medium">INCOIS Emergency</div>
                <div className="text-gray-600">1077</div>
              </div>
              <div className="text-xs">
                <div className="font-medium">Coastal Police</div>
                <div className="text-gray-600">112</div>
              </div>
              <div className="text-xs">
                <div className="font-medium">Disaster Management</div>
                <div className="text-gray-600">1078</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
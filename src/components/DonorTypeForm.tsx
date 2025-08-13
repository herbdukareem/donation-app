import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DonorTypeFormProps {
  onSubmit: (data: any) => void;
  isProcessing: boolean;
}

const departments = [
  "Academic Planning Unit",
  "Advancement Unit",
  "African Centre for Herbal Research, Ilorin",
  "Alumni Association & Endowment Office",
  "Anti-Corruption & Transparency Monitoring Unit",
  "Bursary Department",
  "Central Research Laboratories",
  "Central Teaching & Research Workshop",
  "Centre for Affiliated Institutions",
  "Centre for Blue & Marine Economy",
  "Centre for Cultural Studies & Creative Arts",
  "Centre for Gender Studies",
  "Centre for Ilorin Studies",
  "Centre for International Education (CIE)",
  "Centre for Legislative Studies",
  "Centre for Management & Leadership",
  "Centre for Open & Distance Learning (CODL)",
  "Centre for Peace & Strategic Studies",
  "Centre for Renewable Energy (UREC)",
  "Centre for Research, Development & In-House Training (CREDIT)",
  "Centre for Supportive Services for Special Needs",
  "Clinical Skills & Simulation Laboratory",
  "COBES Unit (Clinical)",
  "Computer Services & Information Technology (COMSIT)",
  "Educational Technology Centre",
  "Fire Preventive Unit",
  "General Studies Division",
  "Ilorin Business School",
  "Institute of Developmental Studies",
  "Institute of Education",
  "Institute of Medical Research Training",
  "Institute of Translation Arts",
  "Internal Audit",
  "Laboratory to Product Centre (LABTOP)",
  "Legal Services Unit",
  "Linguistic Immersion Centre",
  "Medical Educational Resources Unit",
  "Medical Screening Centre",
  "National Centre for Hydropower Research & Development",
  "National Water Resources Capacity Building Network",
  "Physical Planning Unit",
  "Postgraduate School",
  "Procurement Unit",
  "Quality Assurance Unit",
  "Regional Centre for Expertise",
  "School of Preliminary Studies",
  "Security Unit",
  "SERVICOM Unit",
  "SIWES Unit",
  "Sports Units",
  "Stem Cell Research Centre",
  "Student Industrial Work Experience Scheme (SIWES) Unit",
  "Students Affairs Unit",
  "Sugar Research Institute",
  "Teaching & Research Farm",
  "Technical & Entrepreneurship Centre (TEC)",
  "Unilorin Archives & Documentation Centre",
  "Unilorin Consultancy Service Centre",
  "Unilorin Counselling Human Development Centre",
  "Unilorin Geological Research Resort, Aran-Orin, Omuaran",
  "Unilorin Institute of Discovery",
  "Unilorin Institute of Molecular Science & Biotechnology",
  "Unilorin Resources Development Management Board (URDMB)",
  "University Health Services",
  "University Library",
  "Veterinary Teaching Hospital",
  "Works Department"
];

const faculties = [
  "Faculty of Agriculture",
  "Faculty of Arts",
  "Faculty of Basic Clinical Science",
  "Faculty of Basic Medical Sciences",
  "Faculty of Clinical Sciences",
  "Faculty of Communication and Information Sciences",
  "Faculty of Education",
  "Faculty of Engineering and Technology",
  "Faculty of Environmental Sciences",
  "Faculty of Law",
  "Faculty of Life Sciences",
  "Faculty of Management Sciences",
  "Faculty of Pharmaceutical Sciences",
  "Faculty of Physical Sciences",
  "Faculty of Social Sciences",
  "Faculty of Veterinary Medicine",
  "Faculty of General Studies",
  "UNIVERSITY LIBRARY",
  "Centre For Peace and Strategic Studies"
];

// Generate years from 1960 to 2025
const graduationYears = Array.from({ length: 66 }, (_, i) => (2025 - i).toString());

const countryCodes = [
  { code: "+234", country: "Nigeria" },
  { code: "+1", country: "USA/Canada" },
  { code: "+44", country: "UK" },
  { code: "+33", country: "France" },
  { code: "+49", country: "Germany" },
  { code: "+86", country: "China" },
  { code: "+91", country: "India" },
  { code: "+27", country: "South Africa" },
  { code: "+254", country: "Kenya" },
  { code: "+233", country: "Ghana" },
];

const initiatives = [
  {
    id: 'transcript-innovation-hubs',
    title: 'PRIORITY 1: Transcript and Innovation Hubs to Mark 50th Anniversary',
    amount: '₦15,000,000,000',
    description: 'A set of state-of-the-art facilities to foster creativity, innovations, enhanced efficiency in management of academic records and processing time.',
  },
  {
    id: 'learning-environment-welfare',
    title: 'PRIORITY 2: Improvement in Learning Environment and Welfare', 
    amount: '₦20,000,000,000',
    description: 'Upgrading infrastructure and resources to provide staff and students with a world-class educational experience within a conducive environment.',
  },
  {
    id: 'research-national-development',
    title: 'PRIORITY 3: Excellence in Research and National Development',
    amount: '₦15,000,000,000', 
    description: 'Upgrade research facilities for high-end research activities and strengthen capacities for solutions towards national development.',
  }
];

const DonorTypeForm = ({ onSubmit, isProcessing }: DonorTypeFormProps) => {
  const [donorType, setDonorType] = useState('');
  const [subType, setSubType] = useState('');
  const [formData, setFormData] = useState({
    // Common fields
    donorName: '',
    contactAddress: '',
    country: '',
    stateProvince: '',
    countryCode: '+234',
    phoneNumber: '',
    email: '',
    currency: 'NGN',
    amount: '',
    isAnonymous: 'No',
    selectedInitiative: '',
    
    // Alumnus specific
    department: '',
    faculty: '',
    matricNumber: '',
    matricForgotten: false,
    yearOfGraduation: '',
    recommendAlumnus: '',
    recommendAlumnusPhone: '',
    
    // Non-alumnus specific
    referredBy: '',
    
    // Alumni set specific
    alumniSetName: '',
    representativeAddress: '',
    representativePhone: '',
    recommendAlumniSet: '',
    recommendAlumniSetPhone: '',
    
    // Corporate specific
    organizationName: '',
    organizationAddress: '',
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    // Check common required fields including initiative selection
    if (!formData.donorName.trim() || !formData.contactAddress.trim() || 
        !formData.phoneNumber.trim() || !formData.email.trim() || 
        !formData.amount.trim() || parseFloat(formData.amount) <= 0 ||
        !formData.selectedInitiative.trim()) {
      return false;
    }
    
    // Additional validation for specific donor types
    if (donorType === 'individual' && subType === 'alumnus') {
      return formData.department.trim() && formData.faculty.trim() && formData.yearOfGraduation.trim();
    }
    
    if (donorType === 'alumni-set') {
      return formData.department.trim() && formData.faculty.trim() && formData.yearOfGraduation.trim();
    }
    
    if (donorType === 'corporate') {
      return formData.organizationAddress.trim();
    }
    
    // For non-alumnus individuals, only common fields are required
    return true;
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      return;
    }
    
    const submitData = {
      donorType,
      subType,
      ...formData
    };
    onSubmit(submitData);
  };

  return (
    <div className="space-y-6">
      {/* Donor Type Selection */}
      <div>
        <Label className="text-base font-semibold mb-4 block">Select Donor Type</Label>
        <RadioGroup value={donorType} onValueChange={(value) => {
          setDonorType(value);
          setSubType('');
        }}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="individual" id="individual" />
            <Label htmlFor="individual">Individual</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="alumni-set" id="alumni-set" />
            <Label htmlFor="alumni-set">Alumni Set</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="corporate" id="corporate" />
            <Label htmlFor="corporate">Corporate Body / NGO</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Individual Sub-type Selection */}
      {donorType === 'individual' && (
        <div>
          <Label className="text-base font-medium mb-3 block">Individual Type</Label>
          <RadioGroup value={subType} onValueChange={setSubType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="alumnus" id="alumnus" />
              <Label htmlFor="alumnus">Alumnus</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="non-alumnus" id="non-alumnus" />
              <Label htmlFor="non-alumnus">Non-alumnus</Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {/* Form Fields */}
      {donorType && (donorType !== 'individual' || subType) && (
        <Card className="p-6 space-y-4">
          {/* Common Fields */}
          <div>
            <Label htmlFor="donorName">
              {donorType === 'alumni-set' ? 'Name of Alumni Set' : 
               donorType === 'corporate' ? 'Name of Organization' : 'Name of Donor'} *
            </Label>
            <Input
              id="donorName"
              value={formData.donorName}
              onChange={(e) => handleInputChange('donorName', e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>

          {/* Organization specific fields */}
          {donorType === 'corporate' && (
            <div>
              <Label htmlFor="organizationAddress">Address of Organization *</Label>
              <Textarea
                id="organizationAddress"
                value={formData.organizationAddress}
                onChange={(e) => handleInputChange('organizationAddress', e.target.value)}
                placeholder="Enter organization address"
                required
              />
            </div>
          )}

          {/* Alumnus specific fields */}
          {donorType === 'individual' && subType === 'alumnus' && (
            <>
              <div>
                <Label htmlFor="matricNumber">Matric Number</Label>
                <Input
                  id="matricNumber"
                  value={formData.matricNumber}
                  onChange={(e) => handleInputChange('matricNumber', e.target.value)}
                  placeholder="Enter matric number"
                  disabled={formData.matricForgotten}
                />
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    id="matricForgotten"
                    checked={formData.matricForgotten}
                    onChange={(e) => handleInputChange('matricForgotten', e.target.checked)}
                  />
                  <Label htmlFor="matricForgotten" className="text-sm">I have forgotten my matric number</Label>
                </div>
              </div>
              <div>
                <Label htmlFor="faculty">Faculty *</Label>
                <Select value={formData.faculty} onValueChange={(value) => handleInputChange('faculty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select faculty" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {faculties.map((faculty) => (
                      <SelectItem key={faculty} value={faculty}>
                        {faculty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="Enter department name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="yearOfGraduation">Year of Graduation *</Label>
                <Select value={formData.yearOfGraduation} onValueChange={(value) => handleInputChange('yearOfGraduation', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select graduation year" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {graduationYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Non-alumnus specific fields */}
          {donorType === 'individual' && subType === 'non-alumnus' && (
            <div>
              <Label htmlFor="referredBy">Who gave you the link? (Optional)</Label>
              <Input
                id="referredBy"
                value={formData.referredBy}
                onChange={(e) => handleInputChange('referredBy', e.target.value)}
                placeholder="Enter name of person who referred you"
              />
            </div>
          )}

          {/* Alumni set specific fields */}
          {donorType === 'alumni-set' && (
            <>
              <div>
                <Label htmlFor="faculty">Faculty *</Label>
                <Select value={formData.faculty} onValueChange={(value) => handleInputChange('faculty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select faculty" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {faculties.map((faculty) => (
                      <SelectItem key={faculty} value={faculty}>
                        {faculty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="Enter department name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="yearOfGraduation">Year of Graduation *</Label>
                <Select value={formData.yearOfGraduation} onValueChange={(value) => handleInputChange('yearOfGraduation', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select graduation year" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {graduationYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Contact Address */}
          <div>
            <Label htmlFor="contactAddress">
              {donorType === 'alumni-set' ? 'Contact Address of Representative *' : 'Contact Address *'}
            </Label>
            <Textarea
              id="contactAddress"
              value={formData.contactAddress}
              onChange={(e) => handleInputChange('contactAddress', e.target.value)}
              placeholder="Enter contact address"
              required
            />
          </div>

          {/* Country */}
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              placeholder="Enter country"
            />
          </div>

          {/* State/Province/County */}
          <div>
            <Label htmlFor="stateProvince">State/Province/County</Label>
            <Input
              id="stateProvince"
              value={formData.stateProvince}
              onChange={(e) => handleInputChange('stateProvince', e.target.value)}
              placeholder="Enter state, province, or county"
            />
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phoneNumber">
              {donorType === 'alumni-set' ? 'Phone Number of Representative (WhatsApp enabled) *' : 
               'Phone Number (WhatsApp enabled) *'}
            </Label>
            <div className="flex space-x-2">
              <Select value={formData.countryCode} onValueChange={(value) => handleInputChange('countryCode', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.code} ({country.country})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="Enter phone number"
                className="flex-1"
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          {/* Recommendation fields */}
          {(donorType === 'individual' && subType === 'alumnus') && (
            <>
              <div>
                <Label htmlFor="recommendAlumnus">Recommend an Alumnus to Us (Name)</Label>
                <Input
                  id="recommendAlumnus"
                  value={formData.recommendAlumnus}
                  onChange={(e) => handleInputChange('recommendAlumnus', e.target.value)}
                  placeholder="Enter recommended alumnus name (optional)"
                />
              </div>
              <div>
                <Label htmlFor="recommendAlumnusPhone">Recommended Alumnus Phone Number</Label>
                <Input
                  id="recommendAlumnusPhone"
                  type="tel"
                  value={formData.recommendAlumnusPhone}
                  onChange={(e) => handleInputChange('recommendAlumnusPhone', e.target.value)}
                  placeholder="Enter phone number (optional)"
                />
              </div>
            </>
          )}

          {donorType === 'alumni-set' && (
            <>
              <div>
                <Label htmlFor="recommendAlumniSet">Recommend an Alumni Set to Us (Name)</Label>
                <Input
                  id="recommendAlumniSet"
                  value={formData.recommendAlumniSet}
                  onChange={(e) => handleInputChange('recommendAlumniSet', e.target.value)}
                  placeholder="Enter recommended alumni set name (optional)"
                />
              </div>
              <div>
                <Label htmlFor="recommendAlumniSetPhone">Recommended Alumni Set Phone Number</Label>
                <Input
                  id="recommendAlumniSetPhone"
                  type="tel"
                  value={formData.recommendAlumniSetPhone}
                  onChange={(e) => handleInputChange('recommendAlumniSetPhone', e.target.value)}
                  placeholder="Enter phone number (optional)"
                />
              </div>
            </>
          )}

          {/* Donation fields */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Donation Details</h3>
            
            {/* Initiative Selection */}
            <div>
              <Label htmlFor="selectedInitiative">Choose an Initiative to Support *</Label>
              <Select value={formData.selectedInitiative} onValueChange={(value) => handleInputChange('selectedInitiative', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an initiative" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {initiatives.map((initiative) => (
                    <SelectItem key={initiative.id} value={initiative.id}>
                      <div className="py-2">
                        <div className="font-medium text-sm mb-1">{initiative.title}</div>
                        <div className="text-xs text-muted-foreground mb-1">Target: {initiative.amount}</div>
                        <div className="text-xs text-muted-foreground">{initiative.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.selectedInitiative && (
                <div className="mt-2 p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium">
                    {initiatives.find(i => i.id === formData.selectedInitiative)?.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Target Amount: {initiatives.find(i => i.id === formData.selectedInitiative)?.amount}
                  </p>
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="currency">Currency *</Label>
              <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount">Amount to Donate *</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder="Enter donation amount"
                min="1"
                step="0.01"
                required
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Do you want to be anonymous?</Label>
              <RadioGroup value={formData.isAnonymous} onValueChange={(value) => handleInputChange('isAnonymous', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="anonymous-yes" />
                  <Label htmlFor="anonymous-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="anonymous-no" />
                  <Label htmlFor="anonymous-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <button
            className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
              isFormValid() && !isProcessing
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleSubmit}
            disabled={!isFormValid() || isProcessing}
          >
            {isProcessing ? 'Processing...' : 
             isFormValid() ? 
             `Donate ${formData.currency === 'NGN' ? '₦' : formData.currency} ${parseFloat(formData.amount || '0').toLocaleString()}` :
             'Please complete required fields'}
          </button>
        </Card>
      )}
    </div>
  );
};

export default DonorTypeForm;

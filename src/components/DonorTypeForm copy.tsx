import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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

const DonorTypeForm = ({ onSubmit, isProcessing }: DonorTypeFormProps) => {
  const [donorType, setDonorType] = useState('');
  const [subType, setSubType] = useState('');
  const [formData, setFormData] = useState({
    // Common fields
    donorName: '',
    contactAddress: '',
    phoneNumber: '',
    email: '',
    currency: 'NGN',
    amount: '',
    isAnonymous: 'No',
    
    // Alumnus specific
    department: '',
    yearOfGraduation: '',
    recommendAlumnus: '',
    recommendAlumnusPhone: '',
    
    // Alumni set specific
    alumniSetName: '',
    course: '',
    representativeAddress: '',
    representativePhone: '',
    recommendAlumniSet: '',
    recommendAlumniSetPhone: '',
    
    // Corporate specific
    organizationName: '',
    organizationAddress: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    const commonValid = formData.donorName && formData.contactAddress && 
                       formData.phoneNumber && formData.email && formData.amount;
    
    if (donorType === 'individual' && subType === 'alumnus') {
      return commonValid && formData.department && formData.yearOfGraduation;
    }
    
    if (donorType === 'alumni-set') {
      return commonValid && formData.alumniSetName && formData.department && 
             formData.course && formData.yearOfGraduation;
    }
    
    if (donorType === 'corporate') {
      return commonValid && formData.organizationName && formData.organizationAddress;
    }
    
    return commonValid;
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;
    
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
               donorType === 'corporate' ? 'Name of Organization' : 'Name of Donor'}
            </Label>
            <Input
              id="donorName"
              value={formData.donorName}
              onChange={(e) => handleInputChange('donorName', e.target.value)}
              placeholder="Enter name"
            />
          </div>

          {/* Organization specific fields */}
          {donorType === 'corporate' && (
            <div>
              <Label htmlFor="organizationAddress">Address of Organization</Label>
              <Textarea
                id="organizationAddress"
                value={formData.organizationAddress}
                onChange={(e) => handleInputChange('organizationAddress', e.target.value)}
                placeholder="Enter organization address"
              />
            </div>
          )}

          {/* Alumnus specific fields */}
          {donorType === 'individual' && subType === 'alumnus' && (
            <>
              <div>
                <Label htmlFor="department">Department Graduated From</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="Enter department"
                />
              </div>
              <div>
                <Label htmlFor="yearOfGraduation">Year of Graduation</Label>
                <Input
                  id="yearOfGraduation"
                  type="number"
                  value={formData.yearOfGraduation}
                  onChange={(e) => handleInputChange('yearOfGraduation', e.target.value)}
                  placeholder="Enter graduation year"
                />
              </div>
            </>
          )}

          {/* Alumni set specific fields */}
          {donorType === 'alumni-set' && (
            <>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="Enter department"
                />
              </div>
              <div>
                <Label htmlFor="course">Course</Label>
                <Input
                  id="course"
                  value={formData.course}
                  onChange={(e) => handleInputChange('course', e.target.value)}
                  placeholder="Enter course"
                />
              </div>
              <div>
                <Label htmlFor="yearOfGraduation">Year of Graduation</Label>
                <Input
                  id="yearOfGraduation"
                  type="number"
                  value={formData.yearOfGraduation}
                  onChange={(e) => handleInputChange('yearOfGraduation', e.target.value)}
                  placeholder="Enter graduation year"
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="contactAddress">
              {donorType === 'alumni-set' ? 'Contact Address of Representative' : 'Contact Address'}
            </Label>
            <Textarea
              id="contactAddress"
              value={formData.contactAddress}
              onChange={(e) => handleInputChange('contactAddress', e.target.value)}
              placeholder="Enter contact address"
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber">
              {donorType === 'alumni-set' ? 'Phone Number of Representative (WhatsApp enabled)' : 
               'Phone Number (WhatsApp enabled)'}
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter email address"
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
            
            <div>
              <Label htmlFor="currency">Currency</Label>
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
              <Label htmlFor="amount">Amount to Donate</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder="Enter donation amount"
                min="1"
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
            className="button-primary w-full"
            onClick={handleSubmit}
            disabled={!isFormValid() || isProcessing}
          >
            {isProcessing ? 'Processing...' : `Donate ${formData.currency === 'NGN' ? '₦' : formData.currency}${parseInt(formData.amount || '0').toLocaleString()}`}
          </button>
        </Card>
      )}
    </div>
  );
};

export default DonorTypeForm;
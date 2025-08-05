import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Header from '@/Layout/Header';
import { apiPost } from '@/api/apiMethods';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function VendorRegistration() {
const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;
 const router = useRouter();
  const [formData, setFormData] = useState({
    referenceWebsite: referenceWebsite || '',
    ownerName: '',
    businessName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    businessCategory: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const businessCategories = [
    { value: '', label: 'Select business type' },
    { value: 'retail', label: 'Retail' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'service', label: 'Service' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
  
    try {
      const response = await apiPost('api/vendor-register', formData);
      
      setSubmitStatus({ success: true, message: 'Registration successful!' });
      setFormData({
        ownerName: '',
        businessName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        businessCategory: '',
        description: ''
      });
  
      toast.success("Registration successful!");
      setTimeout(() => router.push('/login/vendorlogin'), 2000);
      
    } catch (error) {
      // Extracting error response message
      let errorMessage = "Registration failed. Please try again.";
  
      if (error.response) {
        // API responded with an error message
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = "No response from server. Please check your internet connection.";
      } else {
        // Something went wrong while setting up the request
        errorMessage = "An unexpected error occurred. Please try again later.";
      }
  
      setSubmitStatus({ success: false, message: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Header/>
   

      <div className="min-h-screen flex items-center justify-center py-10">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="p-5 rounded-4 boxsback" style={{ background: 'transparent', zIndex: "1000" }}>
                <h2 className="text-center text-dark mb-4">Vendor Registration</h2>
                {submitStatus && (
                  <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}>
                    {submitStatus.message}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Owner Name*</label>
                      <input 
                        type="text" 
                        name="ownerName" 
                        value={formData.ownerName} 
                        onChange={handleChange} 
                        className="form-control" 
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Business Name*</label>
                      <input 
                        type="text" 
                        name="businessName"  
                        value={formData.businessName} 
                        onChange={handleChange} 
                        className="form-control" 
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email*</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="form-control" 
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Username*</label>
                      <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        className="form-control" 
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Password*</label>
                      <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className="form-control" 
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Confirm Password*</label>
                      <input 
                        type="password" 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        className="form-control" 
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Business Category*</label>
                    <select 
                      name="businessCategory" 
                      value={formData.businessCategory} 
                      onChange={handleChange} 
                      className="form-select"
                    >
                      {businessCategories.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description*</label>
                    <textarea 
                      name="description" 
                      value={formData.description} 
                      onChange={handleChange} 
                      className="form-control" 
                      rows="4"
                    ></textarea>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn bg-danger text-white w-100">
                    {isSubmitting ? 'Registering...' : 'Register Now'}
                  </button>
                  <div style={{textAlign:"center",alignItems:"center"}}>
                  {/* <Link href="https://com.yunicare.in/" > */}
                  <Link href="/login/vendorlogin" >
                     Vendor Login
                  </Link>
                  </div>
                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

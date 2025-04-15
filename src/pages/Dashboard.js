import React, { useRef, useState } from 'react';
import Layout from '../components/Layout';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    type: 'GST',
    startDate: '',
    endDate: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file) return;
    setError('');
    setSuccess('');

    // Check if file is CSV
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please upload a CSV file only');
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !formData.startDate || !formData.endDate) return;

    try {
      setUploading(true);
      setError('');
      setSuccess('');
      
      const formPayload = new FormData();
      formPayload.append('file', selectedFile);
      formPayload.append('type', formData.type);
      formPayload.append('start_date', formData.startDate);
      formPayload.append('end_date', formData.endDate);

      const response = await axios.post('http://api.audithive.in/upload-gst-csv', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      setSuccess('File uploaded successfully!');

      // Reset form
      setSelectedFile(null);
      setFormData({
        type: 'GST',
        startDate: '',
        endDate: ''
      });
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.response?.data?.message || 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragging');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragging');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragging');
    
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const isFormValid = () => {
    return selectedFile && formData.startDate && formData.endDate;
  };

  return (
    <Layout>
      <div className="upload-container">
        <h2 className="upload-title">Upload Document</h2>
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" className="mb-3">
            {success}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <div className="form-content">
            <div 
              className="upload-dropzone"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept=".csv"
                style={{ display: 'none' }}
              />
              <div className="upload-content">
                {uploading ? (
                  <p className="upload-text">Uploading...</p>
                ) : (
                  <p className="upload-text">
                    {selectedFile ? (
                      <>
                        Selected file: {selectedFile.name}
                        <br />
                        <span 
                          className="upload-subtext change-file"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                          }}
                        >
                          Change file
                        </span>
                      </>
                    ) : (
                      <>
                        Drag and drop files here or click to upload
                        <br />
                        <span className="upload-subtext">Supports CSV files only</span>
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>

            <Form.Group className="form-group">
              <Form.Label>Document Type</Form.Label>
              <Form.Select 
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                disabled
              >
                <option value="GST">GST</option>
              </Form.Select>
            </Form.Group>

            <div className="date-group">
              <Form.Group className="form-group">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
              </Form.Group>
            </div>

            <Button 
              type="submit" 
              className="submit-button" 
              disabled={!isFormValid() || uploading}
            >
              {uploading ? 'Uploading...' : 'Submit'}
            </Button>
          </div>
        </Form>
      </div>
    </Layout>
  );
}

export default Dashboard; 
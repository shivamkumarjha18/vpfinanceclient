import React, { useState } from 'react';

const ImportLead = () => {
  const [formData, setFormData] = useState({
    callingPurpose: '',
    pertName: '',
    leadType: '',
    leadSource: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create form data object
    const data = new FormData();
    data.append('calling_purpose', formData.callingPurpose);
    data.append('pert_name', formData.pertName);
    data.append('lead_type', formData.leadType);
    data.append('lead_source', formData.leadSource);
    data.append('file', formData.file);

    // Simulate upload
    fetch('../../upload.php', {
      method: 'POST',
      body: data,
    })
      .then((res) => alert('File uploaded successfully!'))
      .catch((err) => alert('Error uploading file.'));
  };

  return (
    <div className='bg-white p-4'>
    <div className="container mt-4">
      <ul className="nav nav-tabs bg-black mb-4">
        <li className="nav-item">
          <a className="nav-link active" data-bs-toggle="tab" href="#import-tab">
            Import Suspect
          </a>
        </li>
      </ul>

      <div className="tab-content">
        <div className="tab-pane fade show active" id="import-tab">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Calling Purpose</label>
                <select
                  name="callingPurpose"
                  value={formData.callingPurpose}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Choose</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Servicing">Servicing</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Purpose Name</label>
                <input
                  type="text"
                  name="pertName"
                  value={formData.pertName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter"
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Lead Source</label>
                <select
                  name="leadType"
                  value={formData.leadType}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Choose</option>
                  <option>Organization Data</option>
                  <option>Digital Platform</option>
                  <option>Administrator Referral</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Lead Name</label>
                <select
                  name="leadSource"
                  value={formData.leadSource}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Choose</option>
                  <option>Barkatullah</option>
                  <option>Facebook</option>
                  <option>Instagram</option>
                  <option>Google Search</option>
                  <option>Youtube</option>
                  <option>Twitter</option>
                  <option>C I Automobile</option>
                  <option>CAR SEGMENT</option>
                  <option>Test</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">File</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-12 mt-3">
                <button type="submit" className="btn btn-primary">
                  IMPORT
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="tab-pane fade" id="data-tab">
          <p className="text-muted">Data tab content (future use).</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ImportLead;

import React, { useState, useEffect } from 'react'; // Import useEffect
import Modal from 'react-modal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import './Environmental.css';
import left from './/assets/left.jpeg';
import mid from './/assets/mid.jpeg';
import right from './/assets/right.jpeg';

const Environmental = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);  // Edit mode flag
  const [selectedParameter, setSelectedParameter] = useState(null);  // Store the parameter being edited

  const [formData, setFormData] = useState({
    parameterType: '',
    idealValue: '',
    minSatisfactory: '',
    maxSatisfactory: '',
    currentValue: '',
    unitValue: '',
  });

  // State to hold submitted parameters
  const [parameters, setParameters] = useState([]);

  // Fetch existing parameters on component mount
  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const response = await axios.get('/api/environmental'); // Adjust this to your actual endpoint
        setParameters(response.data); // Assuming response.data is the array of parameters
      } catch (error) {
        console.error('Error fetching parameters:', error);
        toast.error('Failed to fetch parameters.'); // Error notification
      }
    };

    fetchParameters();
  }, []); // Empty dependency array means this runs once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleString(undefined, options); // Adjust locale as needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString(); // Get the current timestamp
    const dataToSend = { ...formData, timestamp };

    try {
      if (isEditMode && selectedParameter) {
        // Update the existing parameter
        await axios.put(`/api/environmental/${selectedParameter._id}`, dataToSend); // Assuming the backend expects an ID
        // Update the local state
        setParameters(
          parameters.map((param) =>
            param._id === selectedParameter._id ? { ...param, ...dataToSend } : param
          )
        );
        toast.success('Data updated successfully!');
      } else {
        // Add a new parameter
        await axios.post('/api/environmental', dataToSend);
        setParameters([...parameters, dataToSend]);
        toast.success('Data submitted successfully!');
      }

      // Reset form and close modal
      setFormData({
        parameterType: '',
        idealValue: '',
        minSatisfactory: '',
        maxSatisfactory: '',
        currentValue: '',
        unitValue: '',
      });
      setIsOpen(false);
      setIsEditMode(false); // Exit edit mode after submission
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Failed to submit data.');
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsEditMode(false); // Exit edit mode when closing modal
    setFormData({
      parameterType: '',
      idealValue: '',
      minSatisfactory: '',
      maxSatisfactory: '',
      currentValue: '',
      unitValue: '',
    }); // Reset form data
  };

  return (
    <div className="content">
    
      <div className='user-name'>Welcome back Aina!</div>
      <div className='user-desc'>Optimize your Farm Operation with Real-Time insights.</div>
      <button className='environment-button' onClick={() => {
        setIsOpen(true);
        setIsEditMode(false); // Ensure it's new entry mode when opening normally
      }}>
        Open Form
      </button>

      {isOpen && <div className="overlay" onClick={handleCloseModal} />}

      <Modal className="modal" isOpen={isOpen} onRequestClose={handleCloseModal} ariaHideApp={false}>
        <h2>{isEditMode ? 'Edit Environmental Parameters' : 'Input Environmental Parameters'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Parameter Type:
            <input
              type="text"
              name="parameterType"
              value={formData.parameterType}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Ideal Value:
            <input
              type="number"
              name="idealValue"
              value={formData.idealValue}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Min Satisfactory:
            <input
              type="number"
              name="minSatisfactory"
              value={formData.minSatisfactory}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Max Satisfactory:
            <input
              type="number"
              name="maxSatisfactory"
              value={formData.maxSatisfactory}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Current Value:
            <input
              type="number"
              name="currentValue"
              value={formData.currentValue}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Unit:
            <input
              type="string"
              name="unitValue"
              value={formData.unitValue}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <div className="button-container">
            <button type="button" className="modal-button-close" onClick={handleCloseModal}>Close</button>
            <button type="submit" className="modal-button">
              {isEditMode ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Display the submitted parameters */}
      <div className="sticky-notes-container">
        {parameters.map((param, index) => {
          // Calculate the image to display
          let imageSrc;
          const idealValue = parseFloat(param.idealValue);
          const currentValue = parseFloat(param.currentValue);
          const minSatisfactory = parseFloat(param.minSatisfactory);
          const maxSatisfactory = parseFloat(param.maxSatisfactory);

          // Determine which image to show
          if (currentValue >= idealValue - 20 && currentValue <= idealValue + 20) {
            imageSrc = right; // Image A for +/- 20 of ideal value
          } else if (currentValue > minSatisfactory && currentValue < maxSatisfactory) {
            imageSrc = mid; // Image B if within satisfactory range but not +/- 20 of ideal value
          } else {
            imageSrc = left; // Image C otherwise
          }

          return (
            <div
              key={index}
              className="sticky-note"
              onClick={() => {
                setIsOpen(true); // Open the modal
                setIsEditMode(true); // Enter edit mode
                setSelectedParameter(param); // Set the clicked parameter for editing
                setFormData({
                  parameterType: param.parameterType,
                  idealValue: param.idealValue,
                  minSatisfactory: param.minSatisfactory,
                  maxSatisfactory: param.maxSatisfactory,
                  currentValue: param.currentValue,
                  unitValue: param.unitValue,
                }); // Pre-fill the form with data from the clicked sticky note
              }}
            >
              <div className="sticky-title">{param.parameterType}</div>
              <div className="sticky-latest">Last updated on {formatTimestamp(param.timestamp)}</div>
              <div className="image-container">
                <img src={imageSrc} alt="Parameter Representation" className="sticky-image" />
                <div className="exp">
                  <FontAwesomeIcon className='inline-logo' icon={faCircle} size="xs" style={{ color: "#ba2626" }} /> 
                  <span>Critical</span> 
                  <FontAwesomeIcon className='inline-logo' icon={faCircle} size="xs" style={{ color: "#f49134" }} /> 
                  <span>Satisfactory</span> 
                  <FontAwesomeIcon className='inline-logo' icon={faCircle} size="xs" style={{ color: "#39ea74" }} /> 
                  <span>Ideal</span>
                </div>
                <div className="sticky-att">{param.parameterType}, {param.currentValue}{param.unitValue}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default Environmental;

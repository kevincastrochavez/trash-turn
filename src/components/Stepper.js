import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';

import RadioBtn from './RadioBtn';
import { useStateValue } from '../StateProvider';
import { db } from '../firebase';
import CustomButton from './Button';
import { Modal } from '@mui/material';

const steps = ['Choose your Complex', 'Choose your apartment'];

function StepperInfo() {
  const [{ complexesList, user }] = useStateValue();
  const [activeStep, setActiveStep] = useState(0);
  const [apartments, setApartments] = useState(null);
  // Sets the default state to the first complex in the firebase collection
  const [complexSelected, setComplexSelected] = useState(
    complexesList[0].value
  );
  // Sets the default state to 0 since the apartments haven't been fetched when the component renders, but when complex is selected
  const [apartmentSelected, setApartmentSelected] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openComplexModal, setOpenComplexModal] = useState(false);
  const [complexInputValue, setComplexInputValue] = useState('');
  const navigate = useNavigate();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 320,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  const handleOpenComplexModal = () => setOpenComplexModal(true);
  const handleCloseComplexModal = () => setOpenComplexModal(false);

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const selectComplex = (complex) =>
    // Sets which radio button was selected for complex
    setComplexSelected(complex.value);

  const selectApartment = (apartment) =>
    // Sets which radio button was selected for apartment
    setApartmentSelected(apartment.apt);

  // Snackbar alert
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  // Close alert
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowAlert(false);
  };

  const addComplex = async () => {
    setLoading(true);

    const formattedComplexString = complexInputValue
      .trim()
      .toLowerCase()
      .split(' ')
      .join('');

    await db
      .collection('complexes')
      .doc(formattedComplexString)
      .set({ name: formattedComplexString })
      .then(() => {
        setLoading(false);
        handleCloseComplexModal();
      });
  };

  const submitComplexAndApartment = async () => {
    if (apartmentSelected) {
      setLoading(true);

      // Create collection of rommates inside apartment and assign user to it
      await db
        .collection('complexes')
        .doc(complexSelected)
        .collection(complexSelected)
        .doc(apartmentSelected)
        .collection('roomates')
        .add(user)
        .then(() => {
          setLoading(false);

          // Redirect to root page
          navigate('/');
        });
    } else {
      // If no apartment was selected, alert will be fired
      setShowAlert(true);
    }
  };

  useEffect(() => {
    async function getApartments(complex) {
      const apartmentsSnapshot = await db
        .collection('complexes')
        .doc(complex)
        .collection(complex)
        .get();
      // const apartmentsSnapshot = await getDocs(collection(db, 'cedars'));
      const apartmentsList = apartmentsSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setApartments(apartmentsList);
    }

    getApartments(complexSelected);
    // This useEffect will run everytime a complex is selected
  }, [complexSelected]);

  return (
    <Box sx={{ width: '100%' }} className='stepperInfo'>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <div className='stepperInfo__container'>
        <div className='stepperInfo__container-btns'>
          {/* Renders radio buttons based on the collection data fetched from firebase */}
          {activeStep === 0
            ? complexesList &&
              complexesList.map((complex) => (
                <RadioBtn
                  onClick={() => selectComplex(complex)}
                  active={complexSelected === complex.value ? true : false}
                  key={complex.value}
                  label={complex.name}
                />
              ))
            : apartments &&
              apartments.map((apartment) => (
                <RadioBtn
                  onClick={() => selectApartment(apartment)}
                  active={apartmentSelected === apartment.apt ? true : false}
                  key={apartment.apt}
                  label={apartment.apt}
                />
              ))}
        </div>

        <CustomButton
          text="Don't see yours? Add it here"
          className='stepperInfo__btn'
          Icon={AddIcon}
          onClick={handleOpenComplexModal}
          reverse
        />

        <Box
          sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}
          className='stepperInfo__container-bottom'
        >
          <Button
            color='inherit'
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />

          <Button
            onClick={activeStep !== 1 ? handleNext : submitComplexAndApartment}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </div>

      <Snackbar
        open={showAlert}
        // autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity='warning'
          sx={{ width: '100%' }}
        >
          Please select an apartment from the complex selected
        </Alert>
      </Snackbar>

      {loading && (
        <div className='loading'>
          <CircularProgress />
        </div>
      )}

      <Modal
        open={openComplexModal}
        onClose={handleCloseComplexModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <label>Apartment Complex Name</label>
          <input
            type='text'
            className='modal__input'
            placeholder='Center Square'
            value={complexInputValue}
            onChange={(e) => setComplexInputValue(e.target.value)}
          />

          <CustomButton
            text='Add Complex'
            Icon={AddIcon}
            reverse
            className='modal__btn'
            onClick={addComplex}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default StepperInfo;

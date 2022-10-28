import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import RadioBtn from './RadioBtn';
import { useStateValue } from '../StateProvider';
import { db } from '../firebase';

const steps = ['Choose your Complex', 'Choose your apartment'];

function StepperInfo() {
  const [{ complexesList }] = useStateValue();
  const [activeStep, setActiveStep] = useState(0);
  const [apartments, setApartments] = useState(null);
  // Sets the default state to the first complex in the firebase collection
  const [complexSelected, setComplexSelected] = useState(
    complexesList[0].value
  );
  // Sets the default state to 0 since the apartments haven't been fetched when the component renders, but when complex is selected
  const [apartmentSelected, setApartmentSelected] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const selectComplex = (complex) => {
    // Sets which radio button was selected for complex
    setComplexSelected(complex.value);
  };

  const selectApartment = (apartment) => {
    // Sets which radio button was selected for apartment
    setApartmentSelected(apartment.apt);
  };

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

  const submitComplexAndApartment = () => {
    if (apartmentSelected) {
      console.log(complexSelected);
      console.log(apartmentSelected);
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
                  callback={() => selectComplex(complex)}
                  active={complexSelected === complex.value ? true : false}
                  key={complex.value}
                  label={complex.name}
                />
              ))
            : apartments &&
              apartments.map((apartment) => (
                <RadioBtn
                  callback={() => selectApartment(apartment)}
                  active={apartmentSelected === apartment.apt ? true : false}
                  key={apartment.apt}
                  label={apartment.apt}
                />
              ))}
        </div>

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
          Please select an apartment from the current complex
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default StepperInfo;

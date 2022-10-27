import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

import RadioBtn from './RadioBtn';
import { useStateValue } from '../StateProvider';
import { db } from '../firebase';

const steps = ['Choose your Complex', 'Choose your apartment'];

function StepperInfo() {
  const [{ complexesList }] = useStateValue();
  const [activeStep, setActiveStep] = useState(0);
  // Sets the default state to the first complex in the firebase collection
  const [radioBtnActive, setRadioBtnActive] = useState(complexesList[0].value);
  const [apartments, setApartments] = useState(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const selectRadio = (complex) => {
    // Sets which radio button was selected
    setRadioBtnActive(complex.value);

    // getApartments(radioBtnActive);
  };

  useEffect(() => {
    async function getApartments(complex) {
      console.log(complex);

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

    getApartments(radioBtnActive);
  }, [radioBtnActive]);

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
          {/* Reders radio buttons based on the collection data fetched from firebase */}
          {complexesList &&
            complexesList.map((complex) => (
              <RadioBtn
                callback={() => selectRadio(complex)}
                active={radioBtnActive === complex.value ? true : false}
                key={complex.value}
                label={complex.name}
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

          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </div>
    </Box>
  );
}

export default StepperInfo;

import React, { useState } from 'react';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

import { db } from '../firebase';
import RadioBtn from './RadioBtn';

const steps = ['Choose your Complex', 'Choose your apartment'];

function StepperInfo() {
  const [complexes, setComplexes] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [radioBtnActive, setRadioBtnActive] = useState('cedars');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  console.log(complexes);

  useEffect(() => {
    async function getComplexes() {
      const complexesSnapshot = await getDocs(collection(db, 'complexes'));
      const complexesList = complexesSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      setComplexes(complexesList);
    }

    getComplexes();
  }, []);

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
          {complexes &&
            complexes.map((complex) => (
              <RadioBtn
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

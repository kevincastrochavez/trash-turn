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
import moment from 'moment';

import RadioBtn from './RadioBtn';
import { useStateValue } from '../StateProvider';
import { db } from '../firebase';
import CustomButton from './Button';
import { Modal } from '@mui/material';

const steps = ['Choose your Complex', 'Choose your apartment'];

function StepperInfo() {
  const [{ user }, dispatch] = useStateValue();
  const [activeStep, setActiveStep] = useState(0);
  const [apartments, setApartments] = useState(null);
  // Sets the default state to the first complex in the firebase collection
  const [complexSelected, setComplexSelected] = useState('');
  // Sets the default state to 0 since the apartments haven't been fetched when the component renders, but when complex is selected
  const [apartmentSelected, setApartmentSelected] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [openComplexModal, setOpenComplexModal] = useState(false);
  const [openApartmentModal, setOpenApartmentModal] = useState(false);
  const [complexInputValue, setComplexInputValue] = useState('');
  const [apartmentInputValue, setApartmentInputValue] = useState('');
  const [complexes, setComplexes] = useState(null);
  const [renderComplexes, setRenderComplexes] = useState(false);
  const [renderApartments, setRenderApartments] = useState(false);
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

  // Functions to open and close modals when adding complexes and apartments
  const handleOpenComplexModal = () => setOpenComplexModal(true);
  const handleCloseComplexModal = () => setOpenComplexModal(false);
  const handleOpenApartmentModal = () => setOpenApartmentModal(true);
  const handleCloseApartmentModal = () => setOpenApartmentModal(false);

  const handleNext = () => {
    if (complexSelected) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setAlertMessage('Please select a complex');
      setShowAlert(true);
    }
  };

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
      .join(' ');

    // Adding new apartment number to collection if input is not empty
    if (formattedComplexString !== '') {
      await db
        .collection('complexes')
        .doc(formattedComplexString)
        .set({ name: formattedComplexString, value: formattedComplexString })
        .then(() => {
          // Turns on variable so useEffect rerenders when complex is added to firebase db and fetches all of them again
          setRenderComplexes(true);
          setLoading(false);
          handleCloseComplexModal();

          // Clear input after adding complex
          setComplexInputValue('');
        });
    } else {
      setLoading(false);
    }
  };

  const addApartment = async () => {
    setLoading(true);

    const formattedApartmentString = apartmentInputValue.trim();

    if (formattedApartmentString !== '') {
      await db
        .collection('complexes')
        .doc(complexSelected)
        .collection(complexSelected)
        .doc(formattedApartmentString)
        .set({ apt: formattedApartmentString })
        .then(() => {
          // Turns on variable so useEffect rerenders when apartment is added to firebase db and fetches all of them again
          setRenderApartments(true);
          setLoading(false);
          handleCloseApartmentModal();

          // Clear input after adding apartment number
          setApartmentInputValue('');
        });
    } else {
      setLoading(false);
    }
  };

  const submitComplexAndApartment = async () => {
    if (apartmentSelected) {
      const formattedDate = moment(new Date()).format('MMMM DD, h:mm:ss a');
      setLoading(true);

      const userObject = {
        name: user.name,
        photoUrl: user.photoUrl,
        uid: user.uid,
        complex: complexSelected,
        apartment: apartmentSelected,
        timestamp: formattedDate,
      };

      dispatch({
        type: 'SET_FULL_USER',
        fullUser: userObject,
      });

      db.collection('users').doc(user.uid).set(userObject, { merge: true });

      // Create collection of rommates inside apartment and assign user to it
      await db
        .collection('complexes')
        .doc(complexSelected)
        .collection(complexSelected)
        .doc(apartmentSelected)
        .collection('roomates')
        .doc(userObject.uid)
        .set(userObject)
        .then(() => {
          setLoading(false);

          // Redirect to root page
          navigate('/');
        });
    } else {
      // If no apartment was selected, alert will be fired
      setAlertMessage('Please select an apartment from the complex selected');
      setShowAlert(true);
    }
  };

  const capitalizeEachWord = (sentence) => {
    const words = sentence.split(' ');

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(' ');
  };

  // Fetches complexes from Firebase
  useEffect(() => {
    setLoading(true);
    // Turns off variable so useEffect doesn't enter infinite loop of rendering'
    setRenderComplexes(false);

    async function getComplexes() {
      const complexesSnapshot = await db.collection('complexes').get();
      const complexesList = complexesSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      setComplexes(complexesList);
      setLoading(false);
    }

    getComplexes();
    // Rerenders everytime complex is added to firebase db
  }, [renderComplexes]);

  useEffect(() => {
    if (complexSelected) {
      setLoading(true);
      setRenderApartments(false);

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
        setLoading(false);
      }

      getApartments(complexSelected);
    }
    // This useEffect will run everytime a complex is selected or a new apartment number is added
  }, [complexSelected, renderApartments]);

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
            ? complexes &&
              complexes.map((complex) => (
                <RadioBtn
                  onClick={() => selectComplex(complex)}
                  active={complexSelected === complex.value ? true : false}
                  key={complex.value}
                  label={capitalizeEachWord(complex.name)}
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
          // Open modal for complex or apartment, conditionally
          onClick={
            activeStep === 0 ? handleOpenComplexModal : handleOpenApartmentModal
          }
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
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity='warning'
          sx={{ width: '100%' }}
        >
          {alertMessage}
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

      <Modal
        open={openApartmentModal}
        onClose={handleCloseApartmentModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <label>Apartment #</label>
          <input
            type='text'
            className='modal__input'
            placeholder='104'
            value={apartmentInputValue}
            onChange={(e) => setApartmentInputValue(e.target.value)}
          />

          <CustomButton
            text='Add Apartment'
            Icon={AddIcon}
            reverse
            className='modal__btn'
            onClick={addApartment}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default StepperInfo;

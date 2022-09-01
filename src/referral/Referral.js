import { useState } from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import { CustomAccordion } from './components/CustomAccordion';
import { ReferralAccordionSummary } from './components/ReferralAccordionSummary';
import { AddressLookup } from './components/AddressLookup';
import { ReferralDatePicker } from './components/ReferralDatePicker';
import { FieldArray, Form, Formik, getIn } from "formik";
import * as Yup from "yup";
import AccountCircle from '@mui/icons-material/AccountCircle';
import TranslateIcon from '@mui/icons-material/Translate';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { ReferralTextBox } from './components/ReferralTextBox';
import { postReferrals } from '../services/referral.service';
import SearchIcon from '@mui/icons-material/Search';
import './referral.scss';

const validationSchema = Yup.object().shape({
  referrals: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      dob: Yup.date().label('Date of birth').required('Date of birth is required'),
      contactLanguage: Yup.string().required('Contact language is required'),
      phone: Yup.number().label('Phone number').required('phone is required'),
      email: Yup.string().email('The email is invalid').required('email is required'),
      address: Yup.string().required('Address is required'),
      note: Yup.string(),
      id: Yup.number()
    })
  )
});

const getInitialReferrals = () => ({
  firstName: '',
  lastName: '',
  dob: '',
  contactLanguage: '',
  phone: '',
  email: '',
  address: '',
  note: '',
  id: Date.now()
});

const getField = (fieldName, index, touched, errors) => {
  const field = `referrals[${index}].${fieldName}`;
  const touchedField = getIn(touched, field);
  const error = getIn(errors, field);
  return [
    field,
    touchedField,
    error
  ];
};

export const Referral = () => {
  const [responseSubmitMessage, setResponseSubmitMessage] = useState();
  const handleSubmit = async (values, formikBag) => {
    await postReferrals(values);
    formikBag.setSubmitting(false);
    console.log('values', values);
    formikBag.resetForm();
    setResponseSubmitMessage(`Success! You have submitted ${values.referrals?.length} pending referrals. You will be notified once they've been approved`);
  }
  return (
    <div className='referral'>
      <div className='header'>
        <p className='title'>Agent Referral Form</p>
        <p className='subtitle'>Agents Only</p>
      </div>
      {responseSubmitMessage && <div className='messageBar'>
        <span className='contentMessage'>
          {responseSubmitMessage}
        </span>
      </div>}
      <div className='body'>
        <div className='information'>
          <p className='title'>Agent Referral List</p>
          <p className='subtitle'>You can add up to five referrals at a time</p>
        </div>
        <Formik
          validateOnMount={true}
          validateOnChange={false}
          initialValues={{
            referrals: [{ ...getInitialReferrals() }]
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, touched, errors, handleChange, handleBlur, isValid, isSubmitting, setFieldValue }) => (
            <Form noValidate autoComplete="off">
              <FieldArray name="referrals">
                {({ push, remove }) => (
                  <>
                    {values.referrals.map((referral, index) => {
                      const [firstName, touchedFirstName, errorFirstName] = getField('firstName', index, touched, errors);
                      const [lastName, touchedLastName, errorLastName] = getField('lastName', index, touched, errors);
                      const [dob, touchedDob, errorDob] = getField('dob', index, touched, errors);
                      const [contactLanguage, touchedContactLanguage, errorContactLanguage] = getField('contactLanguage', index, touched, errors);
                      const [phone, touchedPhone, errorPhone] = getField('phone', index, touched, errors);
                      const [email, touchedEmail, errorEmail] = getField('email', index, touched, errors);
                      const [address, touchedAddress, errorAddress] = getField('address', index, touched, errors);
                      const [note, touchedNote, errorNote] = getField('note', index, touched, errors);
                      const handleRemove = () => remove(index);

                      return (<CustomAccordion key={referral.id} defaultExpanded={index === 0}>
                        <ReferralAccordionSummary
                          number={index + 1}
                          text={`${referral.firstName} ${referral.lastName}`}
                          onRemove={handleRemove}
                          isShowExpandIcon={values.referrals.length > 1}
                          isShowDeleteButton={values.referrals.length > 1}
                        />
                        <AccordionDetails sx={{ padding: "24px 56px" }}>
                          <Grid container spacing={2} rowSpacing={4}>
                            <Grid item xs={6}>
                              <ReferralTextBox
                                name={firstName}
                                value={referral.firstName}
                                autoComplete={firstName}
                                error={Boolean(touchedFirstName && errorFirstName)}
                                required
                                Icon={AccountCircle}
                                label={touchedFirstName && errorFirstName
                                  ? errorFirstName : "First Name"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <ReferralTextBox
                                name={lastName}
                                value={referral.lastName}
                                autoComplete={lastName}
                                error={Boolean(touchedLastName && errorLastName)}
                                required
                                Icon={AccountCircle}
                                label={touchedLastName && errorLastName
                                  ? errorLastName : "Last Name"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <ReferralDatePicker
                                label={touchedDob && errorDob
                                  ? errorDob : "Date of Birth"}
                                value={referral.dob}
                                onChange={newValue => {
                                  setFieldValue(dob, newValue, true);
                                }}
                                inputPropOutter={{
                                  name: dob,
                                  label: touchedDob && errorDob
                                    ? errorDob : "Date of Birth",
                                  autoComplete: dob,
                                  error: Boolean(touchedDob && errorDob),
                                  required: true,
                                  onBlur: handleBlur,
                                  onChange: handleChange
                                }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <ReferralTextBox
                                name={contactLanguage}
                                value={referral.contactLanguage}
                                autoComplete={contactLanguage}
                                error={Boolean(touchedContactLanguage && errorContactLanguage)}
                                required
                                Icon={TranslateIcon}
                                label={touchedContactLanguage && errorContactLanguage
                                  ? errorContactLanguage : "Contact Language"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <ReferralTextBox
                                name={phone}
                                value={referral.phone}
                                autoComplete={phone}
                                error={Boolean(touchedPhone && errorPhone)}
                                required
                                Icon={LocalPhoneIcon}
                                label={touchedPhone && errorPhone
                                  ? errorPhone : "Phone"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <ReferralTextBox
                                name={email}
                                value={referral.email}
                                autoComplete={email}
                                error={Boolean(touchedEmail && errorEmail)}
                                required
                                Icon={EmailIcon}
                                label={touchedEmail && errorEmail
                                  ? errorEmail : "Email"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <AddressLookup
                                name={address}
                                value={referral.address}
                                Icon={SearchIcon}
                                autoComplete={address}
                                error={Boolean(touchedAddress && errorAddress)}
                                required
                                label={touchedAddress && errorAddress
                                  ? errorAddress : "Address"}
                                onChange={value => setFieldValue(address, value, true)}
                                onBlur={handleBlur}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <ReferralTextBox
                                name={note}
                                value={referral.note}
                                autoComplete={note}
                                error={Boolean(touchedNote && errorNote)}
                                label={touchedNote && errorNote
                                  ? errorNote : "Notes/Reason"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </CustomAccordion>)
                    })}
                    {values.referrals.length < 5 && <div className='addAnotherReferralWrapper'>
                      <Button
                        variant="text"
                        sx={{
                          fontWeight: 500,
                          fontSize: 14,
                          color: '#0B2B5B'
                        }}
                        onClick={() => push({ ...getInitialReferrals() })}
                      >
                        + ADD ANOTHER REFERRAL
                      </Button>
                    </div>}
                  </>
                )}
              </FieldArray>
              <div className='submitReferralsWrapper'>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  sx={{
                    background: '#0B2B5B',
                    borderRadius: 34.5,
                  }}
                  disabled={!isValid || values.referrals.length === 0 || isSubmitting}
                >
                  SEND REFERRALS
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {v4 as uuidv4} from 'uuid';

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';  
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import './form.scss';
// import { json } from 'react-router-dom';

function ContactForm() {

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    avatar: Yup.string(),
    gender: Yup.string().oneOf(['male', 'female', 'other'], 'Invalid gender'),
    group: Yup.string().oneOf(['', 'work', 'family', 'private', 'friends', 'other'], 'Invalid Group').required('Group is required'),
    favourite: Yup.boolean()
  })

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const formik = useFormik({
    initialValues: {
      id: uuidv4(),
      name: '',
      phone: '',
      email: '',
      group: '',
      avatar: '',
      gender: 'female',
      favourite: false
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
    handleReset:()=> {
    }
  })

  return (
    <div className='form-wrapper'>  
      <form onSubmit={formik.handleSubmit} className='form'>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          rowSpacing="20px"
        >
          <Grid item container direction="row" xs={12} md={6} columnSpacing="20px">
            <Grid item xs container direction="column" alignItems="center" rowSpacing="10px">
              <Grid item>
                <div className='form__contact-photo'>
                  <Avatar src="/broken-image.jpg" />
                  <Button startIcon={<PhotoCamera  />} component="label">
                    Add photo
                    <input 
                      hidden 
                      accept="image/*" 
                      multiple 
                      type="file" 
                      name="avatar"
                      value={formik.values.avatar} 
                      onChange={formik.handleChange}

                      />
                  </Button>
                </div>
              </Grid>
              <Grid item>
                <TextField
                  id="name"
                  name="name"
                  label="Name *"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  helperText={formik.errors.name || ' '}
                  error={!!formik.errors.name}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-required"
                  name="phone"
                  label="Phone *" 
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  helperText={formik.errors.phone || ' '}
                  error={!!formik.errors.phone}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-required"
                  name="email"
                  label="Email *"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  helperText={formik.errors.email || ' '}
                  error={!!formik.errors.email}
                />
              </Grid>
            </Grid>
            <Grid item container direction="column" alignItems="center" rowSpacing="10px" xs={12} md={6}>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-required-label">Group *</InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={formik.values.group}
                    label="Group"
                    name="group"
                    onChange={formik.handleChange}
                    error={!!formik.errors.group}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="work">Work</MenuItem>
                    <MenuItem value="family">Family</MenuItem>
                    <MenuItem value="private">Private</MenuItem>
                    <MenuItem value="friends">Friends</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                    {/* <MenuItem value="add">Add group</MenuItem> */}
                  </Select>
                  <FormHelperText  error={!!formik.errors.group}>{formik.errors.group || ' '}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="gender" 
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel value="female" control={<Radio size="small"  />} label="Female" />
                    <FormControlLabel value="male" control={<Radio size="small"  />} label="Male" />
                    <FormControlLabel value="other" control={<Radio size="small"  />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item>
                <Checkbox 
                  {...label}  
                  name="favourite" 
                  icon={<FavoriteBorder />} 
                  checkedIcon={<Favorite />} 
                  value={formik.values.favourite}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit" className='form__submit-button button'>Add contact</Button>
          </Grid>
        </Grid>
      </form>   
    </div>
  )
}

export default ContactForm;

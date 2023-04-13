import { withFormik } from "formik"
import * as Yup from 'yup';
import { InnerForm } from './InnerForm';
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { persistMyInfo } from '../../services/persistence';

const mapDispatchToProps = dispatch => ({
    loggedIn : (payload) => dispatch({type: 'LOGGED_IN', payload}),
})

export const EnhancedLoginForm = compose(
    connect(null, mapDispatchToProps),
    withFormik({
      mapPropsToValues: props => ({ username: '', password: '' }),
      validationSchema: Yup.object().shape({
          username: Yup.string().required('Invalid username address').required('Username is required'),
          password: Yup.string().required('Password is required'),
      }),
      handleSubmit: (  values,  { props, setSubmitting } ) => {
        ApiService.login({email: values.username, password: values.password}).then(payload=>{
          setSubmitting(false)
          toast.success("Logged in  successfully")
          props.loggedIn(payload.data)
          persistMyInfo(payload.data)
          props.setShow(false)
        }).catch(err=>{
          console.log(err)
          setSubmitting(false)
          toast.error(err.data && err.data.msg ? err.data.msg : 'The username or password you entered were invalid.')
        })
      },
      responseFacebook: (response) => {
        console.log(response);
      },
      responseGoogle: (response) => {
        console.log(response);
      }
}))(InnerForm);
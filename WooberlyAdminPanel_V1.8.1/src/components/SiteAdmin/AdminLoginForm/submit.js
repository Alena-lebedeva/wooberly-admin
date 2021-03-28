
// Redux Form
import { SubmissionError } from 'redux-form';

// Language
import messages from '../../../locale/messages';

// Redirection
import history from '../../../history';

// Fetch request
import fetch from 'node-fetch';

// Redux
import { setRuntimeVariable } from '../../../actions/runtime';
import { setLoaderStart, setLoaderComplete } from '../../../actions/loader/loader';
import { getAdminUser } from '../../../actions/siteadmin/AdminUser/manageAdminUser';

async function submit(values, dispatch) {

  const query = `query (
    $email: String!,
    $password: String!) {
    adminUserLogin (
        email: $email,
        password: $password
    ) {
        status
        token
        isSuperAdmin
        errorType
        errorMessage
    }
}`;

  const variables = {
    email: values.email,
    password: values.password,
  };

  dispatch(setLoaderStart('AdminLogin'));

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  dispatch(setLoaderComplete('AdminLogin'));
  
  if(data.adminUserLogin.status == 200) {
    dispatch(setRuntimeVariable({
      name: 'isAdminAuthenticated',
      value: true,
    }));

    dispatch(setRuntimeVariable({
      name: 'isSuperAdmin',
      value: data && data.adminUserLogin && data.adminUserLogin.isSuperAdmin
    }));
    dispatch(getAdminUser());

    history.push('/siteadmin');
  } else if (data.adminUserLogin.status != 200 & data.adminUserLogin.errorType == "email") {
      throw new SubmissionError({ _error: messages.emailNotExists });
  } else if (data.adminUserLogin.status != 200 & data.adminUserLogin.errorType == "password") {
      throw new SubmissionError({ _error: messages.passwordWrong });
  } else if (data.adminUserLogin.errorType == "loggedIn") {

      dispatch(setRuntimeVariable({
        name: 'isAdminAuthenticated',
        value: true,
      }));

      dispatch(setRuntimeVariable({
        name: 'isSuperAdmin',
        value: data && data.adminUserLogin && data.adminUserLogin.isSuperAdmin
      }));
      dispatch(getAdminUser());
      
      throw new SubmissionError({ _error: messages.loggedIn });
  } else {
      throw new SubmissionError({ _error: messages.somethingWentWrong });
  }

}

export default submit;

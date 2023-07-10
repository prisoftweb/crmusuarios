import Alerta, { showToastMessage, showToastMessageError } from '@/components/Alerta';
import axios from 'axios';

<Alerta></Alerta>
const createHeaderAUTH_BEARER = (auth_token:string) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
    });
    return headers;
}
export async function setLogin(email:string, password:string) {
    const userData = {
      email,
      password
    };      
    const url=`${process.env.NEXT_PUBLIC_API_URL}/login`;
    try {
      const response = await axios.post(url, userData);
      return response.data;
  
    } catch (error:any) {
      return error.response.data.message;
    }   
}

export async function forgotPassword(email:string) {
  const userData = {
    email,
  };
  const url=`${process.env.NEXT_PUBLIC_API_URL}/forgotPassword`;
  try {
    const res = await axios.post(url, userData);    
    return res.data;    
  } catch (error:any) {
    return error.response.data.message;
  }   
}
export async function resetPassword(password:string, passwordConfirm:string, token:string) {
  const userData = {
    password,
    passwordConfirm,
  };
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/resetPassword/${token}`;
  try {
    const res = await axios.patch(url, userData);
    return res.data;    
  } catch (error:any) {
    return error.response.data.message;
  }   
}
export async function getIsLogin() {
    let user;
    const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/isLogin`;
    try {
      user =  await fetch(url).then( (response) => {
        if(!response.ok){
          throw new Error('Algo salió mal con la solicitud')
        }
        return response.json();
      });
    } catch (error:any) {        
        throw error;
    }
    return user;
}
export async function setLogout() {    
    const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/logout`;    
    try {
      const res = await axios.get(url);
      if(res.data.status === 'success') {
        return res.data.status;
      } else {
        return res.data.status;      
      }
      
    } catch (error:any) {      
      return error.response.data.message;
    }
}


export async function getAllUsers(auth_token:string) {
    let users;
    try {
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
      users =  await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users`, 
        {headers:headers})
      .then( (response) => {
        if(!response.ok){
          throw new Error('Algo salió mal con la solicitud')
        }
        return response.json();
      });
    } catch (error:any) {
        throw error;
    }
    return users;
  
}

export async function getUser(id:string, auth_token:string) {
  let user;
  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`;
    user =  await fetch(
      url, 
      {headers:headers})
    .then( (response) => {
      if(!response.ok){
        throw new Error('Algo salió mal con la solicitud')
      }
      return response.json();
    });      
  } catch (error:any) {
      throw error;
  }
  return user;
}


export async function removeUser(id:string, auth_token:string) {
    const headers = createHeaderAUTH_BEARER(auth_token);
    const data= {foo:'bar'};
    const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`;
    const requestOptions = {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      }
    };
    try {            
      const res = await fetch(url, requestOptions)
      .then( (response) => {      
        if(!response.ok){          
          showToastMessageError('Algo salió mal con la solicitud');            
          throw new Error('Algo salió mal con la solicitud');                      
        } else {
          if(response.status === 204) {        
              showToastMessage('¡Usuario eliminado exitosamente!');
              return 204;
            }        
          }          
          return response.status;
        })
        .catch( (err) => {          
          showToastMessageError(err);
        });
    } catch (error:any) {
      showToastMessageError(error);      
      return error;    
    }
}

export async function removeUser0(id:string, auth_token:string) {
  const headers = createHeaderAUTH_BEARER(auth_token);
  const data= {foo:'bar'};
  const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`;
  try {
    const res = await axios.delete(url, {
      params: { id: id}, 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
    });
    return res;
  } catch (error:any) {
    return error;
  }
}
export async function updateMeUser(id:string, userData:any, auth_token:string) {
    const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/updateMe/${id}`;
    const config = {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${auth_token}`
      },
      onUploadProgress: (event:any) => {        
      },
    };
    try {
      const res = await axios.patch(url, userData, config);
      console.log(res);
        return res;    
    } catch (error:any) {
      return error.response.data.message;
    }
}

export async function updateMePassword(id:string, passwordCurrent:string, password:string, passwordConfirm:string) {
    const userData = {
      passwordCurrent,
      password,    
      passwordConfirm    
    };
    const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/updatePassword/${id}`;
    try {
      const res = await axios.patch(url, userData);
        return res.data;    
    } catch (error:any) {
      return error.response.data.message;
    }
}


export async function createUser(data:any, auth_token:string) {
  const url=`${process.env.NEXT_PUBLIC_API_URL}/users`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    },
    body: JSON.stringify(data)
  })
  .then( (response) => {      
    if(!response.ok){        
      showToastMessageError('Algo salió mal con la solicitud');            
      throw new Error('Algo salió mal con la solicitud');                    
    } else {
      if(response.status === 201) {        
        showToastMessage('Usuario agregado exitosamente!');
        return 201;
      }        
    }
    return response.status;
  })
  .catch( (err) => {    
    showToastMessageError(err);
  });  
}

export async function logOut() {
  let user;
  try {
    const url=`${process.env.NEXT_PUBLIC_API_URL}/logout`;
    user =  await fetch(url)      
    .then( (response) => {
      if(!response.ok){
        throw new Error('Algo salió mal con la solicitud')
      }
      return response.json();
    });      
  } catch (error:any) {
      throw error;
  }
  return user;
}
  
  
import axios from 'axios';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  throw err;
};

export default {
  service: service,

  getSpaces(lat, lng) {
    return service
      .get('/spaces/?lat=' + lat + '&lng=' + lng)
      .then(res => res.data)
      .catch(errHandler);
  },

  postSpaces(data) {
    var result = Object.keys(data.type).filter(key => data.type[key] === true);
    let formData = new FormData();
    console.log('data: ', data);
    console.log('type api.js: ', result);
    formData.append('picture', data.picture);
    formData.append('name', data.name);
    formData.append('website', data.website);
    formData.append('lat', data.lat);
    formData.append('lng', data.lng);
    formData.append('type', result);
    formData.append('price', data.price);
    formData.append('piano', data.piano);
    formData.append('drum', data.drum);
    formData.append('description', data.description);

    console.log('formData: ', formData);
    return service
      .post('/spaces/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => res.data)
      .catch(errHandler);
  },

  getDetail(id) {
    console.log('here');
    const spaceDetail = '/spaces/' + id;
    return service
      .get(spaceDetail)
      .then(res => res.data)
      .catch(errHandler);
  },

  getProfile() {
    return service
      .get('/profile')
      .then(res => res.data)
      .catch(errHandler);
  },

  createLike(_space) {
    return service
      .post('/spaces/like', _space)
      .then(res => res.data)
      .catch(errHandler);
  },

  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => res.data)
      .catch(errHandler);
  },

  login(username, password) {
    return service
      .post('/login', {
        username,
        password
      })
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem('user');
    return service.get('/logout').then(res => {});
  },

  // loadUser() {
  //   const userData = localStorage.getItem('user');
  //   if (!userData) return false;
  //   const user = JSON.parse(userData);
  //   if (user.token) {
  //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
  //     return user;
  //   }
  //   return false;
  // },

  isLoggedIn() {
    return localStorage.getItem('user') != null;
  }

  // addPicture(file) {
  //   const formData = new FormData();
  //   formData.append('picture', file);
  //   return service
  //     .post('/users/first-user/pictures',
  //     .then(res => res.data)
  //     .catch(errHandler);
  // }
};

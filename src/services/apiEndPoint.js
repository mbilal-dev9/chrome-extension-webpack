export const apiEndPoint = {
  LOGIN: '/token/',
  REGISTER_USER: '/users/sign_up/',
  RESET_PASSWORD: '/users/reset-password/', // not yet created
  GET_USER_SKILLS: '/users/skills/',
  ADD_USER_SKILL: '/users/skills/',
  UPDATE_USER_SKILL: (id) => `/users/skills/update/${id}`,
  DELETE_USER_SKILL: (id) => `/users/skills/destroy/${id}`,
  AUTO_COMPLETE_SKILL: (name) => `/users/skills/autocomplete?name=${name}`,
  USER_PROFILE: '/users/me/',
  USER_META_DATA: '/users/metadata/'
};
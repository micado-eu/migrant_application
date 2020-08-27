export function setUser (state, data) {
  if (data) {
    state.user = {
      id: data.sub,
      umid: data.umid,
      email: data.email,
      name: data.given_name,
      lastname: data.family_name,
      gender: data.gender,
      country: data.country,
      roleNames: null
    }
  } else {
    state.user = null
  }
}

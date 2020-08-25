export function setUser (state, data) {
  if (data) {
    state.user = {
      id: data.sub,
      email: data.email_address,
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

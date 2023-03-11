class apiAuthServices {
  BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
  Web_Api_Key = "AIzaSyAu91y5Ch2WkQ4hPoQs3TIyt7cKTTEcd1s";
  static getInstance() {
    return new apiAuthServices();
  }
  signUp = async (credential) => {
    const response = await fetch(
      this.BASE_URL + "signUp?key=" + this.Web_Api_Key,
      {
        method: "POST",
        body: JSON.stringify({
          email: credential.email,
          password: credential.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      let error = "Authentication-Failed";
      if (data && data.error && data.error.message) {
        error = data.error.message;
        alert(error);
      }
    }
  };
  signIn = async (credential) => {
    const response = await fetch(
      this.BASE_URL + "signInWithPassword?key=" + this.Web_Api_Key,
      {
        method: "POST",
        body: JSON.stringify({
          email: credential.email,
          password: credential.password,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      let error = "Log In failed";

      if (data && data.error && data.error.message) {
        error = data.error.message;
        alert(error);
      }
    }
  };
  forgotPassword = async (credential) => {
    const response = await fetch(
      this.BASE_URL + "sendOobCode?key=" + this.Web_Api_Key,
      {
        method: "POST",
        body: JSON.stringify({
          email: credential.email,
          requestType: "PASSWORD_RESET",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();

      return data;
    }
  };
  getUserData = async () => {
    const idToken = localStorage.getItem("idToken");
    const response = await fetch(
      this.BASE_URL + "lookup?key=" + this.Web_Api_Key,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();

      return data.users[0];
    }
  };
  updateUserData = async (credential) => {
    const idToken = localStorage.getItem("idToken");
    const response = await fetch(
      this.BASE_URL + "update?key=" + this.Web_Api_Key,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
          displayName: credential.name,
          photoUrl: credential.url,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();

      return data;
    }
  };
}
export default apiAuthServices = apiAuthServices.getInstance();

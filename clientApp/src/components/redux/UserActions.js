import axios from "axios";

export function loginUser(userName, password) {
  const data = `grant_type=password&username=${userName}&password=${password}`;
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  return {
    type: "LOGIN_USER",
    payload: axios
      .post("/token", data, { headers: headers, withCredentials: true })
      .then(resp => {
        return resp.data;
      })
      .catch(err => console.error(err))
  };
}

export function loginStatus() {
  const config = {
    Authorization:
      "Bearer dlS2bb3MaeV-OABQ_NXboJmDwNRIMocqllx8fEVAty80BeQQDC7EChm1BDEblfeFa5GM5zSHTaEs7ZBNObDDRfO8HP0LDU_o_tdrouxklydtsKtupQPcgcJNotXTOqlJYOVcV6Rp_okMRtqp-TyZ6t8rOmb-_0Q5c6SBfI4ieKUQ9ar0iTWuyKH3BGs5rjA4B-PJXl6q3yB6VFK-o8HFPPvcZi-oKRUUYBSKY4R1cMCkEBLlPABxAg-MhU7GWoaazPItPrS2IC8vYoDLSReGYp85BfRnI9F-F8OWpxiFf_tJtK_goYWxbErVydN7eQNrOE9EYJ0UKsnF8ZERTeMCBd6tvyevHBWWMo7CoOt-ZVmQEaFAeBqIoVc6vlJPkCjLmp6fqnFHsytpJjrnF-3rAf2n5TDAEiCVTE7hxZfz05fcl73BzLrVvpQ8heUgoNFBa6t2MbYB1vcHNP9ruM6ZZNv2t9X08lzzMsl-6_pkuXs"
  };
  return {
    type: "CHECK_LOGIN_STATE",
    payload: axios
      .get(`/api/account/userinfo`, { headers: config })
      .then(resp => {
        console.log(resp.data);
        return resp.data;
      })
      .catch(err => {
        console.error(err);
        return false;
      })
  };
}

// content type header and bearer w/ token
export function logoutUser() {
  return {
    type: "LOGOUT_USER",
    payload: axios
      .post("/api/account/logout", { withCredentials: true })
      .then(resp => {
        return true;
      })
      .catch(err => console.error(err))
  };
}

import { useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import { gql, useMutation } from "@apollo/client";
import Cookie from "js-cookie";

import Form from "@/components/Form";
import Loader from "@/components/Loader";

const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        username
        email
      }
    }
  }
`;

export default function LoginRoute() {
  const { setUser } = useAppContext();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    const { email, password } = formData;
    const { data } = await loginMutation({
      variables: { identifier: email, password },
    });
    if (data?.login.user) {
      setUser(data.login.user);
      Cookie.set("token", data.login.jwt);
      router.push("/");
    }
  };

  if (loading) return <Loader />;

  return (
    <Form
      title="Login"
      buttonText="Login"
      formData={formData}
      setFormData={setFormData}
      callback={handleLogin}
      error={error}
    />
  );
}

// import { useState } from "react";
// import { useRouter } from "next/router";
// import { useAppContext } from "@/context/AppContext";
// import { gql, useMutation } from "@apollo/client";
// import Cookie from "js-cookie";

// import Form from "@/components/Form";
// import Loader from "@/components/Loader";

// const LOGIN_MUTATION = gql`
//   mutation Login($identifier: String!, $password: String!) {
//     login(input: { identifier: $identifier, password: $password }) {
//       jwt
//       user {
//         username
//         email
//       }
//     }
//   }
// `;

// export default function LoginRoute() {
//   const { setUser } = useAppContext();
//   const router = useRouter();

//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

//   const handleLogin = async () => {
//     const { email, password } = formData;
//     const { data } = await loginMutation({
//       variables: { identifier: email, password },
//     });
//     if (data?.login.user) {
//       setUser(data.login.user);
//       Cookie.set("token", data.login.jwt);
//       router.push("/");
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <div>
//       {/* HTML for the login page */}
//       <div id="firebase-auth-container"></div>

//       <Form
//         title="Login"
//         buttonText="Login"
//         formData={formData}
//         setFormData={setFormData}
//         callback={handleLogin}
//         error={error}
//         signInWithGoogle={signIn}
//       />
//     </div>
//   );
// }

// // Front-end JavaScript for login and signup
// function signIn() {
//   console.log("here");
//   // Call the backend route for signing in with Google
//   fetch("/strapi-google-auth/callback", {
//     method: "POST",
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Handle the response data if needed
//       console.log(data);
//     })
//     .catch((error) => {
//       // Handle any errors that occur during the fetch request
//       console.error("Error:", error);
//     });
// }

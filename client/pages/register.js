import { useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import { gql, useMutation } from "@apollo/client";
import Cookie from "js-cookie";

import Form from "@/components/Form";
import Loader from "@/components/Loader";

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        username
        email
      }
    }
  }
`;

export default function RegisterRoute() {
  const { setUser } = useAppContext();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [registerMutation, { loading, error }] = useMutation(REGISTER_MUTATION);

  const handleRegister = async () => {
    const { email, password } = formData;
    const { data } = await registerMutation({
      variables: { username: email, email: email, password },
    });
    if (data?.register.user) {
      setUser(data.register.user);
      router.push("/");
      Cookie.set("token", data.register.jwt);
    }
  };

  if (loading) return <Loader />;

  return (
    <Form
      title="Sign Up"
      buttonText="Sign Up"
      formData={formData}
      setFormData={setFormData}
      callback={handleRegister}
      error={error}
    />
  );
}

// import React from "react";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import { useAppContext } from "@/context/AppContext";
// import { gql, useMutation } from "@apollo/client";
// import Cookie from "js-cookie";
// import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast

// import Form from "@/components/Form";
// import Loader from "@/components/Loader";

// import "react-toastify/dist/ReactToastify.css";

// const REGISTER_MUTATION = gql`
//   mutation Register($username: String!, $email: String!, $password: String!) {
//     register(
//       input: { username: $username, email: $email, password: $password }
//     ) {
//       jwt
//       user {
//         username
//         email
//       }
//     }
//   }
// `;

// export default function RegisterRoute() {
//   const { setUser } = useAppContext();
//   const router = useRouter();

//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [registerMutation, { loading, error }] = useMutation(REGISTER_MUTATION);

//   const successMessage = () => {
//     toast.success("Congratulations, you have successfully signed in", {
//       position: "top-center",
//       autoClose: 2000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//     setTimeout(() => {
//       router.push("/");
//     }, 3000);
//   };

//   const handleRegister = async () => {
//     const { email, password } = formData;
//     const { data } = await registerMutation({
//       variables: { username: email, email: email, password },
//     });
//     console.log("data", data);
//     if (data?.register.user) {
//       console.log("data.register.user", data.register.user);
//       setUser(data.register.user);
//       Cookie.set("token", data.register.jwt);
//       successMessage();
//     }
//   };
//   function register() {
//     // Get the email and password values from the input fields
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     // Call the backend route for user registration
//     fetch("/api/auth/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle the response data if needed
//         console.log(data);
//       })
//       .catch((error) => {
//         // Handle any errors that occur during the fetch request
//         console.error("Error:", error);
//       });
//   }

//   if (loading) return <Loader />;

//   return (
//     <div>
//       <Form
//         title="Sign Up"
//         buttonText="Sign Up"
//         formData={formData}
//         setFormData={setFormData}
//         callback={handleRegister}
//         error={error}
//       />
//       <ToastContainer />
//     </div>
//   );
// }

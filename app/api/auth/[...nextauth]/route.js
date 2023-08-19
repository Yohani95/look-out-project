import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { userApiUrl, apiHeaders } from "@/app/api/apiConfig";
import https from "https";
export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const requestData = {
          usu_nombre: credentials.usu_nombre,
          usu_contraseña: credentials.usu_contraseña,
        };
        try {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
          const response = await fetch(`${userApiUrl}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
            agent: new https.Agent({ rejectUnauthorized: false }),
          });
          if (!response.ok) {
            return null;
          }
          const data = await response.json();
          const user = { id: data.usu_id, name: data.usu_nombre };
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }

          // Resto del código aquí...
        } catch (error) {
          console.error("Fetch error:", error);
        }
        s;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./_styles/globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./_components/UserContext";
import { getUserData } from "./_utils/userActions";

const inter = Inter({ subsets: ["latin"] });

async function getUserDetails() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value || undefined;

  let userData = {};

  if (userId) {
    userData = await getUserData(userId);
  } else {
    userData = undefined;
  }

  return userData;
}

export default async function RootLayout({ children }) {
  const userData = await getUserDetails();

  return (
    <html lang="en">
      <body className="pt-16">
        {" "}
        {/* Add padding-top to prevent content overlap with fixed header */}
        <UserProvider>
          {" "}
          <Header userData={userData} />
          <Toaster />
          {children}
        </UserProvider>
        <Footer />
      </body>
    </html>
  );
}

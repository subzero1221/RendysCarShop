import UpdateProfile from "@/app/_components/UpdateProfile";
import { getUserData } from "@/app/_utils/userActions";
import Image from "next/image";

export const metadata = {
  title: "RendysCars / Cabinet",
  description: " bla bla",
};

async function ProfilePage({ params }) {
  const id = params.userId;
  const user = await getUserData(id);

  return (
    <div className="max-w-md p-4 mx-auto mt-16 bg-white rounded-lg shadow-lg ">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24">
          <Image
            src={
              user.photo === "userdefault.png"
                ? `/${user?.photo}`
                : `https://drive.google.com/uc?export=view&id=${user?.photo}`
            }
            alt={`${user.name}'s photo`}
            width={96}
            height={96}
            className="object-cover rounded-full"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <UpdateProfile user={user} />
    </div>
  );
}

export default ProfilePage;
